"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BusinessMetricsWidget from "@/components/BusinessMetricsWidget";
import CalendarWidget from "@/components/CalendarWidget";
import TaskMonitorWidget from "@/components/TaskMonitorWidget";
import CommandCenterWidget from "@/components/CommandCenterWidget";
import ChatbotWidget from "@/components/ChatbotWidget";
import GoogleAnalyticsWidget from "@/components/GoogleAnalyticsWidget";
import GoogleCalendarWidget from "@/components/GoogleCalendarWidget";
import ExportWidget from "@/components/ExportWidget";
import CollapsibleSection from "@/components/CollapsibleSection";
import InterfaceDesigningWidget from "@/components/InterfaceDesigningWidget";
import BenchmarkingWidget from "@/components/BenchmarkingWidget";
import ExcelWidget from "@/components/ExcelWidget";
import GoogleNewsWidget from "@/components/GoogleNewsWidget";
import GoogleMapsWidget from "@/components/GoogleMapsWidget";
import MetricoolWidget from "@/components/MetricoolWidget";
import WebResearchWidget from "@/components/WebResearchWidget";
import FirecrawlWidget from "@/components/FirecrawlWidget";
import AmazonWidget from "@/components/AmazonWidget";
import NotebookLMWidget from "@/components/NotebookLMWidget";
import BrainstormingWidget from "@/components/BrainstormingWidget";
import GrillMeWidget from "@/components/GrillMeWidget";
import CronogramaWidget from "@/components/CronogramaWidget";
import KarpathyWidget from "@/components/KarpathyWidget";
import DebuggingWidget from "@/components/DebuggingWidget";
import VerificationWidget from "@/components/VerificationWidget";
import QAAuditorWidget from "@/components/QAAuditorWidget";
import LoopModeWidget from "@/components/LoopModeWidget";
import QualityLoopWidget from "@/components/QualityLoopWidget";
import MCPWidget from "@/components/MCPWidget";
import MultiAgentWidget from "@/components/MultiAgentWidget";
import RemotionWidget from "@/components/RemotionWidget";
import SkillBuilderWidget from "@/components/SkillBuilderWidget";
import SkillCreatorWidget from "@/components/SkillCreatorWidget";
import SkillFromMastersWidget from "@/components/SkillFromMastersWidget";
import SkillInstallerWidget from "@/components/SkillInstallerWidget";
import SkillOrchestratorWidget from "@/components/SkillOrchestratorWidget";
import SuperpowersWidget from "@/components/SuperpowersWidget";
import WarpgrepsWidget from "@/components/WarpgrepWidget";
import WritingPlansWidget from "@/components/WritingPlansWidget";
import XPublisherWidget from "@/components/XPublisherWidget";
import YouTubeClipperWidget from "@/components/YouTubeClipperWidget";
import FindSkillsWidget from "@/components/FindSkillsWidget";
import ConsultaContextoWidget from "@/components/ConsultaContextoWidget";
import SkillsCatalogWidget from "@/components/SkillsCatalogWidget";
import MiroFishReportsWidget from "@/components/MiroFishReportsWidget";
import ReportesEstrategicosWidget from "@/components/ReportesEstrategicosWidget";
import SalesPipelineWidget from "@/components/SalesPipelineWidget";
import FinancialHealthWidget from "@/components/FinancialHealthWidget";
import ClientStatusWidget from "@/components/ClientStatusWidget";
import CompetitorWidget from "@/components/CompetitorWidget";
import ExternalAppWidget from "@/components/ExternalAppWidget";

