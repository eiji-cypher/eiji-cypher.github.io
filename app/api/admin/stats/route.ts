import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;

  if (!session || (role !== "ADMIN" && role !== "STAFF")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalClients,
    totalDocuments,
    pendingDocuments,
    readyDocuments,
    awaitingDocuments,
    unreadMessages,
    recentDocuments,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.document.count(),
    prisma.document.count({ where: { status: "PENDING" } }),
    prisma.document.count({ where: { status: "READY_FOR_RETRIEVAL" } }),
    prisma.document.count({ where: { status: "AWAITING_REQUIREMENTS" } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.document.findMany({
      take: 10,
      orderBy: { updatedAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  return NextResponse.json({
    totalClients,
    totalDocuments,
    pendingDocuments,
    readyDocuments,
    awaitingDocuments,
    unreadMessages,
    recentDocuments,
  });
}
