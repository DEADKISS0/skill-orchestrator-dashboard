"use client";

const metrics = [
  { platform: "Instagram", followers: "12.4K", posts: 89, engagement: "4.2%", reach: "45K" },
  { platform: "LinkedIn", followers: "8.7K", posts: 34, engagement: "6.1%", reach: "23K" },
  { platform: "TikTok", followers: "25.1K", posts: 156, engagement: "8.9%", reach: "120K" },
  { platform: "X (Twitter)", followers: "5.2K", posts: 201, engagement: "3.4%", reach: "18K" },
];

export default function MetricoolWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📱</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Metricool Analytics</h3>
        <span className="skill-badge active">metricool-browser-operator</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m,i) => (
          <div key={i} className="p-3 rounded-lg" style={{ background: "var(--bg-secondary)" }}>
            <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{m.platform}</div>
            <div className="grid grid-cols-2 gap-1">
              <div><span className="text-[10px]" style={{color:"var(--text-muted)"}}>Followers</span><br/><span className="text-sm font-bold" style={{color:"var(--accent)"}}>{m.followers}</span></div>
              <div><span className="text-[10px]" style={{color:"var(--text-muted)"}}>Posts</span><br/><span className="text-sm font-bold" style={{color:"var(--text-primary)"}}>{m.posts}</span></div>
              <div><span className="text-[10px]" style={{color:"var(--text-muted)"}}>Engagement</span><br/><span className="text-sm font-bold" style={{color:"var(--success)"}}>{m.engagement}</span></div>
              <div><span className="text-[10px]" style={{color:"var(--text-muted)"}}>Reach</span><br/><span className="text-sm font-bold" style={{color:"var(--text-secondary)"}}>{m.reach}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
