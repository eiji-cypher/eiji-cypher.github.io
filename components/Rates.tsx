"use client";

import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const rates = [
  {
    name: "Starter",
    subtitle: "New Business",
    price: "5,000",
    period: "one-time",
    description: "Perfect for startups registering their first business establishment",
    featured: false,
    features: [
      "Business name verification",
      "SEC registration assistance",
      "BIR registration (single)",
      "Basic compliance checklist",
      "Email & phone support",
      "1-month follow-up support",
    ],
    cta: "Inquire Starter",
    href: "/#contact",
  },
  {
    name: "Professional",
    subtitle: "Growing Business",
    price: "12,000",
    period: "per year",
    description: "Complete compliance and monitoring package for growing companies",
    featured: true,
    features: [
      "Everything in Starter",
      "Annual statutory compliance",
      "Monthly accounts monitoring",
      "BIR returns preparation",
      "GIS submission & filing",
      "Priority phone & chat support",
      "Quarterly review meetings",
      "Document checklist management",
    ],
    cta: "Get Most Popular",
    href: "/#contact",
  },
  {
    name: "Enterprise",
    subtitle: "Established Business",
    price: "25,000",
    period: "per year",
    description: "Full-service package with audit, IP protection, and dedicated CPA",
    featured: false,
    features: [
      "Everything in Professional",
      "Internal & operational audit",
      "IPO registration (1 application)",
      "Full IP monitoring & defense",
      "Dedicated account officer",
      "On-site consultations",
      "24/7 priority response",
      "Custom compliance roadmap",
    ],
    cta: "Contact Enterprise",
    href: "/#contact",
  },
];

const additionalRates = [
  { service: "SEC Registration (Single Proprietor)", price: "2,500" },
  { service: "SEC Registration (Corporation)", price: "5,000" },
  { service: "BIR Registration", price: "1,500" },
  { service: "Patent Registration", price: "8,000" },
  { service: "Trademark Registration", price: "6,500" },
  { service: "Copyright Registration", price: "3,000" },
  { service: "Internal Audit (per engagement)", price: "15,000" },
  { service: "Annual Compliance Package", price: "8,000" },
];

export default function Rates() {
  return (
    <section id="rates" className="py-20 md:py-24 bg-brand-light chevron-bg border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-bebas text-brand-navy text-4xl sm:text-5xl md:text-6xl tracking-wide mb-4">
            SERVICE RATES
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-5" />
          <p className="text-gray-500 max-w-xl mx-auto font-light text-sm sm:text-base">
            Straightforward pricing with no hidden fees. All rates are in Philippine Peso (₱).
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
          {rates.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                plan.featured
                  ? "bg-gradient-to-b from-brand-navy to-brand-dark shadow-2xl shadow-brand-navy/40 md:-translate-y-2"
                  : "bg-white border border-gray-100 shadow-md hover:shadow-xl"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-royal via-blue-400 to-brand-royal" />
              )}
              {plan.featured && (
                <div className="flex items-center justify-center gap-1.5 py-2 bg-brand-royal/20 border-b border-brand-royal/30">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs font-semibold tracking-wider uppercase">MOST POPULAR</span>
                </div>
              )}

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <p className={`font-bebas text-lg tracking-widest ${plan.featured ? "text-brand-silver" : "text-brand-royal"}`}>
                      {plan.subtitle}
                    </p>
                    <h3 className={`font-bebas text-3xl sm:text-4xl tracking-wide ${plan.featured ? "text-white" : "text-brand-navy"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-2 font-light leading-relaxed ${plan.featured ? "text-white/70" : "text-gray-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-gray-100 dark:border-white/10">
                    <div className="flex items-end gap-1">
                      <span className={`text-2xl font-bold ${plan.featured ? "text-white" : "text-brand-navy"}`}>₱</span>
                      <span className={`font-bebas text-5xl ${plan.featured ? "text-white" : "text-brand-navy"}`}>
                        {plan.price}
                      </span>
                    </div>
                    <span className={`text-xs font-medium ${plan.featured ? "text-white/60" : "text-gray-400"}`}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${plan.featured ? "text-brand-royal" : "text-emerald-500"}`}
                        />
                        <span className={`text-xs sm:text-sm leading-relaxed ${plan.featured ? "text-white/80" : "text-gray-600"}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.featured
                      ? "bg-brand-royal hover:bg-blue-600 text-white shadow-lg shadow-brand-royal/30"
                      : "bg-brand-light hover:bg-brand-royal hover:text-white text-brand-navy border border-brand-silver/50"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional rates table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 sm:px-8 py-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bebas text-brand-navy text-2xl tracking-wide">
              À LA CARTE SERVICES
            </h3>
            <p className="text-gray-500 text-xs font-light">Individual service pricing</p>
          </div>
          <div className="divide-y divide-gray-100">
            {additionalRates.map((rate) => (
              <div
                key={rate.service}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-3.5 hover:bg-brand-light/40 transition-colors gap-1 sm:gap-4"
              >
                <span className="text-xs sm:text-sm text-gray-700 font-medium">{rate.service}</span>
                <span className="font-bebas text-brand-navy text-lg sm:text-xl">₱ {rate.price}</span>
              </div>
            ))}
          </div>
          <div className="px-6 sm:px-8 py-4 bg-brand-light/50 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-light">
              * Prices may vary based on business complexity. Contact us for a custom package estimate.
              All rates exclude official government fees and third-party charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
