"use client";

import {
  Award,
  BadgeCheck,
  Star,
  Landmark,
  FileText,
  Scale,
  GraduationCap,
  FileCheck,
  Building2,
} from "lucide-react";

const certifications = [
  {
    title: "Securities and Exchange Commission",
    abbr: "SEC",
    detail: "Accredited Business Registration Agent",
    year: "2018",
    icon: Landmark,
    color: "border-blue-200 bg-blue-50/60",
    badgeColor: "bg-blue-100 text-blue-700 border border-blue-200",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    title: "Bureau of Internal Revenue",
    abbr: "BIR",
    detail: "Authorized Tax Agent / Practitioner",
    year: "2019",
    icon: FileText,
    color: "border-emerald-200 bg-emerald-50/60",
    badgeColor: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    iconColor: "text-emerald-600 bg-emerald-100",
  },
  {
    title: "Intellectual Property Office of the Philippines",
    abbr: "IPOPHL",
    detail: "Registered IP Service Provider",
    year: "2020",
    icon: Scale,
    color: "border-purple-200 bg-purple-50/60",
    badgeColor: "bg-purple-100 text-purple-700 border border-purple-200",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    title: "Philippine Institute of Certified Public Accountants",
    abbr: "PICPA",
    detail: "Certified Member in Good Standing",
    year: "2017",
    icon: GraduationCap,
    color: "border-amber-200 bg-amber-50/60",
    badgeColor: "bg-amber-100 text-amber-700 border border-amber-200",
    iconColor: "text-amber-600 bg-amber-100",
  },
  {
    title: "Professional Regulation Commission",
    abbr: "PRC",
    detail: "Licensed Certified Public Accountant",
    year: "2016",
    icon: FileCheck,
    color: "border-rose-200 bg-rose-50/60",
    badgeColor: "bg-rose-100 text-rose-700 border border-rose-200",
    iconColor: "text-rose-600 bg-rose-100",
  },
  {
    title: "Business Permit & Licensing Office",
    abbr: "BPLO",
    detail: "Licensed Business Establishment",
    year: "2017",
    icon: Building2,
    color: "border-teal-200 bg-teal-50/60",
    badgeColor: "bg-teal-100 text-teal-700 border border-teal-200",
    iconColor: "text-teal-600 bg-teal-100",
  },
];

const awards = [
  { title: "Best Business Support Firm", org: "Dipolog Business Awards", year: "2023" },
  { title: "Outstanding SME Partner", org: "Zamboanga Peninsula Chamber of Commerce", year: "2022" },
  { title: "Excellence in Compliance Services", org: "Regional Business Summit", year: "2023" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            CREDENTIALS & RECOGNITION
          </span>
          <h2 className="font-bebas text-brand-navy text-4xl sm:text-5xl md:text-6xl tracking-wide mb-4">
            CERTIFICATIONS & ACCREDITATIONS
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-5" />
          <p className="text-gray-500 max-w-xl mx-auto font-light text-sm sm:text-base">
            Our team holds official accreditations and licenses to deliver 
            reliable, legal, and compliant business solutions.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert) => {
            const IconComponent = cert.icon;
            return (
              <div
                key={cert.abbr}
                className={`border-2 ${cert.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${cert.iconColor} flex items-center justify-center shadow-sm`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BadgeCheck size={16} className="text-emerald-500" />
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cert.badgeColor}`}>
                        Since {cert.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bebas text-brand-navy text-2xl tracking-wide mb-1">{cert.abbr}</h3>
                  <p className="text-gray-700 text-xs font-semibold mb-2">{cert.title}</p>
                </div>
                <p className="text-gray-500 text-xs font-light">{cert.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Awards */}
        <div className="bg-gradient-to-br from-brand-navy via-brand-navy to-brand-dark rounded-2xl p-6 sm:p-10 shadow-xl border border-white/10">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
              <Star size={20} className="text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-bebas text-white text-2xl sm:text-3xl tracking-wide">AWARDS & RECOGNITION</h3>
              <p className="text-brand-silver/60 text-xs font-light">Honors from business associations and chambers of commerce</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.title}
                className="glass-card rounded-xl p-6 hover:bg-white/15 transition-all duration-200 border border-white/10"
              >
                <Award size={28} className="text-amber-400 mb-3" />
                <h4 className="font-montserrat text-white font-semibold text-sm mb-2">{award.title}</h4>
                <p className="text-brand-silver/70 text-xs mb-2">{award.org}</p>
                <span className="inline-block bg-brand-royal/40 border border-brand-royal/60 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
