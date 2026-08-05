"use client";

import {
  BookOpen,
  Building2,
  ShieldCheck,
  Award,
  Search,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Accounts Monitoring",
    description:
      "Comprehensive monitoring of your business accounts to ensure accuracy and financial health. Regular reports and real-time alerts keep you informed.",
    features: ["Monthly reconciliation", "Financial reports", "Budget tracking", "Cash flow analysis"],
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: Building2,
    title: "Business Registration",
    description:
      "Complete SEC and BIR registration services for new and existing businesses. We handle all paperwork and follow-ups on your behalf.",
    features: ["SEC registration", "BIR registration", "Business name renewal", "Amendments & updates"],
    color: "from-indigo-600 to-indigo-800",
  },
  {
    icon: ShieldCheck,
    title: "Statutory Compliance",
    description:
      "Never miss a regulatory deadline. Our team ensures your business meets all statutory requirements on time, every time.",
    features: ["Annual filing compliance", "GIS submission", "BIR returns", "Penalty avoidance"],
    color: "from-violet-600 to-violet-800",
  },
  {
    icon: Award,
    title: "IPO Registration",
    description:
      "Protect your intellectual property with expert registration of patents, trademarks, and copyrights through the Intellectual Property Office.",
    features: ["Patent registration", "Trademark filing", "Copyright protection", "IP monitoring"],
    color: "from-brand-blue to-brand-navy",
  },
  {
    icon: Search,
    title: "Audit Services",
    description:
      "Internal and operational audit services to strengthen your business controls, identify risks, and improve efficiency.",
    features: ["Internal audit", "Operational audit", "Risk assessment", "Control testing"],
    color: "from-slate-600 to-slate-800",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            WHAT WE DO
          </span>
          <h2 className="font-bebas text-brand-navy text-5xl md:text-6xl tracking-wide mb-4">
            OUR SERVICES
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-6" />
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            From business registration to intellectual property protection, we provide comprehensive
            support to keep your business compliant and growing.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-brand-royal/30 shadow-sm hover:shadow-xl hover:shadow-brand-navy/10 transition-all duration-300 overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${service.color}`} />

              <div className="p-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                  <service.icon size={22} className="text-white" />
                </div>

                <h3 className="font-bebas text-brand-navy text-2xl tracking-wide mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 font-light">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-royal flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-brand-royal text-sm font-semibold hover:gap-3 transition-all group-hover:underline"
                >
                  Inquire now <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
