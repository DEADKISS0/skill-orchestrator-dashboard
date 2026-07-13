"use client";

export default function RemotionWidget() {
  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎬</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Remotion Video</h3>
        <span className="skill-badge active">remotion</span>
      </div>
      <div className="rounded-lg overflow-hidden" style={{background:"var(--bg-secondary)"}}>
        <div className="aspect-video flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-xs font-semibold" style={{color:"var(--text-primary)"}}>RR ALIADOS Report Q4</div>
              <div className="text-[11px]" style={{color:"var(--text-muted)"}}>Video generado con React</div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full" style={{background:"var(--bg-card)"}}>
              <div className="h-1 rounded-full w-1/3" style={{background:"var(--accent)"}} />
            </div>
            <span className="text-[10px]" style={{color:"var(--text-muted)"}}>1:23 / 3:45</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="btn-primary text-xs flex-1">Preview</button>
        <button className="text-xs px-3 py-1.5 rounded" style={{background:"var(--bg-secondary)",color:"var(--text-secondary)"}}>Export MP4</button>
      </div>
    </div>
  );
}
