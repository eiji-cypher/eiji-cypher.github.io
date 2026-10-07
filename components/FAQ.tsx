"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Bot, Sparkles, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What documents are required to register a business with SEC & BIR?",
    answer: "Required documents vary based on business type. For corporations and partnerships: Proposed Business Name, Articles of Incorporation & By-laws, Director/Officer Valid IDs, Proof of Business Address, and Barangay Clearance. Our team guides you through every document checklist to ensure 100% first-time approval.",
  },
  {
    question: "How does the Monthly Accounts Monitoring service work?",
    answer: "Our team handles monthly bookkeeping, bank reconciliation, BIR tax return preparation (VAT, Percentage Tax, Income Tax Withholding), and GIS submissions. You receive regular summary reports keeping your financial records accurate and compliant.",
  },
  {
    question: "Where is Double V Business Support Services located?",
    answer: "Our main office is located at Calibo St., Corner General Luna, Central Barangay, Dipolog City, Zamboanga Del Norte, Philippines (GPS: 8.585475, 123.342567). We welcome clients Monday through Saturday.",
  },
  {
    question: "What are the costs for business registration and compliance packages?",
    answer: "Our Starter Package begins at ₱5,000 for single proprietorship and SEC assistance. The Professional Package is ₱12,000/year for complete annual statutory compliance and monthly accounts monitoring. Individual services start at ₱1,500.",
  },
  {
    question: "Can Double V assist with IPOPHL Trademark and Copyright registration?",
    answer: "Yes! We provide complete Intellectual Property Office of the Philippines (IPOPHL) filing for trademarks, patents, and copyrights to safeguard your brand logo, corporate identity, and proprietary software/inventions.",
  },
  {
    question: "How can I get started or request a custom service quote?",
    answer: "You can submit an inquiry via our online contact form, call us directly at 0970-686-7170 / 0951-492-140, or use our floating EIJI AI bot at the bottom right corner for instant answers!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-brand-light chevron-bg border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-bebas text-brand-navy text-4xl sm:text-5xl md:text-6xl tracking-wide mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto font-light text-sm sm:text-base">
            Everything you need to know about our business support services, compliance timelines, and rates.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-montserrat font-semibold text-brand-navy text-sm sm:text-base hover:text-brand-royal transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-royal/10 text-brand-royal text-xs flex items-center justify-center flex-shrink-0 font-bold">
                      {i + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-brand-royal transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-gray-600 text-xs sm:text-sm leading-relaxed font-light border-t border-gray-100 bg-gray-50/50 animate-fade-up">
                    <p className="pl-10">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom AI Assistant Promo Card */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-navy to-brand-dark rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-brand-royal/30 border border-brand-royal/40 flex items-center justify-center flex-shrink-0">
              <Bot size={28} className="text-brand-silver" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                <h3 className="font-bebas text-2xl tracking-wide">HAVE A SPECIFIC QUESTION?</h3>
                <Sparkles size={16} className="text-amber-400" />
              </div>
              <p className="text-brand-silver/80 text-xs font-light">
                Ask our interactive EIJI AI bot in the bottom right corner for instant help anytime!
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-600 text-white font-semibold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md shadow-brand-royal/30 flex-shrink-0"
          >
            <span>Inquire Directly</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
