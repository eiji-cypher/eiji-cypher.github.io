"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Users,
  FileText,
  X,
  RefreshCw,
} from "lucide-react";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  href: string;
};

const typeConfig: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  ready:        { icon: CheckCircle2,  color: "text-green-600",  bg: "bg-green-50"  },
  requirements: { icon: AlertCircle,   color: "text-orange-600", bg: "bg-orange-50" },
  processing:   { icon: Clock,         color: "text-blue-600",   bg: "bg-blue-50"   },
  pending:      { icon: FileText,      color: "text-brand-royal",bg: "bg-brand-light"},
  message:      { icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50" },
  client:       { icon: Users,         color: "text-teal-600",   bg: "bg-teal-50"   },
};

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and every 60 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const visible = notifications.filter((n) => !dismissed.has(n.id));
  const unread = visible.length;

  const dismiss = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const dismissAll = () => {
    setDismissed(new Set(notifications.map((n) => n.id)));
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell button */}
      <button
        onClick={() => { setOpen(!open); if (!open) fetchNotifications(); }}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={18} className="text-gray-600" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl shadow-gray-200/80 border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <h3 className="font-bebas text-brand-navy text-lg tracking-wide">NOTIFICATIONS</h3>
              {unread > 0 && (
                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                  {unread} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchNotifications}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw size={13} className={`text-gray-400 ${loading ? "animate-spin" : ""}`} />
              </button>
              {unread > 0 && (
                <button
                  onClick={dismissAll}
                  className="text-xs text-brand-royal hover:underline font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="space-y-3 p-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-9 h-9 shimmer rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 shimmer rounded w-3/4" />
                      <div className="h-3 shimmer rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell size={20} className="text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm font-medium">You{"'"}re all caught up!</p>
                <p className="text-gray-300 text-xs mt-1">No new notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {visible.map((notif) => {
                  const cfg = typeConfig[notif.type] || typeConfig.processing;
                  const Icon = cfg.icon;
                  return (
                    <Link
                      key={notif.id}
                      href={notif.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50/70 transition-colors group relative"
                    >
                      {/* Icon */}
                      <div className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon size={16} className={cfg.color} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="text-xs font-semibold text-brand-navy leading-tight">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-gray-300 mt-1.5 font-medium">{timeAgo(notif.time)}</p>
                      </div>

                      {/* Dismiss button */}
                      <button
                        onClick={(e) => dismiss(e, notif.id)}
                        className="absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
                        title="Dismiss"
                      >
                        <X size={11} className="text-gray-400" />
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {visible.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
              <p className="text-xs text-gray-400 text-center">
                Notifications refresh every minute
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
