"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Package,
} from "lucide-react";

type Stats = {
  totalClients: number;
  totalDocuments: number;
  pendingDocuments: number;
  readyDocuments: number;
  awaitingDocuments: number;
  unreadMessages: number;
  recentDocuments: any[];
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
  AWAITING_REQUIREMENTS: "bg-orange-100 text-orange-800 border-orange-200",
  READY_FOR_RETRIEVAL: "bg-green-100 text-green-800 border-green-200",
  RETRIEVED: "bg-gray-100 text-gray-800 border-gray-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  AWAITING_REQUIREMENTS: "Needs Requirements",
  READY_FOR_RETRIEVAL: "Ready for Pickup",
  RETRIEVED: "Retrieved",
  CANCELLED: "Cancelled",
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Clients", value: stats?.totalClients ?? "—", icon: Users, color: "text-brand-royal", bg: "bg-brand-royal/10", href: "/admin/clients" },
    { label: "Total Documents", value: stats?.totalDocuments ?? "—", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/documents" },
    { label: "Ready for Pickup", value: stats?.readyDocuments ?? "—", icon: Package, color: "text-green-600", bg: "bg-green-50", href: "/admin/documents?status=READY_FOR_RETRIEVAL" },
    { label: "Need Attention", value: (stats?.pendingDocuments ?? 0) + (stats?.awaitingDocuments ?? 0) || "—", icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50", href: "/admin/documents?status=PENDING" },
    { label: "Unread Messages", value: stats?.unreadMessages ?? "—", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-dark rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-royal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-brand-silver/70 text-sm font-medium mb-1">Staff Dashboard</p>
          <h2 className="font-bebas text-4xl tracking-wide mb-2">ADMIN OVERVIEW</h2>
          <p className="text-brand-silver/60 text-sm max-w-md">
            Manage client documents, update statuses, respond to inquiries, and track all service requests.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-brand-royal/30 hover:shadow-md transition-all group"
          >
            <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
              <card.icon size={19} className={card.color} />
            </div>
            <p className="font-bebas text-brand-navy text-3xl">{loading ? "—" : card.value}</p>
            <p className="text-gray-400 text-xs font-medium mt-0.5 group-hover:text-brand-royal transition-colors">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent documents */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bebas text-brand-navy text-xl tracking-wide">RECENT DOCUMENTS</h3>
          <Link href="/admin/documents" className="text-brand-royal text-xs font-semibold hover:underline flex items-center gap-1">
            Manage all <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-16 shimmer rounded-xl" />)}
          </div>
        ) : !stats?.recentDocuments?.length ? (
          <div className="p-12 text-center">
            <FileText size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No documents yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stats.recentDocuments.map((doc: any) => (
              <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 bg-brand-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={15} className="text-brand-royal" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-navy truncate">{doc.title}</p>
                    <p className="text-xs text-gray-400">{doc.user?.name || "Unknown"} · {doc.type.replace(/_/g, " ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusColors[doc.status]}`}>
                    {statusLabels[doc.status]}
                  </span>
                  <Link
                    href={`/admin/documents/${doc.id}`}
                    className="text-xs text-brand-royal hover:underline font-medium"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
