"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  PlusCircle,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  XCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

type Document = {
  id: string;
  title: string;
  type: string;
  status: string;
  notes?: string;
  requirements?: string[];
  submittedAt?: string;
  readyAt?: string;
  updatedAt: string;
  createdAt: string;
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  PROCESSING: { label: "Processing", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Loader2 },
  AWAITING_REQUIREMENTS: { label: "Needs Requirements", color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertCircle },
  READY_FOR_RETRIEVAL: { label: "Ready for Pickup", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 },
  RETRIEVED: { label: "Retrieved", color: "bg-gray-100 text-gray-800 border-gray-200", icon: Package },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected] = useState<Document | null>(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setDocs(Array.isArray(data) ? data : []);
    } catch {
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocs(); }, []);

  const filtered = docs.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.type.includes(search.toUpperCase());
    const matchStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">MY DOCUMENTS</h2>
          <p className="text-gray-400 text-sm">{docs.length} total document{docs.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchDocs} className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-royal transition-colors">
            <RefreshCw size={16} className="text-gray-500" />
          </button>
          <Link
            href="/dashboard/new-request"
            className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <PlusCircle size={16} /> New Request
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand-royal transition-colors"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-xl pl-9 pr-8 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-brand-royal bg-white appearance-none"
          >
            <option value="ALL">All Status</option>
            {Object.entries(statusConfig).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-20 shimmer rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <FileText size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium mb-1">
              {search || statusFilter !== "ALL" ? "No matching documents" : "No documents yet"}
            </p>
            <p className="text-gray-300 text-sm mb-6">
              {search || statusFilter !== "ALL" ? "Try adjusting your search or filter" : "Submit your first service request to get started"}
            </p>
            {!(search || statusFilter !== "ALL") && (
              <Link href="/dashboard/new-request"
                className="inline-flex items-center gap-2 bg-brand-royal text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
                <PlusCircle size={16} /> Create Request
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((doc) => {
              const sc = statusConfig[doc.status] || statusConfig.PENDING;
              const StatusIcon = sc.icon;
              return (
                <div
                  key={doc.id}
                  className="px-6 py-5 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setSelected(selected?.id === doc.id ? null : doc)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-brand-royal" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-brand-navy truncate">{doc.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{doc.type.replace(/_/g, " ")}</p>
                        <p className="text-xs text-gray-300 mt-1">
                          Updated {new Date(doc.updatedAt).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold border ${sc.color}`}>
                        <StatusIcon size={12} />
                        {sc.label}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`text-gray-300 transition-transform ${selected?.id === doc.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded details */}
                  {selected?.id === doc.id && (
                    <div className="mt-5 pl-14 space-y-4 animate-fade-up">
                      {doc.notes && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wide">Staff Notes</p>
                          <p className="text-sm text-blue-800">{doc.notes}</p>
                        </div>
                      )}
                      {doc.requirements && doc.requirements.length > 0 && (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                          <p className="text-xs font-semibold text-orange-600 mb-3 uppercase tracking-wide flex items-center gap-1.5">
                            <AlertCircle size={13} /> Required Documents
                          </p>
                          <ul className="space-y-2">
                            {doc.requirements.map((req, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-orange-800">
                                <div className="w-5 h-5 border-2 border-orange-300 rounded flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {doc.readyAt && (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                          <p className="text-xs font-semibold text-green-600 mb-1 uppercase tracking-wide">Ready Since</p>
                          <p className="text-sm text-green-800">{new Date(doc.readyAt).toLocaleDateString("en-PH", { dateStyle: "full" })}</p>
                          <p className="text-xs text-green-600 mt-2">Please bring a valid ID when picking up your documents.</p>
                        </div>
                      )}
                      <div className="flex justify-end pt-2">
                        <Link
                          href={`/dashboard/documents/${doc.id}`}
                          className="inline-flex items-center gap-1.5 bg-brand-royal hover:bg-blue-700 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Status Tracker & Submit Documents <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