export default function Home() {
  const [activeWidget, setActiveWidget] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sectionId = (name: string) =>
    name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  return (
    <div className="flex flex-col h-screen" style={{background:"var(--bg-primary)"}}>
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeWidget={activeWidget} onSelect={setActiveWidget} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

            {/* ═══════════════════════════════════════════════════════════
                SECCIÓN 1: HERO + REPORTES + APLICACIONES (PRINCIPAL)
               ═══════════════════════════════════════════════════════════ */}

            {/* Hero Section */}
            <section className="md:col-span-2 lg:col-span-3 xl:col-span-4">
              <HeroSection />
            </section>

            {/* Business Metrics */}
            <BusinessMetricsWidget />

            {/* Sales Pipeline + Financial Health (2 cols each) */}
            <SalesPipelineWidget />
            <FinancialHealthWidget />

            {/* Calendar + Task Monitor + Command Center + Export (4 cols) */}
            <CalendarWidget />
            <TaskMonitorWidget />
            <CommandCenterWidget />
            <ExportWidget />

            {/* Google Analytics + Google Calendar (2 cols each) */}
            <GoogleAnalyticsWidget />
            <GoogleCalendarWidget />

            {/* Reports */}
            <section id={sectionId("MiroFish Reports")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <MiroFishReportsWidget />
            </section>
            <section id={sectionId("Estrategia")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ReportesEstrategicosWidget />
            </section>

            {/* Aplicaciones Corporativas */}
            <section id={sectionId("Company Hub")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ExternalAppWidget title="Company Hub" url="https://x3hlysjfyb4ta.kimi.page/" icon="🏢" />
            </section>
            <section id={sectionId("Cotizador")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ExternalAppWidget title="RR Cotizador" url="https://rr-kotizador.vercel.app/" icon="🧮" />
            </section>
            <section id={sectionId("Altruismo")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ExternalAppWidget title="Altruismo" url="https://altruismo-web.vercel.app/es" icon="🤝" />
            </section>
            <section id={sectionId("Skills Hub App")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ExternalAppWidget title="RR Skills Hub" url="https://yvapiyrswankg.kimi.page/" icon="📚" />
            </section>
            <section id={sectionId("Adquisición")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ExternalAppWidget title="Dashboard de Adquisición" url="https://3mpm6kcgvmpz4.kimi.page/#panel" icon="📈" />
            </section>
            <section id={sectionId("DashWeb")} className="md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ExternalAppWidget title="DashWeb Core" url="https://dashweb-core-frontend-beta.up.railway.app/login" icon="🔧" />
            </section>

            {/* Client Status + Competitor (2 cols each) */}
            <ClientStatusWidget />
            <CompetitorWidget />

            {/* Catálogo de Skills */}
            <section id={sectionId("Skills Catalog")} className="md:col-span-2 lg:col-span-3 xl:col-span-4">
              <SkillsCatalogWidget />
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECCIÓN 2: HERRAMIENTAS (COMPACTADAS)
               ═══════════════════════════════════════════════════════════ */}

            <CollapsibleSection title="DATA & ANALYTICS" icon="📊" defaultOpen={false}>
              <ExcelWidget />
              <GoogleNewsWidget />
              <GoogleMapsWidget />
              <AmazonWidget />
              <MetricoolWidget />
            </CollapsibleSection>

            <CollapsibleSection title="RESEARCH" icon="🔍" defaultOpen={false}>
              <WebResearchWidget />
              <FirecrawlWidget />
              <NotebookLMWidget />
            </CollapsibleSection>

            <CollapsibleSection title="DEV & QA" icon="⚙️" defaultOpen={false}>
              <KarpathyWidget />
              <DebuggingWidget />
              <VerificationWidget />
              <QAAuditorWidget />
              <LoopModeWidget />
              <QualityLoopWidget />
            </CollapsibleSection>

            <CollapsibleSection title="CONTENT" icon="✍️" defaultOpen={false}>
              <XPublisherWidget />
              <YouTubeClipperWidget />
              <RemotionWidget />
              <CronogramaWidget />
            </CollapsibleSection>

            <CollapsibleSection title="STRATEGY" icon="🎯" defaultOpen={false}>
              <BrainstormingWidget />
              <GrillMeWidget />
              <WritingPlansWidget />
              <BenchmarkingWidget />
              <InterfaceDesigningWidget />
            </CollapsibleSection>

            <CollapsibleSection title="META / SKILLS" icon="🧠" defaultOpen={false}>
              <FindSkillsWidget />
              <SkillBuilderWidget />
              <SkillCreatorWidget />
              <SkillFromMastersWidget />
              <SkillInstallerWidget />
              <MCPWidget />
              <MultiAgentWidget />
              <ConsultaContextoWidget />
              <SuperpowersWidget />
              <SkillOrchestratorWidget />
              <WarpgrepsWidget />
            </CollapsibleSection>

          </div>
        </main>
      </div>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
