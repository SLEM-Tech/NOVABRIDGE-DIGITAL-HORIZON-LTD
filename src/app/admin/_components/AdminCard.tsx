interface Props {
  label: string;
  value: string | number;
  icon: string;
  sub?: string;
  color?: "blue" | "green" | "orange" | "purple";
}

const colorMap = {
  blue: "bg-brand-light text-primary-100",
  green: "bg-success-light text-success",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
};

export default function AdminCard({ label, value, icon, sub, color = "blue" }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-slate-200/50 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-primary-300 mt-0.5 truncate">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
