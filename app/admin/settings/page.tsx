"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Save, Loader2, CheckCircle2, Shield, Bell, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "Double V Business Support Services",
    email: "doublevdipolog@gmail.com",
    phone: "0970-686-7170",
    phone2: "0951-492-140",
    address: "Dipolog City, Zamboanga del Norte",
    emailNotifications: true,
    autoReadyAlert: true,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">ADMIN SETTINGS</h2>
        <p className="text-gray-400 text-sm mt-1">Configure system-wide settings</p>
      </div>

      {/* Company Info */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <Globe size={18} className="text-brand-royal" />
            <h3 className="font-bebas text-brand-navy text-xl tracking-wide">COMPANY INFORMATION</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: "companyName", label: "Company Name" },
              { key: "email", label: "Primary Email" },
              { key: "phone", label: "Primary Phone" },
              { key: "phone2", label: "Secondary Phone" },
              { key: "address", label: "Office Address" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{f.label}</label>
                <input
                  value={(settings as any)[f.key]}
                  onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <Bell size={18} className="text-brand-royal" />
            <h3 className="font-bebas text-brand-navy text-xl tracking-wide">NOTIFICATIONS</h3>
          </div>
          <div className="space-y-5">
            {[
              { key: "emailNotifications", label: "Email clients on status change", desc: "Send automatic email when a document status is updated" },
              { key: "autoReadyAlert", label: "Alert client when ready for pickup", desc: "Send email + SMS when document is marked ready" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-brand-navy">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(settings as any)[item.key]}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-brand-royal transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Role info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-brand-royal" />
            <h3 className="font-bebas text-brand-navy text-xl tracking-wide">YOUR ACCESS LEVEL</h3>
          </div>
          <div className="flex items-center gap-3 p-4 bg-brand-light rounded-xl border border-brand-silver/50">
            <div className="w-10 h-10 bg-brand-royal/20 rounded-full flex items-center justify-center">
              <Shield size={18} className="text-brand-royal" />
            </div>
            <div>
              <p className="font-semibold text-brand-navy text-sm">{session?.user?.name}</p>
              <p className="text-xs text-gray-400">{session?.user?.email}</p>
            </div>
            <span className="ml-auto text-xs bg-brand-royal/10 text-brand-royal border border-brand-royal/20 px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
              {(session?.user as any)?.role || "STAFF"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-brand-royal hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
