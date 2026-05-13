"use client";

import { useQuery } from "@tanstack/react-query";
import AdminCard from "../../_components/AdminCard";
import StatusBadge from "../../_components/StatusBadge";
import type { Metadata } from "next";

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => fetch("/api/admin/dashboard").then((r) => r.json()),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 h-64 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          <div className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-red-500 text-sm">Failed to load dashboard data.</div>;
  }

  const statusOrder = [
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
    { key: "on-hold", label: "On Hold" },
  ];

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard icon="🛒" label="Total Orders" value={data.totalOrders.toLocaleString()} color="blue" />
        <AdminCard icon="₦" label="Total Revenue" value={formatCurrency(data.totalRevenue)} color="green" />
        <AdminCard icon="📦" label="Products" value={data.totalProducts.toLocaleString()} color="purple" />
        <AdminCard icon="👥" label="Customers" value={data.totalCustomers.toLocaleString()} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm shadow-slate-200/40">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-primary-300 text-sm">Recent Orders</h3>
            <span className="text-xs text-gray-400 font-medium">{data.recentOrders?.length ?? 0} orders</span>
          </div>
          <div className="divide-y divide-gray-50">
            {data.recentOrders?.length === 0 && (
              <p className="px-6 py-10 text-sm text-gray-400 text-center">No orders yet</p>
            )}
            {data.recentOrders?.map((order: any) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">Order #{order.id}</p>
                  <p className="text-xs text-gray-400 truncate">{order.customer}</p>
                </div>
                <StatusBadge status={order.status} />
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary-300">{formatCurrency(parseFloat(order.total))}</p>
                  <p className="text-xs text-gray-400">{formatDate(order.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-slate-200/40">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-primary-300 text-sm">Orders by Status</h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            {statusOrder.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <StatusBadge status={key} />
                <span className="text-sm font-bold text-gray-700">
                  {(data.ordersByStatus?.[key] ?? 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
