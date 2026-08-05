"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { User, Mail, Phone, Save, Loader2, CheckCircle2 } from "lucide-react";

// Define a type for the form state for better type safety
type ProfileFormState = {
  name: string;
  email: string;
  phone: string;
};

// Define a type for notification settings
type NotificationSettingsState = {
  statusChange: boolean;
  ready: boolean;
  newRequirements: boolean;
};

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProfileFormState>({
    name: "",
    email: "",
    phone: "",
  });

  const [notifications, setNotifications] = useState<NotificationSettingsState>({
    statusChange: true,
    ready: true,
    newRequirements: true,
  });

  // Effect to populate form when session is loaded
  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        // phone: user.phone || "" // In a real app, you might load this from your DB
      }));
    }
  }, [session]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name as keyof NotificationSettingsState]: checked }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: form, notifications }),
      });

      if (!res.ok) {
        // Check if the response is actually JSON before attempting to parse it
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          throw new Error(data.error || "Failed to save settings.");
        } else {
          const errorText = await res.text();
          console.error("Server Response Error:", errorText);
          throw new Error(`Server error (${res.status}). Please check your terminal for compilation errors.`);
        }
      }

      // If name was changed, update the session to reflect it in the UI instantly
      if (session?.user?.name !== form.name) {
        await update({ name: form.name });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">ACCOUNT SETTINGS</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your profile and account preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-6">PROFILE INFORMATION</h3>
          <div className="space-y-5">
            {[
              { name: "name" as const, label: "Full Name", type: "text", icon: User, placeholder: "Your full name", readOnly: false },
              { name: "email" as const, label: "Email Address", type: "email", icon: Mail, placeholder: "your@email.com", readOnly: true },
              { name: "phone" as const, label: "Phone Number", type: "tel", icon: Phone, placeholder: "09XX-XXX-XXXX", readOnly: false },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  {field.label}
                </label>
                <div className="relative">
                  <field.icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleFormChange}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                    className={`w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/10 transition-all placeholder:text-gray-300 ${field.readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-4">NOTIFICATIONS</h3>
          <div className="space-y-4">
            {[
              { name: "statusChange" as const, label: "Email when document status changes", desc: "Get notified whenever your document status is updated" },
              { name: "ready" as const, label: "Email when document is ready", desc: "Receive an alert when your documents are ready for pickup" },
              { name: "newRequirements" as const, label: "Email for new requirements", desc: "Be notified when additional documents are required" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-brand-navy">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name={item.name} checked={notifications[item.name]} onChange={handleNotificationChange} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-brand-royal transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 bg-brand-royal hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-60 w-full sm:w-auto">
            {loading ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Auth info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h3 className="font-bebas text-brand-navy text-xl tracking-wide mb-4">SIGN-IN METHOD</h3>
        <div className="flex items-center gap-4 p-4 bg-brand-light rounded-xl border border-brand-silver/50">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-brand-royal/20 rounded-full flex items-center justify-center">
              <User size={18} className="text-brand-royal" />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-brand-navy">Google Account</p>
            <p className="text-xs text-gray-400">{session?.user?.email}</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold border border-green-200">
            Connected
          </span>
        </div>
      </div>
    </div>
  );
}
