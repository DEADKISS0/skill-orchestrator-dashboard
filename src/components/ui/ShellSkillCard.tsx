"use client";

import { SKILLS_HUB_URL } from "@/data/ecosystemApps";

interface ShellSkillCardProps {
  title: string;
  icon?: string;
  skillSlug?: string;
  children?: React.ReactNode;
  /** If true, collapse demo body and emphasize Skills Hub deep-link */
  quarantine?: boolean;
}

/**
 * Quarantine wrapper for skill “teatro” widgets — badge Shell + deep-link Hub.
 */
export default function ShellSkillCard({
  title,
  icon = "🧩",
  skillSlug,
  children,
  quarantine = true,
}: ShellSkillCardProps) {
  const hubUrl = skillSlug
    ? `${SKILLS_HUB_URL}?skill=${encodeURIComponent(skillSlug)}`
    : SKILLS_HUB_URL;

  return (
    <div className="card p-4 animate-in relative">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
        <span className="skill-badge context">Shell</span>
        <a
          href={hubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost !py-0.5 !px-2 text-[10px] ml-auto"
          title="Abrir en Skills Hub"
        >
          Skills Hub ↗
        </a>
      </div>
      {quarantine && (
        <div className="banner-mock mb-2 text-[10px]">
          Widget shell — la skill real vive en Skills Hub. Menos teatro, más deep-link.
        </div>
      )}
      <div className={quarantine ? "opacity-70 max-h-40 overflow-hidden relative" : undefined}>
        {children}
        {quarantine && (
          <div
            className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
            style={{
              background: "linear-gradient(transparent, var(--bg-card, #0F0F0F))",
            }}
          />
        )}
      </div>
    </div>
  );
}
