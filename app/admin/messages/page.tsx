"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Mail, Phone, RefreshCw, CheckCheck, Clock } from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((d) => setMessages(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read: true }) });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bebas text-brand-navy text-3xl tracking-wide">MESSAGES</h2>
          <p className="text-gray-400 text-sm">{unread > 0 ? `${unread} unread` : "All caught up"}</p>
        </div>
        <button onClick={fetchMessages} className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-royal transition-colors">
          <RefreshCw size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">{[1,2,3].map((i) => <div key={i} className="h-20 shimmer rounded-xl" />)}</div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className={`px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === msg.id ? "bg-brand-light border-l-2 border-brand-royal" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!msg.read && <span className="w-2 h-2 bg-brand-royal rounded-full flex-shrink-0" />}
                        <p className={`text-sm truncate ${!msg.read ? "font-semibold text-brand-navy" : "font-medium text-gray-700"}`}>{msg.name}</p>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{msg.subject}</p>
                      <p className="text-xs text-gray-300 mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {new Date(msg.createdAt).toLocaleDateString("en-PH", { dateStyle: "medium" })}
                      </p>
                    </div>
                    {msg.read && <CheckCheck size={14} className="text-gray-300 flex-shrink-0 mt-1" />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          {!selected ? (
            <div className="h-full flex items-center justify-center p-16 text-center">
              <div>
                <MessageSquare size={40} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Select a message to read</p>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="border-b border-gray-100 pb-6 mb-6">
                <h3 className="font-semibold text-brand-navy text-lg mb-4">{selected.subject}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-brand-royal/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-brand-royal text-xs">{selected.name[0].toUpperCase()}</span>
                    </div>
                    <span>{selected.name}</span>
                  </div>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-brand-royal hover:underline">
                    <Mail size={14} /> {selected.email}
                  </a>
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-royal">
                      <Phone size={14} /> {selected.phone}
                    </a>
                  )}
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={14} />
                    {new Date(selected.createdAt).toLocaleString("en-PH")}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <div className="mt-6 pt-6 border-t border-gray-50">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <Mail size={15} /> Reply via Email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
