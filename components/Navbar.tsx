"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showWip, setShowWip] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Rates", href: "/#rates" },
    { label: "Certifications", href: "/#certifications" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-brand-navy/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/dvbss.logo.png"
                alt="Double V Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-bebas text-white text-lg leading-tight tracking-wider">DOUBLE V</p>
              <p className="font-montserrat text-brand-silver text-[10px] tracking-widest uppercase">Business Support Services</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-silver hover:text-white font-montserrat text-sm font-medium tracking-wide transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-royal group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2 text-white text-sm font-medium transition-all"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <User size={16} />
                  )}
                  <span className="max-w-24 truncate">{session.user?.name?.split(" ")[0]}</span>
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-brand-dark border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-brand-silver hover:text-white hover:bg-white/10 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowWip(true)}
                  className="text-brand-silver hover:text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowWip(true)}
                  className="bg-brand-royal hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-brand-silver hover:text-white hover:bg-white/10 rounded-lg font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-3 px-4 text-white bg-white/10 rounded-lg text-sm font-medium">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 py-3 px-4 text-red-400 hover:bg-white/10 rounded-lg text-sm font-medium w-full">
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setOpen(false); setShowWip(true); }}
                    className="block py-3 px-4 text-brand-silver hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium text-center w-full">
                    Sign In
                  </button>
                  <button onClick={() => { setOpen(false); setShowWip(true); }}
                    className="block py-3 px-4 bg-brand-royal text-white rounded-lg text-sm font-semibold text-center w-full">
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Work in Progress Popup Modal */}
      {showWip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-md bg-brand-dark border border-brand-royal/30 rounded-2xl p-8 shadow-2xl shadow-brand-navy/60 text-center navy-glass animate-fade-up">
            <button
              onClick={() => setShowWip(false)}
              className="absolute top-4 right-4 text-brand-silver/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="font-bebas text-white text-3xl tracking-wide mb-2">
              Work in Progress
            </h3>
            <p className="text-brand-silver/80 text-sm leading-relaxed mb-6 font-montserrat font-light">
              Our database and servers are currently undergoing maintenance and cleaning. 
              Registration and login are temporarily disabled.
            </p>
            <button
              onClick={() => setShowWip(false)}
              className="w-full bg-brand-royal hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all font-montserrat"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
