"use client";

const tasks = [
  { task: "Setup project", status: "done", time: "5 min" },
  { task: "Create design system", status: "done", time: "15 min" },
  { task: "Build layout components", status: "done", time: "20 min" },
  { task: "Implement 35 widgets", status: "active", time: "—" },
  { task: "Wire interactivity", status: "pending", time: "—" },
  { task: "Test & verify", status: "pending", time: "—" },
];

export default function WritingPlansWidget() {
  const done = tasks.filter(t => t.status === "done").length;
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📝</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Writing Plans</h3>
        <span className="skill-badge active">writing-plans</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-2 rounded-full" style={{background:"var(--bg-secondary)"}}>
          <div className="h-2 rounded-full" style={{width:`${(done/tasks.length)*100}%`, background:"var(--accent)"}} />
        </div>
        <span className="text-xs" style={{color:"var(--text-muted)"}}>{done}/{tasks.length}</span>
      </div>
      <div className="space-y-1">
        {tasks.map((t,i) => (
          <div key={i} className="flex items-center justify-between p-1.5 rounded text-xs" style={{background:"var(--bg-secondary)"}}>
            <div className="flex items-center gap-2">
              <span style={{color: t.status==="done"?"var(--success)":t.status==="active"?"var(--accent)":"var(--text-muted)"}}>
                {t.status==="done"?"✓":t.status==="active"?"●":"○"}
              </span>
              <span style={{color: t.status==="pending"?"var(--text-muted)":"var(--text-primary)"}}>{t.task}</span>
            </div>
            <span style={{color:"var(--text-muted)"}}>{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
