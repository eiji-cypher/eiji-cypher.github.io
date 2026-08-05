"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";
import NotificationBell from "@/components/NotificationBell";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
    if (status === "authenticated") {
      const role = (session?.user as any)?.role;
      if (role !== "ADMIN" && role !== "STAFF") router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-royal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/dvbss.logo.png"
                alt="Double V Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-bebas text-white text-base tracking-wider leading-tight">ADMIN PANEL</p>
              <p className="text-brand-silver/50 text-[9px] tracking-widest uppercase">Double V BSS</p>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {session.user?.image ? (
              <img src={session.user.image} alt="" className="w-9 h-9 rounded-full ring-2 ring-brand-royal/40" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-brand-royal/30 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{session.user?.name?.[0]?.toUpperCase()}</span>
              </div>
            )}
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{session.user?.name}</p>
              <span className="text-[10px] bg-brand-royal/30 text-brand-royal border border-brand-royal/30 px-2 py-0.5 rounded-full font-semibold tracking-wide uppercase">
                {(session.user as any)?.role || "STAFF"}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-royal text-white"
                    : "text-brand-silver/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={17} />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-1 border-t border-white/10">
          <Link
            href="/dashboard/documents"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-brand-silver/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <LayoutDashboard size={17} /> Client View
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-white/10 transition-all"
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu size={20} className="text-brand-navy" />
            </button>
            <h1 className="font-bebas text-brand-navy text-xl tracking-wide">
              {navItems.find((n) => n.href === pathname || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label || "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
