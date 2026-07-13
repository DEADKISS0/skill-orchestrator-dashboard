"use client";

const findings = [
  { severity: "critical", issue: "Missing alt tags on 3 images", file: "hero.tsx:15" },
  { severity: "warning", issue: "Color contrast below 4.5:1", file: "globals.css:42" },
  { severity: "info", issue: "Consider lazy loading below fold", file: "page.tsx:28" },
  { severity: "pass", issue: "All links valid (0 dead links)", file: "—" },
];

export default function QAAuditorWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔍</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Site QA Auditor</h3>
        <span className="skill-badge active">site-qa-auditor</span>
      </div>
      <div className="space-y-2">
        {findings.map((f,i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded text-xs" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span style={{color: f.severity==="critical"?"var(--danger)":f.severity==="warning"?"var(--warning)":f.severity==="info"?"var(--accent)":"var(--success)"}}>
                {f.severity==="critical"?"🔴":f.severity==="warning"?"🟡":f.severity==="info"?"🔵":"🟢"}
              </span>
              <span style={{color:"var(--text-secondary)"}}>{f.issue}</span>
            </div>
            <span className="font-mono text-[10px]" style={{color:"var(--text-muted)"}}>{f.file}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
