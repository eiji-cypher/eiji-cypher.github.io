"use client";

import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from "lucide-react";

export default function Location() {
  const coordinates = "8.585475,123.342567";
  const fullAddress = "Calibo St., Corner General Luna, Central Barangay, Dipolog City, Zamboanga Del Norte, Philippines";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${coordinates}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-20 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block font-bebas text-brand-royal text-sm tracking-[0.3em] mb-3">
            WHERE TO FIND US
          </span>
          <h2 className="font-bebas text-brand-navy text-4xl sm:text-5xl md:text-6xl tracking-wide mb-4">
            OUR LOCATION
          </h2>
          <div className="w-16 h-1 bg-brand-royal mx-auto mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto font-light text-sm sm:text-base">
            Visit our office in Dipolog City for face-to-face consultations and document processing.
          </p>
        </div>

        {/* Location Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Card (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-royal/30 border border-brand-royal/40 flex items-center justify-center">
                  <MapPin size={20} className="text-brand-silver" />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl tracking-wide">DIPOLOG CITY OFFICE</h3>
                  <p className="text-brand-silver/70 text-xs">Main Office</p>
                </div>
              </div>

              <div className="space-y-6 text-sm font-light">
                <div className="flex items-start gap-3.5">
                  <MapPin size={18} className="text-brand-royal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-sm">Full Address</p>
                    <p className="text-brand-silver/90 text-xs mt-1 leading-relaxed font-normal">
                      Calibo St., Corner General Luna, Central Barangay, Dipolog City, Zamboanga Del Norte, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone size={18} className="text-brand-royal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-sm">Contact Numbers</p>
                    <a href="tel:09706867170" className="text-brand-silver/80 hover:text-white text-xs mt-0.5 block transition-colors">
                      0970-686-7170
                    </a>
                    <a href="tel:0951492140" className="text-brand-silver/80 hover:text-white text-xs block transition-colors">
                      0951-492-140
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail size={18} className="text-brand-royal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-sm">Email Address</p>
                    <a href="mailto:doublevdipolog@gmail.com" className="text-brand-silver/80 hover:text-white text-xs mt-0.5 block transition-colors break-all">
                      doublevdipolog@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock size={18} className="text-brand-royal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-sm">Office Hours</p>
                    <p className="text-brand-silver/80 text-xs mt-0.5">Mon – Fri: 8:00 AM – 5:00 PM</p>
                    <p className="text-brand-silver/80 text-xs">Sat: 8:00 AM – 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-royal hover:bg-blue-600 text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md shadow-brand-royal/30 group"
              >
                <Navigation size={16} className="group-hover:rotate-12 transition-transform" />
                <span>Get Directions in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Interactive Responsive Map (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-gray-200 shadow-md min-h-[350px] lg:min-h-[450px] relative bg-gray-100">
            <iframe
              title="Double V Business Support Services Location Map"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[380px] lg:min-h-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
