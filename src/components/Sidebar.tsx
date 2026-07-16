"use client";
import SidebarGroup from "./SidebarGroup";

interface SidebarProps {
  activeWidget: string;
  onSelect: (w: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const reportes = ["MiroFish Reports", "Estrategia"];
const aplicaciones = ["Company Hub", "Cotizador", "Altruismo", "Skills Hub App", "Adquisición", "DashWeb", "Skills Catalog"];
const dataAnalytics = ["Excel Widget", "Google Maps", "Google News", "Amazon Analyzer", "Metricool"];
const research = ["Web Research", "Firecrawl", "NotebookLM"];
const devQA = ["Karpathy Rules", "Debugging", "Verification", "QA Auditor", "Loop Mode", "Quality Loop"];
const content = ["X Publisher", "YouTube Clip", "Remotion", "Cronograma"];
const strategy = ["Brainstorming", "Grill-Me", "Writing Plans", "Benchmarking", "Interface Designing"];
const meta = ["Find Skills", "Skill Builder", "Skill Creator", "Masters", "Installer", "MCP", "A2A", "Consulta", "Superpowers", "Orchestrator", "Warpgrep"];

function skillToId(name: string): string {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function NavItem({ name, active, onClick }: { name: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left text-xs px-2 py-1.5 rounded transition-colors hover:bg-white/5"
      style={{
        color: active ? "var(--accent)" : "var(--text-secondary)",
        background: active ? "rgba(59,130,246,0.1)" : "transparent",
        borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
      }}
    >
      {name}
    </button>
  );
}

export default function Sidebar({ activeWidget, onSelect, isOpen = true, onClose }: SidebarProps) {
  const handleClick = (name: string) => {
    onSelect(name);
    const id = skillToId(name);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (onClose) onClose();
  };

  const sidebarContent = (
    <aside className="w-48 h-full overflow-y-auto py-3 px-2 border-r"
      style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
      <SidebarGroup label="REPORTES" defaultOpen={true}>
        {reportes.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="APLICACIONES" defaultOpen={true}>
        {aplicaciones.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="DATA & ANALYTICS">
        {dataAnalytics.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="RESEARCH">
        {research.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="DEV & QA">
        {devQA.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="CONTENT">
        {content.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="STRATEGY">
        {strategy.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>

      <SidebarGroup label="META / SKILLS">
        {meta.map(s => <NavItem key={s} name={s} active={activeWidget === s} onClick={() => handleClick(s)} />)}
      </SidebarGroup>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        {sidebarContent}
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="relative w-64 h-full" style={{ background: "var(--bg-secondary)" }}>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
