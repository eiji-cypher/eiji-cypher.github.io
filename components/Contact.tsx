"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const subjects = [
  "Business Registration Inquiry",
  "Accounts Monitoring",
  "Statutory Compliance",
  "IPO Registration",
  "Audit Services",
  "Document Status",
  "General Inquiry",
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSent(true);
        reset();
      } else {
        setError(result.message || "Failed to send message.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-bebas text-brand-navy text-5xl md:text-6xl tracking-wide mb-4">
            CONTACT US
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-brand-navy to-brand-dark rounded-2xl p-8 text-white">
              <h3 className="font-bebas text-2xl tracking-wide mb-6">REACH US DIRECTLY</h3>

              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "doublevdipolog@gmail.com",
                    href: "mailto:doublevdipolog@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Contact No.",
                    value: "0970-686-7170 / 0951-492-140",
                    href: "tel:09706867170",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Dipolog City, Zamboanga del Norte",
                    href: null,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-royal/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon size={18} className="text-brand-silver" />
                    </div>
                    <div>
                      <p className="text-brand-silver/70 text-xs font-medium mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm hover:text-brand-royal transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-brand-silver/70 text-xs mb-3">Business Hours</p>
                <div className="space-y-1 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-semibold">8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">8:00 AM – 12:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={56} className="text-green-500 mb-4" />
                  <h3 className="font-bebas text-brand-navy text-3xl tracking-wide mb-2">MESSAGE SENT!</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 1-2 business days.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-brand-royal text-sm font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Juan dela Cruz"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="juan@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="09XX-XXX-XXXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Subject *
                      </label>
                      <select
                        {...register("subject")}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all bg-white"
                      >
                        <option value="">Select a subject…</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us how we can help you…"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300 resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-royal hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={18} className="group-hover:translate-x-1 transition-transform" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
