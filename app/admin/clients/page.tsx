"use client";

import { useEffect, useState } from "react";
import { Users, Search, Mail, Phone, FileText, Calendar } from "lucide-react";

type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  _count: { documents: number };
};

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((r) => r.json())
      .then((d) => setClients(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">CLIENTS</h2>
        <p className="text-gray-400 text-sm">{clients.length} registered clients</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-brand-royal transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">{[1,2,3,4].map((i) => <div key={i} className="h-16 shimmer rounded-xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Users size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No clients found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((client) => (
              <div key={client.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-brand-royal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bebas text-brand-royal text-lg leading-none">
                      {client.name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-navy">{client.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Mail size={11} /> {client.email}
                      </span>
                      {client.phone && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Phone size={11} /> {client.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 text-right">
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FileText size={12} />
                      <span className="font-semibold text-brand-navy">{client._count.documents}</span> docs
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-300 mt-0.5">
                      <Calendar size={11} />
                      {new Date(client.createdAt).toLocaleDateString("en-PH", { dateStyle: "medium" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
