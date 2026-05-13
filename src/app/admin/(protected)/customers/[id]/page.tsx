"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import StatusBadge from "../../../_components/StatusBadge";

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: customer, isLoading } = useQuery({
    queryKey: ["admin-customer", id],
    queryFn: () => fetch(`/api/admin/customers/${id}`).then((r) => r.json()),
  });

  if (isLoading) return <div className="text-gray-400 text-sm py-10 text-center">Loading...</div>;
  if (!customer?.id) return <div className="text-red-500 text-sm py-10 text-center">Customer not found.</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/customers" className="text-xs font-medium text-gray-400 hover:text-primary-100 transition-colors">← Back</Link>
        <span className="text-gray-200">/</span>
        <h2 className="text-base font-bold text-primary-300">
          {`${customer.first_name || ""} ${customer.last_name || ""}`.trim() || customer.username}
        </h2>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${customer.is_verified ? "bg-success-light text-success" : "bg-yellow-100 text-yellow-700"}`}>
          {customer.is_verified ? "Verified" : "Unverified"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3 text-sm">
          <h3 className="font-bold text-primary-300 text-sm mb-3">Profile</h3>
          {[
            ["Username", customer.username],
            ["Email", customer.email],
            ["Phone", customer.phone || "—"],
            ["Address", customer.address || "—"],
            ["City", customer.city || "—"],
            ["State", customer.state || "—"],
            ["Country", customer.country || "—"],
            ["Joined", new Date(customer.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 py-1 border-b border-gray-50 last:border-0">
              <span className="w-24 text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 pt-0.5">{label}</span>
              <span className="text-gray-800 font-medium break-all text-sm">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-primary-300 text-sm mb-4">Recent Orders</h3>
          {customer.recent_orders?.length === 0 && (
            <p className="text-sm text-gray-400">No orders yet.</p>
          )}
          <div className="divide-y divide-gray-50">
            {customer.recent_orders?.map((o: any) => (
              <div key={o.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Order #{o.id}</p>
                  <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={o.status} />
                  <span className="text-sm font-bold text-primary-300">₦{parseFloat(o.total).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
