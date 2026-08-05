"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, Search, Filter, RefreshCw, ChevronDown, Edit3, Save, X, Loader2 } from "lucide-react";

type Document = {
  id: string;
  title: string;
  type: string;
  status: string;
  notes?: string;
  requirements?: string[];
  user: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
};

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  PROCESSING: { label: "Processing", color: "bg-blue-100 text-blue-800 border-blue-200" },
  AWAITING_REQUIREMENTS: { label: "Needs Requirements", color: "bg-orange-100 text-orange-800 border-orange-200" },
  READY_FOR_RETRIEVAL: { label: "Ready for Pickup", color: "bg-green-100 text-green-800 border-green-200" },
  RETRIEVED: { label: "Retrieved", color: "bg-gray-100 text-gray-800 border-gray-200" },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200" },
};

type EditingDoc = {
  id: string;
  status: string;
  notes: string;
  requirements: string;
};

export default function AdminDocumentsPage() {
  const searchParams = useSearchParams();
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "ALL");
  const [editing, setEditing] = useState<EditingDoc | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/documents");
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
    const q = search.toLowerCase();
    const matchSearch = d.title.toLowerCase().includes(q) || d.user.name?.toLowerCase().includes(q) || d.user.email?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const startEdit = (doc: Document) => {
    setEditing({
      id: doc.id,
      status: doc.status,
      notes: doc.notes || "",
      requirements: doc.requirements?.join("\n") || "",
    });
    setExpandedId(doc.id);
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const reqArray = editing.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/documents/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editing.status,
          notes: editing.notes,
          requirements: reqArray,
          ...(editing.status === "READY_FOR_RETRIEVAL" ? { readyAt: new Date().toISOString() } : {}),
        }),
      });

      if (res.ok) {
        setDocs((prev) =>
          prev.map((d) =>
            d.id === editing.id
              ? { ...d, status: editing.status, notes: editing.notes, requirements: reqArray }
              : d
          )
        );
        setEditing(null);
      }
    } catch {}
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">ALL DOCUMENTS</h2>
          <p className="text-gray-400 text-sm">{docs.length} total documents</p>
        </div>
        <button onClick={fetchDocs} className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-royal transition-colors">
          <RefreshCw size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-wrap gap-3">
        <div className="flex-1 min-w-48 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, client name or email…"
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

      {/* Document list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-20 shimmer rounded-xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <FileText size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No documents found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((doc) => {
              const sc = statusConfig[doc.status];
              const isExpanded = expandedId === doc.id;
              const isEditing = editing?.id === doc.id;

              return (
                <div key={doc.id}>
                  {/* Row */}
                  <div
                    className="px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (!isEditing) setExpandedId(isExpanded ? null : doc.id);
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText size={17} className="text-brand-royal" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-brand-navy truncate">{doc.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            <span className="font-medium">{doc.user.name}</span> · {doc.user.email}
                          </p>
                          <p className="text-xs text-gray-300 mt-1">{doc.type.replace(/_/g, " ")} · {new Date(doc.updatedAt).toLocaleDateString("en-PH", { dateStyle: "medium" })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${sc.color}`}>
                          {sc.label}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(doc); }}
                          className="p-2 hover:bg-brand-royal/10 rounded-lg transition-colors group"
                          title="Edit status"
                        >
                          <Edit3 size={14} className="text-gray-400 group-hover:text-brand-royal transition-colors" />
                        </button>
                        <ChevronDown size={14} className={`text-gray-300 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded / editing */}
                  {isExpanded && (
                    <div className="px-6 pb-6 bg-gray-50/30 border-t border-gray-50">
                      {isEditing ? (
                        <div className="mt-5 space-y-4 max-w-2xl">
                          <h4 className="font-semibold text-brand-navy text-sm">Update Document Status</h4>

                          {/* Status */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Status</label>
                            <select
                              value={editing.status}
                              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal bg-white"
                            >
                              {Object.entries(statusConfig).map(([k, v]) => (
                                <option key={k} value={k}>{v.label}</option>
                              ))}
                            </select>
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Staff Notes (visible to client)</label>
                            <textarea
                              value={editing.notes}
                              onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                              rows={3}
                              placeholder="Add notes for the client about this document…"
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal resize-none placeholder:text-gray-300"
                            />
                          </div>

                          {/* Requirements */}
                          <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                              Required Documents (one per line)
                            </label>
                            <textarea
                              value={editing.requirements}
                              onChange={(e) => setEditing({ ...editing, requirements: e.target.value })}
                              rows={4}
                              placeholder={"e.g.\nValid government-issued ID\nBarangay clearance\nLatest ITR"}
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal resize-none placeholder:text-gray-300 font-mono"
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={saveEdit}
                              disabled={saving}
                              className="flex items-center gap-2 bg-brand-royal hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-60"
                            >
                              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                              Save Changes
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                            >
                              <X size={15} /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 space-y-3">
                          {doc.notes && (
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                              <p className="text-xs font-semibold text-blue-600 mb-1">Staff Notes</p>
                              <p className="text-sm text-blue-800">{doc.notes}</p>
                            </div>
                          )}
                          {doc.requirements && doc.requirements.length > 0 && (
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                              <p className="text-xs font-semibold text-orange-600 mb-2">Required Documents</p>
                              <ul className="space-y-1">
                                {doc.requirements.map((r, i) => (
                                  <li key={i} className="text-sm text-orange-800 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" /> {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {!doc.notes && (!doc.requirements || doc.requirements.length === 0) && (
                            <p className="text-gray-300 text-sm italic">No additional notes or requirements set.</p>
                          )}
                          <button
                            onClick={() => startEdit(doc)}
                            className="text-brand-royal text-sm font-semibold hover:underline flex items-center gap-1.5"
                          >
                            <Edit3 size={13} /> Edit this document
                          </button>
                        </div>
                      )}
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
