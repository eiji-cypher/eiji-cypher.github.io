import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { checkId: string } }
) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  if (!session || (role !== "ADMIN" && role !== "STAFF")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { checked } = body;

    const check = await prisma.requirementCheck.findUnique({
      where: { id: params.checkId },
    });

    if (!check) {
      return NextResponse.json({ error: "Requirement checklist item not found" }, { status: 404 });
    }

    const updated = await prisma.requirementCheck.update({
      where: { id: params.checkId },
      data: {
        checked: !!checked,
        checkedAt: checked ? new Date() : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Admin requirement toggle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
