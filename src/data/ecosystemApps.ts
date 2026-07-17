export interface EcosystemApp {
  id: string;
  title: string;
  url: string;
  icon: string;
  blurb: string;
  /** Prefer deep-link chip in the quick row */
  deepLinkPrimary?: boolean;
  /**
   * iframe = require embed (timeout = error overlay).
   * auto = try iframe, fall back to card.
   * card = never iframe (only when known impossible).
   */
  embed: "iframe" | "card" | "auto";
  /** Why card-only, if any — shown in fallback UI */
  embedNote?: string;
}

/**
 * Prefer `auto`/`iframe` whenever headers allow.
 * Card only when we know iframe is useless (rare); probe script re-validates.
 */
export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: "company-hub",
    title: "Company Hub",
    url: "https://x3hlysjfyb4ta.kimi.page/",
    icon: "🏢",
    blurb: "Hub interno RR",
    deepLinkPrimary: true,
    embed: "auto",
    embedNote: "Host Kimi: si el iframe falla, abrir en pestaña",
  },
  {
    id: "cotizador",
    title: "RR Cotizador",
    url: "https://rr-kotizador.vercel.app/",
    icon: "🧮",
    blurb: "Cotizaciones comerciales",
    deepLinkPrimary: true,
    embed: "auto",
  },
  {
    id: "altruismo",
    title: "Altruismo",
    url: "https://altruismo-web.vercel.app/es",
    icon: "🤝",
    blurb: "Sitio Altruismo",
    embed: "iframe",
  },
  {
    id: "skills-hub-app",
    title: "RR Skills Hub",
    url: "https://rr-skills-hub.vercel.app/",
    icon: "📚",
    blurb: "Catálogo de skills ejecutables",
    deepLinkPrimary: true,
    embed: "auto",
  },
  {
    id: "adquisicion",
    title: "Adquisición Clientes",
    url: "https://3mpm6kcgvmpz4.kimi.page/#panel",
    icon: "📈",
    blurb: "Playbook adquisición",
    deepLinkPrimary: true,
    embed: "auto",
    embedNote: "Host Kimi: si el iframe falla, abrir en pestaña",
  },
  {
    id: "adq-talentos",
    title: "Adquisición Talento",
    url: "https://rr-adq-talentos.vercel.app/",
    icon: "👥",
    blurb: "Pipeline de talento",
    deepLinkPrimary: true,
    embed: "auto",
  },
  {
    id: "dashweb",
    title: "DashWeb Core",
    url: "https://dashweb-core-frontend-beta.up.railway.app/login",
    icon: "🔧",
    blurb: "Core operativo",
    deepLinkPrimary: true,
    embed: "auto",
    embedNote: "Auth cross-origin: el login puede verse; sesión completa suele requerir pestaña",
  },
  {
    id: "saas-vertical",
    title: "SaaS Vertical Hub",
    url: "https://rr-saas-vertical.vercel.app/",
    icon: "🥐",
    blurb: "Hub vertical SaaS",
    embed: "auto",
  },
];

export const SKILLS_HUB_URL = "https://rr-skills-hub.vercel.app/";

/** Dashboard origins allowed by Altruismo frame-ancestors (keep in sync with probe). */
export const DASHBOARD_EMBED_ORIGINS = [
  "https://rr-aliados-mega-dashboard.vercel.app",
  "https://skill-orchestrator-dashboard.vercel.app",
];
