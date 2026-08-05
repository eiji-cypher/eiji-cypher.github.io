"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  PlusCircle,
  RefreshCw,
} from "lucide-react";

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

type Document = {
  id: string;
  title: string;
  type: string;
  status: string;
  notes?: string;
  requirements?: string[];
  updatedAt: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setDocuments(Array.isArray(data) ? data : []);
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, []);

  const stats = {
    total: documents.length,
    processing: documents.filter((d) => d.status === "PROCESSING").length,
    ready: documents.filter((d) => d.status === "READY_FOR_RETRIEVAL").length,
    awaiting: documents.filter((d) => d.status === "AWAITING_REQUIREMENTS").length,
  };

  const recent = documents.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-dark rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-royal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-brand-silver/70 text-sm font-medium mb-1">Welcome back,</p>
          <h2 className="font-bebas text-4xl tracking-wide mb-2">
            {session?.user?.name?.toUpperCase() || "CLIENT"}
          </h2>
          <p className="text-brand-silver/60 text-sm max-w-md">
            Track your document status, check what{"'"}s ready for pickup, and see what requirements you still need to submit.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/dashboard/new-request"
              className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <PlusCircle size={16} /> New Request
            </Link>
            <Link
              href="/dashboard/documents"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <FileText size={16} /> View All Documents
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Documents", value: stats.total, icon: FileText, color: "text-brand-royal", bg: "bg-brand-royal/10" },
          { label: "In Processing", value: stats.processing, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Ready for Pickup", value: stats.ready, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Needs Requirements", value: stats.awaiting, icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="font-bebas text-brand-navy text-3xl">{loading ? "—" : stat.value}</p>
            <p className="text-gray-400 text-xs font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent documents */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bebas text-brand-navy text-xl tracking-wide">RECENT DOCUMENTS</h3>
          <div className="flex items-center gap-3">
            <button onClick={fetchDocs} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <RefreshCw size={15} className="text-gray-400" />
            </button>
            <Link href="/dashboard/documents" className="text-brand-royal text-xs font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 shimmer rounded-xl" />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm font-medium mb-2">No documents yet</p>
            <p className="text-gray-300 text-xs mb-5">Submit a service request to get started</p>
            <Link
              href="/dashboard/new-request"
              className="inline-flex items-center gap-2 bg-brand-royal text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
              <PlusCircle size={16} /> Create First Request
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((doc) => (
              <Link
                key={doc.id}
                href={`/dashboard/documents/${doc.id}`}
                className="px-6 py-4 hover:bg-gray-50/50 transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 bg-brand-light group-hover:bg-brand-royal/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    <FileText size={16} className="text-brand-royal" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-navy group-hover:text-brand-royal truncate transition-colors">{doc.title}</p>
                    <p className="text-xs text-gray-400">{doc.type.replace(/_/g, " ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${statusColors[doc.status] || "bg-gray-100"}`}>
                    {statusLabels[doc.status]}
                  </span>
                  <p className="text-gray-300 text-xs hidden sm:block">
                    {new Date(doc.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Ready for pickup alert */}
      {stats.ready > 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-start gap-4">
          <CheckCircle2 size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-800 mb-1">
              {stats.ready} document{stats.ready > 1 ? "s" : ""} ready for pickup!
            </h4>
            <p className="text-green-600 text-sm">
              Please visit our office during business hours to retrieve your documents. Bring a valid ID.
            </p>
          </div>
        </div>
      )}

      {/* Needs requirements alert */}
      {stats.awaiting > 0 && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle size={24} className="text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-orange-800 mb-1">
              {stats.awaiting} document{stats.awaiting > 1 ? "s" : ""} need{stats.awaiting === 1 ? "s" : ""} your attention
            </h4>
            <p className="text-orange-600 text-sm">
              Some documents require additional requirements from you. Check your documents for details.
            </p>
            <Link href="/dashboard/documents" className="inline-flex items-center gap-1 text-orange-700 font-semibold text-sm mt-2 hover:underline">
              View requirements <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
