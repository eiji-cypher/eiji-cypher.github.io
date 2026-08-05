import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; checkId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // Verify document existence and client ownership
  const document = await prisma.document.findUnique({
    where: { id: params.id },
  });

  if (!document) {
    return NextResponse.json({ error: "Document request not found" }, { status: 404 });
  }

  if (document.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Verify requirement check exists for this document
  const check = await prisma.requirementCheck.findFirst({
    where: { id: params.checkId, documentId: params.id },
  });

  if (!check) {
    return NextResponse.json({ error: "Requirement checklist item not found" }, { status: 404 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file was uploaded" }, { status: 400 });
    }

    const filename = (file as any).name || "document.pdf";
    const size = file.size;

    // Validate size (10MB limit)
    if (size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds the maximum 10MB size limit." }, { status: 400 });
    }

    // Validate extension
    const ext = path.extname(filename).toLowerCase();
    const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".xls", ".xlsx", ".csv"];
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({
        error: "Invalid file type. Only PDF, PNG, JPG, JPEG, GIF, XLS, XLSX, and CSV files are allowed.",
      }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Delete old file if it exists to avoid leakage/bloat
    if (check.fileUrl) {
      const oldFilename = path.basename(check.fileUrl);
      const oldFilePath = path.join(uploadDir, oldFilename);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (e) {
          console.error("Failed to delete old file:", e);
        }
      }
    }

    // Save the new file
    const safeFilename = `check-${params.checkId}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, safeFilename);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Update RequirementCheck DB state
    const updatedCheck = await prisma.requirementCheck.update({
      where: { id: params.checkId },
      data: {
        fileUrl: `/api/files/${safeFilename}`,
        checked: true,
        checkedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCheck);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error during upload." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; checkId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  const document = await prisma.document.findUnique({
    where: { id: params.id },
  });

  if (!document) {
    return NextResponse.json({ error: "Document request not found" }, { status: 404 });
  }

  if (document.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const check = await prisma.requirementCheck.findFirst({
    where: { id: params.checkId, documentId: params.id },
  });

  if (!check) {
    return NextResponse.json({ error: "Requirement checklist item not found" }, { status: 404 });
  }

  try {
    // Delete file from filesystem
    if (check.fileUrl) {
      const filename = path.basename(check.fileUrl);
      const filePath = path.join(process.cwd(), "uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Reset RequirementCheck DB state
    const updatedCheck = await prisma.requirementCheck.update({
      where: { id: params.checkId },
      data: {
        fileUrl: null,
        checked: false,
        checkedAt: null,
      },
    });

    return NextResponse.json(updatedCheck);
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Internal server error during deletion." }, { status: 500 });
  }
}
