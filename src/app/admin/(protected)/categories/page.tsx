"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AdminTable from "../../_components/AdminTable";
import ConfirmModal from "../../_components/ConfirmModal";
import ImageUploader from "../../_components/ImageUploader";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  parent_name: string | null;
  image_url: string | null;
  count: number;
}

const EMPTY = { name: "", slug: "", description: "", parent_id: "", image_url: "" };

export default function CategoriesPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [truncateOpen, setTruncateOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => fetch("/api/admin/categories").then((r) => r.json()),
  });

  const saveMutation = useMutation({
    mutationFn: (body: any) => {
      if (editId) {
        return fetch(`/api/admin/categories/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then((r) => r.json());
      }
      return fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((r) => r.json());
    },
    onSuccess: (data: any) => {
      if (data.message) {
        setFormError(data.message);
        return;
      }
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/admin/categories/${id}`, { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      setDeleteId(null);
    },
  });

  const truncateMutation = useMutation({
    mutationFn: () => fetch("/api/admin/categories", { method: "DELETE" }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-categories"] });
      setTruncateOpen(false);
    },
  });

  function resetForm() {
    setForm(EMPTY);
    setImages([]);
    setEditId(null);
    setFormError("");
  }

  function startEdit(cat: Category) {
    setEditId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      parent_id: cat.parent_id ? String(cat.parent_id) : "",
      image_url: cat.image_url || "",
    });
    setImages(cat.image_url ? [cat.image_url] : []);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    saveMutation.mutate({
      ...form,
      parent_id: form.parent_id ? parseInt(form.parent_id, 10) : null,
      image_url: images[0] || null,
    });
  }

  const categories: Category[] = data?.categories ?? [];

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (row: Category) =>
        row.image_url ? (
          <img src={row.image_url} alt={row.name} className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
        ) : (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">🗂️</div>
        ),
    },
    { key: "name", header: "Name", render: (row: Category) => <span className="font-medium text-gray-800">{row.name}</span> },
    { key: "parent_name", header: "Parent", render: (row: Category) => <span className="text-gray-500 text-sm">{row.parent_name || "—"}</span> },
    { key: "slug", header: "Slug", render: (row: Category) => <span className="text-xs text-gray-400 font-mono">{row.slug}</span> },
    { key: "count", header: "Products", render: (row: Category) => <span className="text-gray-600">{row.count}</span> },
    {
      key: "actions",
      header: "Actions",
      render: (row: Category) => (
        <div className="flex gap-2">
          <button onClick={() => startEdit(row)} className="px-3 py-1 text-xs bg-[#004B93] text-white rounded hover:bg-[#003a73]">Edit</button>
          <button onClick={() => setDeleteId(row.id)} className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 border border-red-100">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-primary-300 text-sm mb-5">
            {editId ? "Edit Category" : "Add New Category"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Name *</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Slug</label>
              <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="auto-generated" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Parent Category</label>
              <select value={form.parent_id} onChange={(e) => setForm((f) => ({ ...f, parent_id: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all">
                <option value="">None (Top Level)</option>
                {categories.filter((c) => !editId || c.id !== editId).map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100/20 focus:border-primary-100 transition-all resize-none" />
            </div>
            <ImageUploader value={images} onChange={setImages} maxImages={1} label="Category Image" />
            {formError && <p className="text-xs text-danger bg-danger-light px-3 py-2 rounded-xl">{formError}</p>}
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={saveMutation.isPending} className="flex-1 py-2.5 bg-success hover:bg-success-dark text-white font-semibold rounded-xl text-sm disabled:opacity-60 transition-colors shadow-sm shadow-success/20">
                {saveMutation.isPending ? "Saving..." : editId ? "Update" : "Add Category"}
              </button>
              {editId && (
                <button type="button" onClick={resetForm} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex justify-end">
          <button onClick={() => setTruncateOpen(true)} className="px-4 py-2.5 bg-danger-light text-danger border border-danger/20 rounded-xl text-sm font-semibold hover:bg-red-100 whitespace-nowrap transition-colors">
            Truncate All
          </button>
        </div>
        <AdminTable columns={columns} data={categories} loading={isLoading} />
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Category"
        message="Are you sure? Products in this category will not be deleted, but this category will be removed."
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
      />

      <ConfirmModal
        isOpen={truncateOpen}
        title="Truncate All Categories"
        message="This will permanently delete ALL categories and remove all product-category links. This action cannot be undone."
        confirmLabel="Truncate All"
        loading={truncateMutation.isPending}
        onConfirm={() => truncateMutation.mutate()}
        onCancel={() => setTruncateOpen(false)}
      />
    </div>
  );
}
