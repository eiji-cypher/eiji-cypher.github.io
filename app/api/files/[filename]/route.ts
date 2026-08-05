import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  // Sanitize filename to prevent directory traversal
  const sanitizedFilename = path.basename(params.filename);
  const filePath = path.join(process.cwd(), "uploads", sanitizedFilename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Permission Check
  if (role !== "ADMIN" && role !== "STAFF") {
    // If client, check if they own the document associated with this uploaded file
    const check = await prisma.requirementCheck.findFirst({
      where: {
        fileUrl: {
          endsWith: sanitizedFilename,
        },
      },
      include: {
        document: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!check || check.document.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(sanitizedFilename).toLowerCase();
    
    const mimeTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".xls": "application/vnd.ms-excel",
      ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ".csv": "text/csv",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${sanitizedFilename}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
