"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileImage,
  UploadCloud,
  Trash2,
  ExternalLink,
  Loader2,
  Calendar,
  MessageSquare,
  Sparkles,
} from "lucide-react";

type RequirementCheck = {
  id: string;
  requirement: string;
  checked: boolean;
  fileUrl?: string | null;
  checkedAt?: string | null;
};

type DocumentRequest = {
  id: string;
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
  requirementChecks: RequirementCheck[];
};

const statusConfig: Record<string, { label: string; color: string; desc: string; icon: any }> = {
  PENDING: {
    label: "Awaiting Review",
    color: "bg-yellow-50 text-yellow-800 border-yellow-200",
    desc: "Your request has been received and is waiting to be reviewed by our team.",
    icon: Clock,
  },
  PROCESSING: {
    label: "In Processing",
    color: "bg-blue-50 text-blue-800 border-blue-200",
    desc: "Our accountants are currently working on your request.",
    icon: Loader2,
  },
  AWAITING_REQUIREMENTS: {
    label: "Action Required",
    color: "bg-orange-50 text-orange-800 border-orange-200",
    desc: "We need additional documents to proceed. Please review the checklist below.",
    icon: AlertCircle,
  },
  READY_FOR_RETRIEVAL: {
    label: "Ready for Pickup",
    color: "bg-green-50 text-green-800 border-green-200",
    desc: "Your request is completed! Please pick up the hard copies at our main branch.",
    icon: CheckCircle2,
  },
  RETRIEVED: {
    label: "Retrieved / Completed",
    color: "bg-gray-50 text-gray-800 border-gray-200",
    desc: "Your document request is complete and documents have been retrieved.",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-50 text-red-800 border-red-200",
    desc: "This request has been cancelled. Contact support for more details.",
    icon: AlertCircle,
  },
};

const docTypeLabels: Record<string, string> = {
  SEC_REGISTRATION: "SEC Registration",
  BIR_REGISTRATION: "BIR Registration",
  PATENT: "Patent Registration",
  TRADEMARK: "Trademark Registration",
  COPYRIGHT: "Copyright Registration",
  AUDIT_REPORT: "Audit Report",
  COMPLIANCE_REPORT: "Compliance Report",
  OTHER: "Other / General",
};

