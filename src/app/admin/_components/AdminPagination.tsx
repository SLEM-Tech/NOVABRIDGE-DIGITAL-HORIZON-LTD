interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AdminPagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-5 text-sm">
      <span className="text-xs font-medium text-gray-400">
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-medium transition-all"
        >
          ← Prev
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                p === page
                  ? "bg-primary-100 text-white border-primary-100 shadow-sm shadow-primary-100/30"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-medium transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
