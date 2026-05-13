"use client";

import { useRouter } from "next/navigation";

interface Props {
  title: string;
  adminName?: string;
  onMenuClick?: () => void;
}

export default function AdminTopbar({ title, adminName, onMenuClick }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h2 className="text-base font-bold text-primary-300 leading-tight">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {adminName && (
          <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-white text-xs font-bold">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700">{adminName}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-gray-500 hover:text-danger border border-gray-200 hover:border-danger/30 hover:bg-danger-light px-3 py-1.5 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
