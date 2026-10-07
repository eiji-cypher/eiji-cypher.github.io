"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Code2, QrCode, X, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <footer className="bg-brand-dark text-white border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0 bg-white/5 rounded-lg p-1 border border-white/10">
                <Image
                  src="/dvbss.logo.png"
                  alt="Double V Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <p className="font-bebas text-white text-xl tracking-wider">DOUBLE V</p>
                <p className="text-brand-silver text-[9px] tracking-widest uppercase font-semibold">
                  Business Support Services
                </p>
              </div>
            </div>
            <p className="text-brand-silver/70 text-xs sm:text-sm leading-relaxed font-light">
              Your trusted partner in business compliance, registration, and operational excellence in Dipolog City and across the Philippines.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-9 h-9 bg-white/10 hover:bg-brand-royal rounded-xl flex items-center justify-center transition-colors border border-white/10"
              >
                <Facebook size={16} />
              </a>
              <a
                href="mailto:doublevdipolog@gmail.com"
                aria-label="Email Us"
                className="w-9 h-9 bg-white/10 hover:bg-brand-royal rounded-xl flex items-center justify-center transition-colors border border-white/10"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="font-bebas text-white tracking-widest text-sm mb-4 text-brand-silver/50">SERVICES</h4>
            <ul className="space-y-2.5">
              {[
                "Accounts Monitoring",
                "Business Registration",
                "Statutory Compliance",
                "IPO Registration",
                "Audit Services",
              ].map((s) => (
                <li key={s}>
                  <Link href="/#services" className="text-brand-silver/70 hover:text-white text-xs sm:text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-bebas text-white tracking-widest text-sm mb-4 text-brand-silver/50">CONTACT</h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-brand-royal mt-0.5 flex-shrink-0" />
                <a href="mailto:doublevdipolog@gmail.com" className="text-brand-silver/70 hover:text-white transition-colors break-all">
                  doublevdipolog@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-brand-royal mt-0.5 flex-shrink-0" />
                <span className="text-brand-silver/70">0970-686-7170<br />0951-492-140</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-royal mt-0.5 flex-shrink-0" />
                <span className="text-brand-silver/70">Calibo St., Corner Gen. Luna,<br />Central Barangay, Dipolog City,<br />Zamboanga Del Norte</span>
              </li>
            </ul>
          </div>

          {/* Developer Attribution Card Column (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-bebas text-white tracking-widest text-sm mb-4 text-brand-silver/50 flex items-center gap-1.5">
              <Code2 size={14} className="text-brand-royal" />
              DEVELOPED BY
            </h4>

            <div className="bg-white/5 border border-brand-royal/30 rounded-2xl p-4 flex items-center gap-3 hover:bg-white/10 transition-all duration-200 group">
              {/* EijiDev QR Code Thumbnail */}
              <button
                onClick={() => setShowQrModal(true)}
                className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/20 bg-white p-1 flex-shrink-0 cursor-pointer shadow-md group-hover:scale-105 transition-transform"
                title="Click to Enlarge EijiDev QR Code"
              >
                <Image
                  src="/eijidev-qr.png"
                  alt="EijiDev Developer QR Code"
                  fill
                  className="object-contain p-0.5"
                />
              </button>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bebas text-white text-lg tracking-wide group-hover:text-brand-royal transition-colors">
                    EijiDev
                  </span>
                </div>
                <p className="text-[10px] text-brand-silver/70 leading-tight mb-1">
                  Lead Web & AI Developer
                </p>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-royal hover:underline"
                >
                  <QrCode size={11} /> Scan Developer QR
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-brand-silver/50 text-xs">
              © Copyright © {year} doublevdipolog.com — All Rights Reserved.
            </p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-brand-silver/60 text-xs flex items-center gap-1">
              Crafted by <button onClick={() => setShowQrModal(true)} className="text-brand-royal font-semibold hover:underline">EijiDev</button>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-brand-silver/50 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-brand-silver/50 hover:text-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* EijiDev Developer QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md animate-fade-up">
          <div className="relative w-full max-w-sm bg-[#060728] border border-brand-royal/40 rounded-3xl p-6 shadow-2xl text-center navy-glass">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-brand-silver/50 hover:text-white transition-colors p-1 rounded-lg bg-white/5"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-brand-royal/20 border border-brand-royal/40 flex items-center justify-center mx-auto mb-3">
              <Code2 size={24} className="text-brand-royal" />
            </div>

            <h3 className="font-bebas text-white text-2xl tracking-wide mb-1">
              DEVELOPED BY EIJIDEV
            </h3>
            <p className="text-brand-silver/70 text-xs mb-4 font-light">
              Scan this QR code to connect with EijiDev for web development, software engineering, and AI integration services.
            </p>

            {/* High Res QR Code Display */}
            <div className="relative w-56 h-56 mx-auto bg-white p-3 rounded-2xl border-2 border-brand-royal/40 shadow-2xl mb-5">
              <Image
                src="/eijidev-qr.png"
                alt="EijiDev Developer QR Code"
                fill
                className="object-contain p-2"
              />
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-brand-royal hover:bg-blue-600 text-white font-semibold text-xs py-3 rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
