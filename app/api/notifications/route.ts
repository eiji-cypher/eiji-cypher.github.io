import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const role = (session.user as any).role;

  let notifications: any[] = [];

  if (role === "ADMIN" || role === "STAFF") {
    // Admin notifications
    const [pendingDocs, unreadMessages, newClients] = await Promise.all([
      prisma.document.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { user: { select: { name: true } } },
      }),
      prisma.contactMessage.findMany({
        where: { read: false },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.user.findMany({
        where: {
          role: "CLIENT",
          createdAt: { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

    pendingDocs.forEach((doc) => {
      notifications.push({
        id: `doc-pending-${doc.id}`,
        type: "pending",
        title: "New document request",
        message: `${doc.user.name} submitted: ${doc.title}`,
        time: doc.createdAt,
        href: "/admin/documents",
      });
    });

    unreadMessages.forEach((msg) => {
      notifications.push({
        id: `msg-${msg.id}`,
        type: "message",
        title: "New contact message",
        message: `${msg.name}: ${msg.subject}`,
        time: msg.createdAt,
        href: "/admin/messages",
      });
    });

    newClients.forEach((client) => {
      notifications.push({
        id: `client-${client.id}`,
        type: "client",
        title: "New client registered",
        message: `${client.name} just created an account`,
        time: client.createdAt,
        href: "/admin/clients",
      });
    });
  } else {
    // Client notifications
    const docs = await prisma.document.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    docs.forEach((doc) => {
      if (doc.status === "READY_FOR_RETRIEVAL") {
        notifications.push({
          id: `ready-${doc.id}`,
          type: "ready",
          title: "Document ready for pickup!",
          message: `"${doc.title}" is ready. Please visit our office.`,
          time: doc.updatedAt,
          href: "/dashboard/documents",
        });
      } else if (doc.status === "AWAITING_REQUIREMENTS") {
        notifications.push({
          id: `req-${doc.id}`,
          type: "requirements",
          title: "Action required",
          message: `"${doc.title}" needs additional documents from you.`,
          time: doc.updatedAt,
          href: "/dashboard/documents",
        });
      } else if (doc.status === "PROCESSING") {
        notifications.push({
          id: `proc-${doc.id}`,
          type: "processing",
          title: "Document in progress",
          message: `"${doc.title}" is currently being processed.`,
          time: doc.updatedAt,
          href: "/dashboard/documents",
        });
      }
    });
  }

  // Sort by most recent
  notifications.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return NextResponse.json(notifications.slice(0, 8));
}
