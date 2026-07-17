interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  number?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, number, className = "" }: SectionHeaderProps) {
  return (
    <div className={`col-12 section-zone ${className}`}>
      <div className="flex items-center gap-4 mb-2">
        {number && <span className="section-number">{number}</span>}
        <h2 className="section-title">{title}</h2>
        <div className="glow-line" />
      </div>
      {subtitle && (
        <p className="font-mono-label pl-0.5" style={{ color: "var(--text-muted)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
