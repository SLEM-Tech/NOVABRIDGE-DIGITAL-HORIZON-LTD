"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AdminTable from "../../_components/AdminTable";
import ConfirmModal from "../../_components/ConfirmModal";

const EMPTY = { username: "", email: "", password: "", first_name: "", last_name: "" };

export default function AdminsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-admins"],
    queryFn: () => fetch("/api/admin/admins").then((r) => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: (body: typeof EMPTY) =>
      fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json()),
    onSuccess: (data: any) => {
      if (data.message && !data.id) {
        setFormError(data.message);
        return;
      }
      qc.invalidateQueries({ queryKey: ["admin-admins"] });
      setForm(EMPTY);
      setFormError("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/admin/admins/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-admins"] });
      setDeleteId(null);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    createMutation.mutate(form);
  }

  const columns = [
    { key: "username", header: "Username", render: (row: any) => <span className="font-medium text-gray-800">{row.username}</span> },
    { key: "email", header: "Email", render: (row: any) => <span className="text-gray-600">{row.email}</span> },
    {
      key: "name",
      header: "Name",
      render: (row: any) => (
        <span className="text-gray-600">
          {`${row.first_name || ""} ${row.last_name || ""}`.trim() || "—"}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      render: (row: any) => (
        <span className="text-xs text-gray-400">
          {new Date(row.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row: any) => (
        <button
          onClick={() => setDeleteId(row.id)}
          className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-100"
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Create form */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-primary-300 text-sm mb-5">Add New Admin</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "username", label: "Username *", type: "text", required: true },
              { key: "email", label: "Email *", type: "email", required: true },
              { key: "password", label: "Password *", type: "password", required: true },
              { key: "first_name", label: "First Name", type: "text", required: false },
              { key: "last_name", label: "Last Name", type: "text", required: false },
            ].map(({ key, label, type, required }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
                <input type={type} value={(form as any)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} required={required} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all" />
              </div>
            ))}
            {formError && <p className="text-xs text-danger bg-danger-light px-3 py-2 rounded-xl">{formError}</p>}
            {success && <p className="text-xs text-success bg-success-light px-3 py-2 rounded-xl font-medium">Admin created successfully!</p>}
            <button type="submit" disabled={createMutation.isPending} className="w-full py-2.5 bg-success hover:bg-success-dark text-white font-semibold rounded-xl text-sm disabled:opacity-60 transition-colors shadow-sm shadow-success/20">
              {createMutation.isPending ? "Creating..." : "Create Admin"}
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="lg:col-span-2">
        <AdminTable columns={columns} data={data?.admins ?? []} loading={isLoading} />
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Remove Admin"
        message="Are you sure you want to remove this admin? This action cannot be undone."
        confirmLabel="Remove"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
