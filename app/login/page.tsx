"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, Loader2, Chrome } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      const role = (session.user as any)?.role;
      if (role === "ADMIN" || role === "STAFF") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [session, router]);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("Work in Progress: Our database and servers are undergoing cleaning. Login is temporarily disabled.");
  };

  const handleGoogle = async () => {
    setError("Work in Progress: Our database and servers are undergoing cleaning. Login is temporarily disabled.");
  };

  return (
    <div className="min-h-screen hero-gradient circuit-bg flex items-center justify-center px-4">
      {/* Decorative orbs */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Logo */}
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
            <div>
              <p className="font-bebas text-white text-2xl tracking-widest">DOUBLE V BSS</p>
              <p className="text-brand-silver/60 text-xs tracking-widest">CLIENT PORTAL</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="navy-glass rounded-2xl p-8">
          <h1 className="font-bebas text-white text-3xl tracking-wide mb-1">SIGN IN</h1>
          <p className="text-brand-silver/60 text-sm mb-6">Access your document tracking dashboard</p>

          {/* Work in Progress Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-6">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              ⚠️ Work in Progress
            </p>
            <p className="text-brand-silver/80 text-xs leading-relaxed">
              Our database and servers are currently undergoing maintenance and cleaning. 
              Login is temporarily disabled.
            </p>
          </div>

          {/* Google SSO */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-xl transition-all mb-6 text-sm disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleCredentials} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-silver/70 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
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
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-brand-silver/70 uppercase tracking-wide">
                  Password
                </label>
                <Link href="/forgot-password" className="text-brand-royal text-xs hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-silver/40" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-royal rounded-xl pl-10 pr-12 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-royal/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-royal hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              Sign In
            </button>
          </form>

          <p className="text-center text-brand-silver/50 text-sm mt-6">
            Don{"'"}t have an account?{" "}
            <Link href="/register" className="text-brand-royal font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <p className="text-center text-brand-silver/30 text-xs mt-6">
          <Link href="/" className="hover:text-white transition-colors">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
