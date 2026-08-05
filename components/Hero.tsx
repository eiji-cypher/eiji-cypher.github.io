"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient circuit-bg flex items-center overflow-hidden wave-divider">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-royal/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-brand-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-navy/40 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 flex flex-col items-center justify-center text-center">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center max-w-3xl">
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <span className="text-brand-silver text-xs font-semibold tracking-widest uppercase">
              Trusted Business Partner
            </span>
          </div>

          <div className="mb-6 animate-fade-up animate-delay-100">
            <span className="block text-brand-royal text-sm md:text-base font-montserrat font-bold tracking-[0.4em] mb-6 uppercase">
              OFFICIAL
            </span>
            <div className="flex justify-center">
              <Image
                src="/dvbss.logo.png"
                alt="Double V BSS Logo"
                width={450}
                height={450}
                className="object-contain drop-shadow-2xl w-full max-w-[260px] sm:max-w-[350px] md:max-w-[450px]"
                priority
              />
            </div>
          </div>

          <p className="text-brand-silver/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl font-montserrat font-light animate-fade-up animate-delay-200">
            Your trusted partner in business compliance, registration, and operational excellence. 
            Track your documents, monitor your filings, and stay ahead of every deadline — all in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-up animate-delay-300">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-royal/40 group"
            >
              Open an Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
            >
              Our Services
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 animate-fade-up animate-delay-400">
            {[
              { value: "500+", label: "Clients Served" },
              { value: "100%", label: "Compliance Rate" },
              { value: "5★", label: "Service Rating" },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-white/20 pl-4">
                <p className="font-bebas text-white text-3xl">{stat.value}</p>
                <p className="text-brand-silver/70 text-xs font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
