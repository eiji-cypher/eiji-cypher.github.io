"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, PhoneCall, MapPin } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Rates", href: "/#rates" },
    { label: "Certifications", href: "/#certifications" },
    { label: "FAQ", href: "/#faq" },
    { label: "Location", href: "/#location" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-royal via-blue-400 to-brand-royal w-full" />

      {/* Top Bar for contact info (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:block bg-brand-dark/95 border-b border-white/5 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-brand-silver/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-royal" />
              Dipolog City, Zamboanga Del Norte
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall size={13} className="text-brand-royal" />
              0970-686-7170 / 0951-492-140
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60 font-light">Mon – Sat: 8:00 AM – 5:00 PM</span>
            <span className="text-white/20">|</span>
            <a href="#footer" className="text-brand-royal hover:text-white font-semibold flex items-center gap-1 transition-colors">
              Developed by EijiDev
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#060728]/95 backdrop-blur-md shadow-xl border-b border-brand-royal/30 py-3"
            : "bg-[#060728] border-b border-white/10 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex-shrink-0 bg-white/5 rounded-lg p-1 border border-white/10 group-hover:border-brand-royal/50 transition-colors">
                <Image
                  src="/dvbss.logo.png"
                  alt="Double V Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div>
                <p className="font-bebas text-white text-xl sm:text-2xl leading-none tracking-wider group-hover:text-brand-silver transition-colors">
                  DOUBLE V
                </p>
                <p className="font-montserrat text-brand-silver text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold">
                  Business Support Services
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-brand-silver hover:text-white font-montserrat text-sm font-semibold tracking-wide transition-colors relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-royal group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-600 text-white font-montserrat text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-royal/30 border border-blue-400/30 transition-all duration-200 hover:scale-[1.02] active:scale-95 group"
              >
                <span>Inquire Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {open && (
        <div className="md:hidden bg-[#060728] border-b border-brand-royal/40 shadow-2xl animate-fade-up">
          <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-white hover:bg-brand-royal/20 border border-transparent hover:border-brand-royal/30 rounded-xl font-semibold text-base transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-3 border-t border-white/10 space-y-3">
              <a
                href="tel:09706867170"
                className="flex items-center justify-center gap-2 text-sm text-brand-silver py-3 rounded-xl bg-white/5 border border-white/10 font-medium"
              >
                <PhoneCall size={16} className="text-brand-royal" />
                <span>Call: 0970-686-7170</span>
              </a>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-brand-royal hover:bg-blue-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg w-full text-center"
              >
                <span>Inquire Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
