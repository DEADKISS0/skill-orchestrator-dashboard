interface StatPillProps {
  label: string;
  value: string;
  icon?: string;
  color?: string;
  compact?: boolean;
}

export default function StatPill({
  label,
  value,
  icon,
  color = "var(--ember)",
  compact = false,
}: StatPillProps) {
  if (compact) {
    return (
      <div className="stat-tile">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-stat" style={{ color }}>{value}</span>
        <span className="font-mono-label leading-tight" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className="px-3 py-2.5 rounded-lg flex flex-col items-center text-center gap-1"
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span className="font-display text-lg" style={{ color }}>{value}</span>
      <span className="font-mono-label leading-tight" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}
