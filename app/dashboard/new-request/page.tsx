"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  type: z.string().min(1, "Please select a document type"),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const serviceTypes = [
  { value: "SEC_REGISTRATION", label: "SEC Registration", group: "Business Registration" },
  { value: "BIR_REGISTRATION", label: "BIR Registration", group: "Business Registration" },
  { value: "AUDIT_REPORT", label: "Audit Report", group: "Audit Services" },
  { value: "COMPLIANCE_REPORT", label: "Compliance Report", group: "Audit Services" },
  { value: "PATENT", label: "Patent Registration", group: "IPO Registration" },
  { value: "TRADEMARK", label: "Trademark Registration", group: "IPO Registration" },
  { value: "COPYRIGHT", label: "Copyright Registration", group: "IPO Registration" },
  { value: "OTHER", label: "Other / General", group: "Other" },
];

export default function NewRequestPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(result.error || "Failed to submit request.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="font-bebas text-brand-navy text-3xl tracking-wide mb-2">REQUEST SUBMITTED!</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
            Your service request has been submitted. Our team will review it and update the status within 1-2 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/documents"
              className="inline-flex items-center justify-center gap-2 bg-brand-royal text-white font-semibold text-sm px-6 py-3 rounded-xl"
            >
              <FileText size={16} /> View My Documents
            </Link>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center justify-center gap-2 bg-brand-light text-brand-navy font-semibold text-sm px-6 py-3 rounded-xl border border-brand-silver"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-brand-navy text-sm transition-colors mb-4">
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>
        <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">NEW SERVICE REQUEST</h2>
        <p className="text-gray-400 text-sm mt-1">Fill out the form below to submit your document request</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Document / Service Title *
            </label>
            <input
              {...register("title")}
              placeholder="e.g. SEC Registration for ABC Company"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Document Type *
            </label>
            <select
              {...register("type")}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all bg-white"
            >
              <option value="">Select document type…</option>
              {Object.entries(
                serviceTypes.reduce((acc, s) => ({
                  ...acc,
                  [s.group]: [...(acc[s.group] || []), s],
                }), {} as Record<string, typeof serviceTypes>)
              ).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Additional Details
            </label>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="Provide any additional information relevant to your request…"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300 resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-brand-light rounded-xl p-4 border border-brand-silver/50">
            <p className="text-xs text-brand-navy font-semibold mb-1">What happens next?</p>
            <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
              <li>Our team reviews your request (1-2 business days)</li>
              <li>We{"'"}ll notify you of any required documents</li>
              <li>Once processed, your document will be marked Ready for Pickup</li>
              <li>Visit our office to retrieve your documents</li>
            </ol>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-royal hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