export default function DocumentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [doc, setDoc] = useState<DocumentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadingCheckId, setUploadingCheckId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<Record<string, boolean>>({});
  const [uploadError, setUploadError] = useState<Record<string, string>>({});

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchDocumentDetails = useCallback(async () => {
    try {
      const res = await fetch(`/api/documents/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch document details");
      }
      const data = await res.json();
      setDoc(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDocumentDetails();
  }, [fetchDocumentDetails]);

  // File type & helper identification
  const getFileIcon = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <FileText className="text-red-500 w-8 h-8 flex-shrink-0" />;
    if (["xls", "xlsx", "csv"].includes(ext || "")) return <FileSpreadsheet className="text-green-600 w-8 h-8 flex-shrink-0" />;
    if (["png", "jpg", "jpeg", "gif"].includes(ext || "")) return <FileImage className="text-blue-500 w-8 h-8 flex-shrink-0" />;
    return <FileText className="text-gray-400 w-8 h-8 flex-shrink-0" />;
  };

  // Secure File Upload handling via XHR for progress tracking
  const handleFileUpload = (file: File, checkId: string) => {
    // Validate client-side
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const allowed = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".xls", ".xlsx", ".csv"];
    
    if (!allowed.includes(ext)) {
      setUploadError((prev) => ({
        ...prev,
        [checkId]: "Invalid file type. Please upload a PDF, PNG, JPG, JPEG, GIF, XLS, XLSX, or CSV file.",
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError((prev) => ({
        ...prev,
        [checkId]: "File exceeds the 10MB limit.",
      }));
      return;
    }

    setUploadError((prev) => ({ ...prev, [checkId]: "" }));
    setUploadingCheckId(checkId);
    setUploadProgress((prev) => ({ ...prev, [checkId]: 0 }));

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress((prev) => ({ ...prev, [checkId]: percent }));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        fetchDocumentDetails(); // Refresh document state
      } else {
        try {
          const errData = JSON.parse(xhr.responseText || "{}");
          setUploadError((prev) => ({ ...prev, [checkId]: errData.error || "Upload failed." }));
        } catch {
          setUploadError((prev) => ({ ...prev, [checkId]: "Upload failed." }));
        }
      }
      setUploadingCheckId(null);
    });

    xhr.addEventListener("error", () => {
      setUploadError((prev) => ({ ...prev, [checkId]: "Network error occurred during upload." }));
      setUploadingCheckId(null);
    });

    xhr.open("PATCH", `/api/documents/${id}/requirements/${checkId}`);
    xhr.send(formData);
  };

  const handleFileDelete = async (checkId: string) => {
    if (!confirm("Are you sure you want to delete your submitted file?")) return;

    setUploadingCheckId(checkId);
    try {
      const res = await fetch(`/api/documents/${id}/requirements/${checkId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDocumentDetails();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete file.");
      }
    } catch {
      alert("Failed to connect to the server.");
    } finally {
      setUploadingCheckId(null);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent, checkId: string, active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [checkId]: active }));
  };

  const handleDrop = (e: React.DragEvent, checkId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [checkId]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], checkId);
    }
  };

  const triggerFileSelect = (checkId: string) => {
    fileInputRefs.current[checkId]?.click();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="h-6 w-32 shimmer rounded-lg" />
        <div className="h-44 shimmer rounded-2xl" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-80 shimmer rounded-2xl" />
          </div>
          <div className="space-y-6">
            <div className="h-64 shimmer rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mt-12">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
          <p className="text-red-800 font-semibold mb-2">Request Not Found</p>
          <p className="text-red-600 text-sm mb-6">{error || "This document request does not exist or you do not have permission to view it."}</p>
          <Link href="/dashboard/documents"
            className="inline-flex items-center gap-2 bg-brand-royal text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            <ArrowLeft size={15} /> Back to My Documents
          </Link>
        </div>
      </div>
    );
  }

  const currentStatus = doc.status;
  const config = statusConfig[currentStatus] || statusConfig.PENDING;
  const StatusIcon = config.icon;

  // Determine stage active indexes for stepper
  const steps = [
    { key: "PENDING", label: "Request Received" },
    { key: "PROCESSING", label: "Under Review" },
    { key: "AWAITING_REQUIREMENTS", label: "Requirements Needed" },
    { key: "READY_FOR_RETRIEVAL", label: "Ready for Pickup" },
    { key: "RETRIEVED", label: "Retrieved / Completed" },
  ];

  let currentStepIdx = steps.findIndex((s) => s.key === currentStatus);
  if (currentStatus === "CANCELLED") currentStepIdx = -1;

  // For visual consistency, if processing is done or awaiting reqs is done, they show completed.
  const isStepCompleted = (index: number) => {
    if (currentStatus === "RETRIEVED") return true;
    if (currentStatus === "READY_FOR_RETRIEVAL" && index <= 3) return true;
    if (currentStatus === "AWAITING_REQUIREMENTS" && index <= 2) return true;
    if (currentStatus === "PROCESSING" && index <= 1) return true;
    if (currentStatus === "PENDING" && index === 0) return true;
    return false;
  };

  const isStepActive = (index: number) => {
    return currentStepIdx === index;
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Back button & Title */}
      <div>
        <Link
          href="/dashboard/documents"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-brand-navy text-sm transition-colors mb-4"
        >
          <ArrowLeft size={15} /> Back to My Documents
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-bebas text-brand-navy text-4xl tracking-wide">{doc.title}</h2>
            <p className="text-gray-400 text-sm mt-0.5">
              Service: <span className="font-semibold text-gray-500">{docTypeLabels[doc.type] || doc.type}</span>
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full font-semibold border ${config.color}`}>
            <StatusIcon size={13} className={currentStatus === "PROCESSING" ? "animate-spin" : ""} />
            {config.label}
          </span>
        </div>
      </div>

      {/* Visual Status Tracker Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-8">REQUEST STATUS TRACKER</h3>
        
        {currentStatus === "CANCELLED" ? (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-800">This request has been cancelled by staff.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Horizontal Line for large screens, Vertical for small */}
            <div className="absolute top-5 left-6 right-6 hidden md:block h-0.5 bg-gray-100 -z-10">
              <div
                className="h-full bg-brand-royal transition-all duration-500"
                style={{ width: `${(Math.max(0, currentStepIdx) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              {steps.map((step, idx) => {
                const done = isStepCompleted(idx);
                const active = isStepActive(idx);
                return (
                  <div key={step.key} className="flex md:flex-col items-center text-left md:text-center gap-4 md:gap-3 relative">
                    {/* Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                        done
                          ? "bg-brand-royal text-white shadow-lg shadow-brand-royal/20"
                          : active
                          ? "bg-brand-blue border-4 border-brand-light text-white ring-2 ring-brand-royal animate-pulse"
                          : "bg-white border-2 border-gray-200 text-gray-300"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Text Description */}
                    <div>
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          active ? "text-brand-royal font-extrabold" : done ? "text-brand-navy" : "text-gray-300"
                        }`}
                      >
                        {step.label}
                      </p>
                      {active && (
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden md:block">
                          Current Stage
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Requirements Submission Zone */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
              <div>
                <h3 className="font-bebas text-brand-navy text-xl tracking-wide">REQUIRED DOCUMENTS</h3>
                <p className="text-gray-400 text-xs">Upload your documents below to fulfill request requirements</p>
              </div>
              <span className="text-xs bg-brand-light text-brand-navy px-3 py-1.5 rounded-xl font-bold">
                {doc.requirementChecks.filter(r => r.fileUrl).length} / {doc.requirementChecks.length} Submitted
              </span>
            </div>

            {doc.requirementChecks.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-sm font-medium">No additional files required</p>
                <p className="text-gray-300 text-xs mt-1">Our staff will request documents here if needed.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {doc.requirementChecks.map((check) => {
                  const hasFile = !!check.fileUrl;
                  const isUploading = uploadingCheckId === check.id;
                  const currentProgress = uploadProgress[check.id] || 0;
                  const isDragActive = dragActive[check.id];
                  const errMessage = uploadError[check.id];

                  return (
                    <div
                      key={check.id}
                      className={`border rounded-2xl p-5 transition-all ${
                        check.checked
                          ? "border-green-100 bg-green-50/20"
                          : hasFile
                          ? "border-blue-100 bg-blue-50/10"
                          : isDragActive
                          ? "border-brand-royal bg-brand-royal/5 border-dashed scale-[1.01]"
                          : "border-gray-100 hover:border-brand-silver bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                        <div className="flex items-start gap-3.5 min-w-0">
                          {/* Check / Alert Indicator */}
                          <div className={`mt-0.5 p-1 rounded-lg ${check.checked ? "bg-green-100 text-green-600" : hasFile ? "bg-blue-100 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                            {check.checked ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              <AlertCircle size={16} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-brand-navy leading-tight">{check.requirement}</h4>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                              Status:{" "}
                              <span className={`font-semibold ${check.checked ? "text-green-600" : hasFile ? "text-blue-600 animate-pulse" : "text-orange-500"}`}>
                                {check.checked ? "Approved & Verified" : hasFile ? "Under Staff Review" : "Awaiting Upload"}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Top corner actions */}
                        {hasFile && !check.checked && !isUploading && (
                          <button
                            onClick={() => handleFileDelete(check.id)}
                            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
                            title="Delete submission"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      {/* Upload and File display section */}
                      <div className="mt-4 pl-8">
                        {isUploading ? (
                          /* Upload progress bar */
                          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center space-y-3">
                            <Loader2 size={24} className="animate-spin text-brand-royal mx-auto" />
                            <div className="max-w-xs mx-auto">
                              <div className="flex justify-between text-xs text-gray-500 font-semibold mb-1">
                                <span>Uploading document…</span>
                                <span>{currentProgress}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-brand-royal rounded-full transition-all duration-100"
                                  style={{ width: `${currentProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : hasFile ? (
                          /* Uploaded File Presentation */
                          <div className="flex items-center justify-between gap-3 bg-white p-3 border border-gray-100 rounded-xl">
                            <div className="flex items-center gap-3 min-w-0">
                              {getFileIcon(check.fileUrl!)}
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-brand-navy truncate">
                                  {check.fileUrl!.split("/").pop()}
                                </p>
                                {check.checkedAt && (
                                  <p className="text-[10px] text-gray-400 font-medium">
                                    Submitted {new Date(check.checkedAt).toLocaleDateString("en-PH", { dateStyle: "medium" })}
                                  </p>
                                )}
                              </div>
                            </div>
                            <a
                              href={check.fileUrl!}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-brand-royal font-semibold hover:underline bg-brand-light px-3 py-1.5 rounded-lg transition-colors hover:bg-brand-royal hover:text-white"
                            >
                              View File <ExternalLink size={11} />
                            </a>
                          </div>
                        ) : (
                          /* Drag & Drop Submission Dropzone */
                          <div>
                            <div
                              onDragOver={(e) => handleDrag(e, check.id, true)}
                              onDragLeave={(e) => handleDrag(e, check.id, false)}
                              onDrop={(e) => handleDrop(e, check.id)}
                              onClick={() => triggerFileSelect(check.id)}
                              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                                isDragActive
                                  ? "border-brand-royal bg-brand-royal/5"
                                  : "border-gray-200 hover:border-brand-royal/50 hover:bg-gray-50/50"
                              }`}
                            >
                              <input
                                type="file"
                                ref={(el) => {
                                  fileInputRefs.current[check.id] = el;
                                }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleFileUpload(e.target.files[0], check.id);
                                  }
                                }}
                                className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg,.gif,.xls,.xlsx,.csv"
                              />
                              <UploadCloud className="text-gray-300 w-8 h-8 mx-auto mb-2" />
                              <p className="text-xs font-bold text-brand-navy">
                                Drag & drop document here, or <span className="text-brand-royal hover:underline">browse</span>
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                PDF, Spreadsheet, or Image up to 10MB
                              </p>
                            </div>
                            {errMessage && (
                              <p className="text-red-500 text-xs mt-2 flex items-center gap-1.5">
                                <AlertCircle size={12} /> {errMessage}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Log System & Staff Comments */}
        <div className="space-y-6">
          {/* Notification / Log System */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-brand-royal" /> Staff Updates & Notes
            </h3>
            
            {doc.notes ? (
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Staff Comment
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Updated {new Date(doc.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-brand-navy leading-relaxed">{doc.notes}</p>
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-gray-100 rounded-xl">
                <p className="text-xs text-gray-400 font-medium">No messages left by staff yet.</p>
                <p className="text-[10px] text-gray-300 mt-1">We will notify you if details change.</p>
              </div>
            )}

            {/* Document Activity History log */}
            <div className="mt-6">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4">Request Log</h4>
              <div className="space-y-4">
                {[
                  { label: "Request Created", date: doc.createdAt, icon: Sparkles, color: "text-purple-500 bg-purple-50" },
                  ...(doc.status !== "PENDING" ? [{ label: "Review Started", date: doc.updatedAt, icon: Clock, color: "text-blue-500 bg-blue-50" }] : []),
                  ...(doc.readyAt ? [{ label: "Marked Ready for Pickup", date: doc.readyAt, icon: CheckCircle2, color: "text-green-500 bg-green-50" }] : []),
                  ...(doc.status === "RETRIEVED" ? [{ label: "Documents Picked Up", date: doc.updatedAt, icon: CheckCircle2, color: "text-gray-500 bg-gray-50" }] : []),
                ].map((log, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${log.color}`}>
                      <log.icon size={13} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-brand-navy leading-tight">{log.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {new Date(log.date).toLocaleDateString("en-PH", { dateStyle: "medium" })} at{" "}
                        {new Date(log.date).toLocaleTimeString("en-PH", { timeStyle: "short" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action alerts and branch guidelines */}
          {currentStatus === "READY_FOR_RETRIEVAL" && (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 space-y-3 shadow-lg shadow-green-100/50 animate-bounce">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle2 size={20} className="text-green-600" />
                <h4 className="font-bold text-sm">Retrieve Hard Copies</h4>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">
                Your processed document files are compiled and ready for collection!
              </p>
              <div className="text-[10px] text-green-600 bg-green-100/30 p-2.5 rounded-lg space-y-1">
                <p>📍 **Office Branch**: Dipolog Main Office</p>
                <p>⏰ **Hours**: Mon-Fri 8:00 AM - 5:00 PM</p>
                <p>📇 **Requirements**: Bring 1 valid Government Photo ID</p>
              </div>
            </div>
          )}

          {currentStatus === "AWAITING_REQUIREMENTS" && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-orange-800">
                <AlertCircle size={20} className="text-orange-600" />
                <h4 className="font-bold text-sm">Action Needed!</h4>
              </div>
              <p className="text-xs text-orange-700 leading-relaxed">
                Please upload the pending files in the required document checklist to help our staff continue processing.
              </p>
            </div>
          )}

          {/* Service detail card */}
          <div className="bg-gradient-to-br from-brand-navy to-brand-dark rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-brand-royal/10 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
            <h4 className="font-bebas text-lg tracking-wide mb-3">Service Guidelines</h4>
            <p className="text-[10px] text-brand-silver/70 leading-relaxed">
              Standard processing times are between 3-5 business days depending on agency turnarounds (SEC, BIR, IPO).
              For any urgent requests, please contact our support desk directly at doublevdipolog@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
