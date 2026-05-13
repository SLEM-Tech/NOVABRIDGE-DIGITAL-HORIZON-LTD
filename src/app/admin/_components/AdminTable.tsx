interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  keyField?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export default function AdminTable<T extends Record<string, any>>({
  columns,
  data,
  keyField = "id",
  loading,
  emptyMessage = "No records found",
}: Props<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary-100/30 border-t-primary-100 rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm shadow-slate-200/40">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 py-3.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px] ${col.width ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-400 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row[keyField] ?? i} className="hover:bg-gray-50/60 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-gray-700">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
