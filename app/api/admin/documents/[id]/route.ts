import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAuthorized(role: string | undefined) {
  return role === "ADMIN" || role === "STAFF";
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || !isAuthorized(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const doc = await prisma.document.findUnique({
    where: { id: params.id },
    include: { 
      user: { select: { id: true, name: true, email: true, phone: true } },
      requirementChecks: true 
    },
  });
  if (!doc) return NextResponse.json({ error: "Document not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || (role !== "ADMIN" && role !== "STAFF")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();

  if (body.requirements) {
    const existingChecks = await prisma.requirementCheck.findMany({ where: { documentId: params.id } });
    const existingReqs = existingChecks.map((c: any) => c.requirement);
    
    const toAdd = body.requirements.filter((r: string) => !existingReqs.includes(r));
    const toRemove = existingReqs.filter((r: string) => !body.requirements.includes(r));
    
    if (toRemove.length > 0) {
      await prisma.requirementCheck.deleteMany({
        where: { documentId: params.id, requirement: { in: toRemove } }
      });
    }
    
    if (toAdd.length > 0) {
      await prisma.requirementCheck.createMany({
        data: toAdd.map((r: string) => ({ documentId: params.id, requirement: r }))
      });
    }
  }

  const doc = await prisma.document.update({
    where: { id: params.id },
    data: {
      status: body.status,
      notes: body.notes,
      requirements: body.requirements,
      ...(body.readyAt ? { readyAt: new Date(body.readyAt) } : {}),
    },
    include: { 
      user: { select: { id: true, name: true, email: true, phone: true } },
      requirementChecks: true 
    },
  });
  return NextResponse.json(doc);
}