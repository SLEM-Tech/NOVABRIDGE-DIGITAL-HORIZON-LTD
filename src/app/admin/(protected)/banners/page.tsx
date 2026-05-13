"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmModal from "../../_components/ConfirmModal";
import ImageUploader from "../../_components/ImageUploader";

interface Banner {
  id: number;
  name: string;
  image_url: string;
  url: string;
  show: boolean;
}

const EMPTY = { name: "", url: "", show: true };

export default function BannersPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: () => fetch("/api/admin/banners").then((r) => r.json()),
  });

  const saveMutation = useMutation({
    mutationFn: (body: any) => {
      if (editId) {
        return fetch(`/api/admin/banners/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((r) => r.json());
      }
      return fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json());
    },
    onSuccess: (d: any) => {
      if (d.message && !d.id) { setFormError(d.message); return; }
      qc.invalidateQueries({ queryKey: ["admin-banners"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/admin/banners/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-banners"] }); setDeleteId(null); },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, show }: { id: number; show: boolean }) =>
      fetch(`/api/admin/banners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show }),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-banners"] }),
  });

  function resetForm() {
    setForm(EMPTY);
    setImages([]);
    setEditId(null);
    setFormError("");
  }

  function startEdit(b: Banner) {
    setEditId(b.id);
    setForm({ name: b.name, url: b.url || "", show: b.show });
    setImages(b.image_url ? [b.image_url] : []);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!images[0] && !editId) { setFormError("Image is required"); return; }
    saveMutation.mutate({ ...form, image_url: images[0] || undefined });
  }

  const banners: Banner[] = data?.banners ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-primary-300 text-sm mb-5">{editId ? "Edit Banner" : "Add Banner"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Name *</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Link URL</label>
              <input value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} placeholder="https://..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all" />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.show} onChange={(e) => setForm((f) => ({ ...f, show: e.target.checked }))} className="rounded border-gray-300 accent-primary-100" />
              <span className="text-sm text-gray-600 font-medium">Show on homepage</span>
            </label>
            <ImageUploader value={images} onChange={setImages} maxImages={1} label="Banner Image" />
            {formError && <p className="text-xs text-danger bg-danger-light px-3 py-2 rounded-xl">{formError}</p>}
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={saveMutation.isPending} className="flex-1 py-2.5 bg-success hover:bg-success-dark text-white font-semibold rounded-xl text-sm disabled:opacity-60 transition-colors shadow-sm shadow-success/20">
                {saveMutation.isPending ? "Saving..." : editId ? "Update" : "Add Banner"}
              </button>
              {editId && (
                <button type="button" onClick={resetForm} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Banner cards */}
      <div className="lg:col-span-2">
        {!isLoading && banners.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
            No banners yet. Add your first banner.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {banners.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[16/6]">
                <img src={b.image_url} alt={b.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold ${b.show ? "bg-success-light text-success" : "bg-gray-100 text-gray-500"}`}>
                  {b.show ? "Visible" : "Hidden"}
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-gray-800 text-sm">{b.name}</p>
                {b.url && <p className="text-xs text-gray-400 truncate mt-0.5">{b.url}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleMutation.mutate({ id: b.id, show: !b.show })} className="flex-1 py-2 text-xs font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">{b.show ? "Hide" : "Show"}</button>
                  <button onClick={() => startEdit(b)} className="flex-1 py-2 text-xs font-semibold bg-primary-100 text-white rounded-xl hover:bg-primary-200 transition-colors">Edit</button>
                  <button onClick={() => setDeleteId(b.id)} className="flex-1 py-2 text-xs font-semibold bg-danger-light text-danger rounded-xl hover:bg-red-100 border border-danger/20 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Banner"
        message="Are you sure you want to delete this banner?"
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
