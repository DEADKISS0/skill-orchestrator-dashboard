export interface EcosystemApp {
  id: string;
  title: string;
  url: string;
  icon: string;
  /** Prefer deep-link over iframe when embed is flaky */
  deepLinkPrimary?: boolean;
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  { id: "company-hub", title: "Company Hub", url: "https://x3hlysjfyb4ta.kimi.page/", icon: "🏢" },
  {
    id: "cotizador",
    title: "RR Cotizador",
    url: "https://rr-kotizador.vercel.app/",
    icon: "🧮",
    deepLinkPrimary: true,
  },
  { id: "altruismo", title: "Altruismo", url: "https://altruismo-web.vercel.app/es", icon: "🤝" },
  {
    id: "skills-hub-app",
    title: "RR Skills Hub",
    url: "https://rr-skills-hub.vercel.app/",
    icon: "📚",
    deepLinkPrimary: true,
  },
  {
    id: "adquisicion",
    title: "Adquisición Clientes",
    url: "https://3mpm6kcgvmpz4.kimi.page/#panel",
    icon: "📈",
  },
  {
    id: "adq-talentos",
    title: "Adquisición Talento",
    url: "https://rr-adq-talentos.vercel.app/",
    icon: "👥",
    deepLinkPrimary: true,
  },
  {
    id: "dashweb",
    title: "DashWeb Core",
    url: "https://dashweb-core-frontend-beta.up.railway.app/login",
    icon: "🔧",
  },
  {
    id: "saas-vertical",
    title: "SaaS Vertical Hub",
    url: "https://rr-saas-vertical.vercel.app/",
    icon: "🥐",
  },
];

export const SKILLS_HUB_URL = "https://rr-skills-hub.vercel.app/";
