"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[55vh] lg:min-h-[65vh] hero-gradient circuit-bg flex items-center overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-14">
      {/* Animated background glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 right-10 w-72 h-72 bg-brand-royal/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-brand-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-navy/40 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-3.5 py-1 mb-3 animate-fade-up">
          <ShieldCheck size={14} className="text-brand-royal" />
          <span className="text-brand-silver text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
            Official Business Partner in Dipolog City
          </span>
        </div>

        {/* Brand Logo & Title */}
        <div className="mb-3 animate-fade-up animate-delay-100 flex flex-col items-center">
          <span className="block text-brand-royal text-[11px] sm:text-xs font-montserrat font-bold tracking-[0.35em] mb-2 uppercase">
            WELCOME TO
          </span>
          <div className="flex justify-center max-w-[200px] sm:max-w-[260px] md:max-w-[310px]">
            <Image
              src="/dvbss.logo.png"
              alt="Double V Business Support Services Logo"
              width={310}
              height={310}
              className="object-contain drop-shadow-2xl h-auto"
              priority
            />
          </div>
        </div>

        {/* Hero Tagline / Subtitle */}
        <p className="text-brand-silver/90 text-xs sm:text-sm md:text-base leading-relaxed mb-5 max-w-xl font-montserrat font-light animate-fade-up animate-delay-200">
          Your trusted partner in business compliance, SEC & BIR registration, statutory filing, and operational excellence in Dipolog City and nationwide.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 animate-fade-up animate-delay-300 w-full sm:w-auto">
          <Link
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-royal hover:bg-blue-600 text-white font-montserrat font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-brand-royal/30 transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <span>Inquire Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/#services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-montserrat font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span>Our Services</span>
          </Link>
        </div>

        {/* Key Stats Counter */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 pt-5 border-t border-white/15 w-full max-w-xl animate-fade-up animate-delay-400">
          <div className="flex flex-col items-center">
            <p className="font-bebas text-white text-xl sm:text-3xl tracking-wide">500+</p>
            <p className="text-brand-silver/70 text-[10px] sm:text-xs font-medium">Clients Served</p>
          </div>
          <div className="flex flex-col items-center border-x border-white/15 px-2 sm:px-4">
            <p className="font-bebas text-white text-xl sm:text-3xl tracking-wide">100%</p>
            <p className="text-brand-silver/70 text-[10px] sm:text-xs font-medium">Compliance Rate</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <p className="font-bebas text-white text-xl sm:text-3xl tracking-wide">5.0</p>
              <Star size={14} className="text-amber-400 fill-amber-400" />
            </div>
            <p className="text-brand-silver/70 text-[10px] sm:text-xs font-medium">Service Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
