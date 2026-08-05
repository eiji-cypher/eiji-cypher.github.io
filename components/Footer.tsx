import Link from "next/link";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/dvbss.logo.png"
                  alt="Double V Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-bebas text-white text-lg tracking-wider">DOUBLE V</p>
                <p className="text-brand-silver text-[10px] tracking-widest uppercase">Business Support Services</p>
              </div>
            </div>
            <p className="text-brand-silver/60 text-sm leading-relaxed font-light max-w-sm">
              Your trusted partner in business compliance, registration, and operational excellence 
              in Dipolog City and across the Philippines.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-royal rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="mailto:doublevdipolog@gmail.com"
                className="w-9 h-9 bg-white/10 hover:bg-brand-royal rounded-lg flex items-center justify-center transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bebas text-white tracking-widest text-sm mb-5 text-brand-silver/50">SERVICES</h4>
            <ul className="space-y-2.5">
              {[
                "Accounts Monitoring",
                "Business Registration",
                "Statutory Compliance",
                "IPO Registration",
                "Audit Services",
              ].map((s) => (
                <li key={s}>
                  <Link href="/#services" className="text-brand-silver/70 hover:text-white text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bebas text-white tracking-widest text-sm mb-5 text-brand-silver/50">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-brand-royal mt-0.5 flex-shrink-0" />
                <a href="mailto:doublevdipolog@gmail.com" className="text-brand-silver/70 hover:text-white text-xs transition-colors break-all">
                  doublevdipolog@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-brand-royal mt-0.5 flex-shrink-0" />
                <span className="text-brand-silver/70 text-xs">0970-686-7170<br />0951-492-140</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-royal mt-0.5 flex-shrink-0" />
                <span className="text-brand-silver/70 text-xs">Dipolog City,<br />Zamboanga del Norte</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-silver/40 text-xs">
            © {year} Double V Business Support Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-brand-silver/40 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-brand-silver/40 hover:text-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
