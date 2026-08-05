"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen hero-gradient circuit-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="relative w-14 h-14 flex-shrink-0 mb-2">
              <Image
                src="/dvbss.logo.png"
                alt="Double V Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="font-bebas text-white text-2xl tracking-widest">DOUBLE V BSS</p>
          </Link>
        </div>

        <div className="navy-glass rounded-2xl p-8">
          {sent ? (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-green-400 mx-auto mb-4" />
              <h2 className="font-bebas text-white text-3xl tracking-wide mb-2">EMAIL SENT!</h2>
              <p className="text-brand-silver/60 text-sm mb-6">
                If that email is registered, you{"'"}ll receive a password reset link shortly.
              </p>
              <Link href="/login" className="text-brand-royal font-semibold hover:underline text-sm">
                Return to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-bebas text-white text-3xl tracking-wide mb-1">FORGOT PASSWORD</h1>
              <p className="text-brand-silver/60 text-sm mb-8">Enter your email to receive a reset link</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-silver/70 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-silver/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-brand-royal rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-royal/20 transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-royal hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  Send Reset Link
                </button>
              </form>

              <Link href="/login" className="flex items-center justify-center gap-1.5 text-brand-silver/50 hover:text-white text-sm mt-6 transition-colors">
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
