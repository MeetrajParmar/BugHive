export function InfoField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-2">
      <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium uppercase">
        {icon}
        {label}
      </div>
      <p className="text-sm text-white font-medium">
        {value?.trim() ? (
          value
        ) : (
          <span className="text-zinc-500 italic">Not set</span>
        )}
      </p>
    </div>
  );
}
