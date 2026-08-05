"use client";

import { Check, Star } from "lucide-react";
import Link from "next/link";

const rates = [
  {
    name: "Starter",
    subtitle: "New Business",
    price: "5,000",
    period: "one-time",
    description: "Perfect for startups registering their first business",
    featured: false,
    features: [
      "Business name verification",
      "SEC registration assistance",
      "BIR registration (single)",
      "Basic compliance checklist",
      "Email support",
      "1-month follow-up",
    ],
    cta: "Get Started",
    href: "/register",
  },
  {
    name: "Professional",
    subtitle: "Growing Business",
    price: "12,000",
    period: "per year",
    description: "Complete compliance and monitoring package for growing businesses",
    featured: true,
    features: [
      "Everything in Starter",
      "Annual statutory compliance",
      "Monthly accounts monitoring",
      "BIR returns preparation",
      "GIS submission",
      "Priority support",
      "Quarterly review",
      "Document tracking portal",
    ],
    cta: "Most Popular",
    href: "/register",
  },
  {
    name: "Enterprise",
    subtitle: "Established Business",
    price: "25,000",
    period: "per year",
    description: "Full-service package with audit, IP protection, and dedicated support",
    featured: false,
    features: [
      "Everything in Professional",
      "Internal & operational audit",
      "IPO registration (1 application)",
      "Full IP monitoring",
      "Dedicated account manager",
      "On-site consultations",
      "24/7 priority support",
      "Unlimited document tracking",
    ],
    cta: "Contact Us",
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
    <section id="rates" className="py-24 bg-brand-light chevron-bg border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-bebas text-brand-navy text-5xl md:text-6xl tracking-wide mb-4">
            SERVICE RATES
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-6" />
          <p className="text-gray-500 max-w-xl mx-auto font-light">
            Straightforward pricing with no hidden fees. All rates are in Philippine Peso (₱).
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {rates.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.featured
                  ? "bg-gradient-to-b from-brand-navy to-brand-dark shadow-2xl shadow-brand-navy/40 scale-105"
                  : "bg-white border border-gray-100 shadow-md hover:shadow-xl"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-royal to-blue-400" />
              )}
              {plan.featured && (
                <div className="flex items-center justify-center gap-1.5 py-2 bg-brand-royal/20">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold tracking-wider">MOST POPULAR</span>
                </div>
              )}

              <div className="p-8">
                <div className="mb-6">
                  <p className={`font-bebas text-lg tracking-widest ${plan.featured ? "text-brand-silver" : "text-brand-royal"}`}>
                    {plan.subtitle}
                  </p>
                  <h3 className={`font-bebas text-4xl tracking-wide ${plan.featured ? "text-white" : "text-brand-navy"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-2 font-light ${plan.featured ? "text-white/60" : "text-gray-400"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className={`text-2xl font-bold ${plan.featured ? "text-white" : "text-brand-navy"}`}>₱</span>
                    <span className={`font-bebas text-5xl ${plan.featured ? "text-white" : "text-brand-navy"}`}>
                      {plan.price}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${plan.featured ? "text-white/50" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        className={`mt-0.5 flex-shrink-0 ${plan.featured ? "text-brand-royal" : "text-green-500"}`}
                      />
                      <span className={`text-xs leading-relaxed ${plan.featured ? "text-white/80" : "text-gray-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.featured
                      ? "bg-brand-royal hover:bg-blue-600 text-white"
                      : "bg-brand-light hover:bg-brand-royal hover:text-white text-brand-navy border border-brand-silver"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional rates table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h3 className="font-bebas text-brand-navy text-2xl tracking-wide">
              À LA CARTE RATES
            </h3>
            <p className="text-gray-400 text-sm font-light mt-1">Individual service pricing</p>
          </div>
          <div className="divide-y divide-gray-50">
            {additionalRates.map((rate, i) => (
              <div
                key={rate.service}
                className="flex items-center justify-between px-8 py-4 hover:bg-brand-light/50 transition-colors"
              >
                <span className="text-sm text-gray-700 font-medium">{rate.service}</span>
                <span className="font-bebas text-brand-navy text-lg">₱ {rate.price}</span>
              </div>
            ))}
          </div>
          <div className="px-8 py-4 bg-brand-light/50 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-light">
              * Prices may vary based on complexity. Contact us for a personalized quote.
              All rates are exclusive of government fees and third-party charges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
