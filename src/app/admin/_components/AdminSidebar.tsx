"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/categories", label: "Categories", icon: "🗂️" },
  { href: "/admin/orders", label: "Orders", icon: "🛒" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
{ href: "/admin/banners", label: "Banners", icon: "🖼️" },
  { href: "/admin/admins", label: "Admins", icon: "🔐" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-full bg-[#002D5B] text-white w-64 shadow-2xl">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-tight text-white">Apexlogic Admin</h1>
        <p className="text-xs text-white/40 mt-0.5 font-medium uppercase tracking-widest">Management Panel</p>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto space-y-0.5 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/60 hover:bg-white/8 hover:text-white/90"
              }`}
            >
              <span className="text-base leading-none w-5 text-center shrink-0">{item.icon}</span>
              {item.label}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3DBD7F]" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Apexlogic Intercontinental Technologies Limited</p>
      </div>
    </aside>
  );
}
