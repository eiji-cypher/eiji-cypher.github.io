"use client";

import { Award, BadgeCheck, ShieldCheck, Star } from "lucide-react";

const certifications = [
  {
    title: "Securities and Exchange Commission",
    abbr: "SEC",
    detail: "Accredited Business Registration Agent",
    year: "2018",
    icon: "🏛️",
    color: "border-blue-200 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Bureau of Internal Revenue",
    abbr: "BIR",
    detail: "Authorized Tax Agent / Practitioner",
    year: "2019",
    icon: "📋",
    color: "border-green-200 bg-green-50",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    title: "Intellectual Property Office of the Philippines",
    abbr: "IPOPHL",
    detail: "Registered IP Service Provider",
    year: "2020",
    icon: "⚖️",
    color: "border-purple-200 bg-purple-50",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    title: "Philippine Institute of Certified Public Accountants",
    abbr: "PICPA",
    detail: "Certified Member in Good Standing",
    year: "2017",
    icon: "🎓",
    color: "border-orange-200 bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    title: "Professional Regulation Commission",
    abbr: "PRC",
    detail: "Licensed Certified Public Accountant",
    year: "2016",
    icon: "📜",
    color: "border-red-200 bg-red-50",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    title: "Business Permit & Licensing Office",
    abbr: "BPLO",
    detail: "Licensed Business Establishment",
    year: "2017",
    icon: "🏢",
    color: "border-teal-200 bg-teal-50",
    badgeColor: "bg-teal-100 text-teal-700",
  },
];

const awards = [
  { title: "Best Business Support Firm", org: "Dipolog Business Awards", year: "2023" },
  { title: "Outstanding SME Partner", org: "Zamboanga Peninsula Chamber of Commerce", year: "2022" },
  { title: "Excellence in Compliance Services", org: "Regional Business Summit", year: "2023" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            CREDENTIALS & RECOGNITION
          </span>
          <h2 className="font-bebas text-brand-navy text-5xl md:text-6xl tracking-wide mb-4">
            CERTIFICATIONS
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-6" />
          <p className="text-gray-500 max-w-xl mx-auto font-light">
            Our team holds the proper certifications and accreditations to deliver 
            professional, compliant services you can trust.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.abbr}
              className={`border-2 ${cert.color} rounded-2xl p-6 hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{cert.icon}</div>
                <div className="flex items-center gap-2">
                  <BadgeCheck size={16} className="text-green-500" />
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cert.badgeColor}`}>
                    Since {cert.year}
                  </span>
                </div>
              </div>
              <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-1">{cert.abbr}</h3>
              <p className="text-gray-600 text-xs font-medium mb-2">{cert.title}</p>
              <p className="text-gray-400 text-xs font-light">{cert.detail}</p>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="bg-gradient-to-br from-brand-navy to-brand-dark rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
            <h3 className="font-bebas text-white text-3xl tracking-wide">AWARDS & RECOGNITION</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.title}
                className="glass-card rounded-xl p-6 hover:bg-white/15 transition-colors"
              >
                <Award size={24} className="text-yellow-400 mb-3" />
                <h4 className="font-montserrat text-white font-semibold text-sm mb-2">{award.title}</h4>
                <p className="text-brand-silver/70 text-xs mb-1">{award.org}</p>
                <p className="text-brand-royal text-xs font-bold">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
