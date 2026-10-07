"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Clock } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const subjects = [
  "Business Registration Inquiry",
  "Accounts Monitoring",
  "Statutory Compliance",
  "IPO Registration",
  "Audit Services",
  "General Inquiry",
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Pure client-side static handling (or API simulation)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSent(true);
    reset();
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-bebas text-brand-navy text-4xl sm:text-5xl md:text-6xl tracking-wide mb-4">
            CONTACT US
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto font-light text-sm sm:text-base">
            Have questions about business registration, accounting, or compliance? Send us a message and our team will assist you immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-brand-navy to-brand-dark rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-bebas text-2xl sm:text-3xl tracking-wide mb-6">REACH US DIRECTLY</h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email Us",
                      value: "doublevdipolog@gmail.com",
                      href: "mailto:doublevdipolog@gmail.com",
                    },
                    {
                      icon: Phone,
                      label: "Call or SMS",
                      value: "0970-686-7170 / 0951-492-140",
                      href: "tel:09706867170",
                    },
                    {
                      icon: MapPin,
                      label: "Head Office Location",
                      value: "Calibo St., Corner General Luna, Central Barangay, Dipolog City, Zamboanga Del Norte",
                      href: "#location",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-royal/30 rounded-xl border border-brand-royal/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={18} className="text-brand-silver" />
                      </div>
                      <div>
                        <p className="text-brand-silver/70 text-xs font-medium mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-white text-sm font-medium hover:text-brand-royal transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-brand-silver/70 text-xs mb-3">
                  <Clock size={14} className="text-brand-royal" />
                  <span className="font-semibold uppercase tracking-wider">Business Hours</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-white/80 font-light">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-white">8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold text-white">8:00 AM – 12:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Interactive Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={36} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bebas text-brand-navy text-3xl tracking-wide mb-2">MESSAGE SENT SUCCESSFULLY!</h3>
                  <p className="text-gray-500 text-sm max-w-sm font-light mb-6">
                    Thank you for contacting Double V Business Support Services. Our team will review your inquiry and reach out shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="bg-brand-royal hover:bg-blue-600 text-white font-semibold text-xs py-3 px-6 rounded-xl transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Juan dela Cruz"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-400"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="juan@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-400"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                        Contact Number
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="09XX-XXX-XXXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                        Service Category *
                      </label>
                      <select
                        {...register("subject")}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all bg-white"
                      >
                        <option value="">Select a service category…</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      placeholder="Please share details about your business requirements…"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-400 resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-royal hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 group shadow-md shadow-brand-royal/20"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Submitting…</>
                    ) : (
                      <><Send size={18} className="group-hover:translate-x-1 transition-transform" /> Send Inquiry</>
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
