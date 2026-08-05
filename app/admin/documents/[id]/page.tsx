"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Save,
  Loader2,
  CheckCircle2,
  User,
  Mail,
  Calendar,
  Tag,
  AlertCircle,
  Clock,
  Package,
  XCircle,
} from "lucide-react";

type RequirementCheck = {
  id: string;
  requirement: string;
  checked: boolean;
  fileUrl?: string | null;
};

type Document = {
  id: string;
  userId?: string;
  title: string;
  type: string;
  status: string;
  description?: string;
  notes?: string;
  requirements?: string[];
  submittedAt?: string;
  readyAt?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  requirementChecks?: RequirementCheck[];
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING:               { label: "Pending",              color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  PROCESSING:            { label: "Processing",           color: "bg-blue-100 text-blue-800 border-blue-200",       icon: Loader2 },
  AWAITING_REQUIREMENTS: { label: "Needs Requirements",   color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertCircle },
  READY_FOR_RETRIEVAL:   { label: "Ready for Pickup",     color: "bg-green-100 text-green-800 border-green-200",    icon: CheckCircle2 },
  RETRIEVED:             { label: "Retrieved",            color: "bg-gray-100 text-gray-800 border-gray-200",       icon: Package },
  CANCELLED:             { label: "Cancelled",            color: "bg-red-100 text-red-800 border-red-200",          icon: XCircle },
};

const docTypeLabels: Record<string, string> = {
  SEC_REGISTRATION:       "SEC Registration",
  BIR_REGISTRATION:       "BIR Registration",
  PATENT:                 "Patent Registration",
  TRADEMARK:              "Trademark Registration",
  COPYRIGHT:              "Copyright Registration",
  AUDIT_REPORT:           "Audit Report",
  COMPLIANCE_REPORT:      "Compliance Report",
  OTHER:                  "Other / General",
};

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id;


  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [requirements, setRequirements] = useState("");

  useEffect(() => {
    fetch(`/api/admin/documents/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return; }
        setDoc(data);
        setStatus(data.status);
        setNotes(data.notes || "");
        setRequirements(data.requirements?.join("\n") || "");
      })
      .catch(() => setError("Failed to load document."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const reqArray = requirements
        .split("\n")
        .map((r: string) => r.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          notes,
          requirements: reqArray,
          ...(status === "READY_FOR_RETRIEVAL" && doc?.status !== "READY_FOR_RETRIEVAL"
            ? { readyAt: new Date().toISOString() }
            : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save."); return; }

      setDoc(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleCheck = async (checkId: string, currentVal: boolean) => {
    try {
      const res = await fetch(`/api/admin/requirements/${checkId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: !currentVal }),
      });
      if (res.ok) {
        const updatedCheck = await res.json();
        setDoc((prev) => {
          if (!prev) return prev;
          const updatedChecks = prev.requirementChecks?.map((c) =>
            c.id === checkId ? { ...c, checked: updatedCheck.checked, checkedAt: updatedCheck.checkedAt } : c
          );
          return { ...prev, requirementChecks: updatedChecks };
        });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update requirement status.");
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-8 w-48 shimmer rounded-xl" />
        <div className="h-64 shimmer rounded-2xl" />
        <div className="h-48 shimmer rounded-2xl" />
      </div>
    );
  }

  if (error && !doc) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertCircle size={40} className="text-red-400 mx-auto mb-3" />
          <p className="text-red-700 font-semibold mb-2">Document not found</p>
          <p className="text-red-500 text-sm mb-5">{error}</p>
          <Link href="/admin/documents"
            className="inline-flex items-center gap-2 bg-brand-royal text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            <ArrowLeft size={15} /> Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  const sc = statusConfig[doc!.status] || statusConfig.PENDING;
  const StatusIcon = sc.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/admin/documents"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-brand-navy text-sm transition-colors">
        <ArrowLeft size={15} /> Back to Documents
      </Link>

      {/* Document header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-brand-royal" />
            </div>
            <div>
              <h2 className="font-bebas text-brand-navy text-2xl tracking-wide">{doc!.title}</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                {docTypeLabels[doc!.type] || doc!.type.replace(/_/g, " ")}
              </p>
              {doc!.description && (
                <p className="text-gray-500 text-sm mt-2 max-w-lg">{doc!.description}</p>
              )}
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold border ${sc.color}`}>
            <StatusIcon size={12} />
            {sc.label}
          </span>
        </div>

        {/* Client info */}
        <div className="mt-6 pt-5 border-t border-gray-50 grid sm:grid-cols-2 gap-4">
          {[
            { icon: User,     label: "Client",   value: doc!.user.name },
            { icon: Mail,     label: "Email",    value: doc!.user.email },
            { icon: Calendar, label: "Submitted",value: new Date(doc!.createdAt).toLocaleDateString("en-PH", { dateStyle: "long" }) },
            { icon: Tag,      label: "Last Updated", value: new Date(doc!.updatedAt).toLocaleDateString("en-PH", { dateStyle: "long" }) },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <item.icon size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{item.label}</p>
                <p className="text-sm text-brand-navy font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-6">UPDATE DOCUMENT</h3>

        <div className="space-y-5">
          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Document Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 bg-white transition-all"
            >
              {Object.entries(statusConfig).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>

            {/* Status change hint */}
            {status === "READY_FOR_RETRIEVAL" && doc!.status !== "READY_FOR_RETRIEVAL" && (
              <div className="mt-2 flex items-center gap-2 text-xs text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                <CheckCircle2 size={13} />
                Setting this status will notify the client their document is ready for pickup.
              </div>
            )}
            {status === "AWAITING_REQUIREMENTS" && (
              <div className="mt-2 flex items-center gap-2 text-xs text-orange-600 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
                <AlertCircle size={13} />
                List the required documents below so the client knows what to submit.
              </div>
            )}
          </div>

          {/* Staff notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Staff Notes <span className="text-gray-300 normal-case font-normal">(visible to client)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add a message or update for the client regarding this document…"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 resize-none placeholder:text-gray-300 transition-all"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Required Documents <span className="text-gray-300 normal-case font-normal">(one per line)</span>
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={5}
              placeholder={"e.g.\nValid government-issued ID\nBarangay clearance\nLatest ITR\nCertificate of Registration"}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 resize-none placeholder:text-gray-300 font-mono transition-all"
            />
            <p className="text-xs text-gray-300 mt-1">
              Each line becomes a separate checklist item visible to the client.
            </p>
          </div>

          {/* Client Uploads Display */}
          {doc!.requirementChecks && doc!.requirementChecks.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Client Submissions
              </label>
              <div className="space-y-3">
                {doc!.requirementChecks.map((check) => (
                  <div key={check.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                    <button
                      onClick={() => handleToggleCheck(check.id, check.checked)}
                      className="flex items-center gap-2 text-left focus:outline-none group"
                      title="Click to toggle check / verification status"
                    >
                      <CheckCircle2
                        size={16}
                        className={`transition-colors ${
                          check.checked
                            ? "text-green-500 fill-green-50"
                            : "text-gray-300 group-hover:text-green-500"
                        }`}
                      />
                      <span className={`text-sm font-medium ${check.checked ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                        {check.requirement}
                      </span>
                    </button>
                    {check.fileUrl ? (
                      <a
                        href={check.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand-royal font-bold hover:underline bg-brand-light px-2.5 py-1 rounded-md transition-colors hover:bg-brand-royal hover:text-white"
                      >
                        View File
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">No file uploaded</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2">
              <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Save button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-royal hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all disabled:opacity-60 text-sm"
            >
              {saving ? (
                <><Loader2 size={16} className="animate-spin" /> Saving…</>
              ) : saved ? (
                <><CheckCircle2 size={16} /> Saved!</>
              ) : (
                <><Save size={16} /> Save Changes</>
              )}
            </button>
            <Link href="/admin/documents"
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-4">DOCUMENT TIMELINE</h3>
        <div className="space-y-4">
          {[
            { label: "Request submitted", time: doc!.createdAt, done: true },
            { label: "Document processing started", time: doc!.status !== "PENDING" ? doc!.updatedAt : null, done: doc!.status !== "PENDING" },
            { label: "Ready for client pickup", time: doc!.readyAt || null, done: !!doc!.readyAt },
            { label: "Document retrieved by client", time: doc!.status === "RETRIEVED" ? doc!.updatedAt : null, done: doc!.status === "RETRIEVED" },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? "bg-brand-royal" : "bg-gray-100"}`}>
                {step.done
                  ? <CheckCircle2 size={14} className="text-white" />
                  : <div className="w-2 h-2 bg-gray-300 rounded-full" />
                }
              </div>
              <div className="flex-1 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <p className={`text-sm font-medium ${step.done ? "text-brand-navy" : "text-gray-300"}`}>
                  {step.label}
                </p>
                {step.time && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(step.time).toLocaleDateString("en-PH", { dateStyle: "long" })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}