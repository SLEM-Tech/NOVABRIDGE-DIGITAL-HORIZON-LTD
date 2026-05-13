"use client";

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  loading,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 w-full max-w-sm mx-4 p-6 border border-gray-100">
        <h3 className="text-base font-bold text-primary-300 mb-1.5">{title}</h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold bg-danger text-white rounded-xl hover:bg-danger-dark disabled:opacity-50 transition-colors shadow-sm shadow-danger/20"
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
