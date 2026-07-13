"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
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
import SkillsHubPopup from "@/components/SkillsHubPopup";
import MiroFishReportsWidget from "@/components/MiroFishReportsWidget";
import OptimizacionWidget from "@/components/OptimizacionWidget";

export default function Home() {
  const [activeWidget, setActiveWidget] = useState("All");

  return (
    <div className="flex flex-col h-screen" style={{background:"var(--bg-primary)"}}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeWidget={activeWidget} onSelect={setActiveWidget} />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkillsCatalogWidget />
            <SkillsHubPopup />
            <InterfaceDesigningWidget />
            <BenchmarkingWidget />
            <ExcelWidget />
            <GoogleNewsWidget />
            <GoogleMapsWidget />
            <MetricoolWidget />
            <WebResearchWidget />
            <FirecrawlWidget />
            <AmazonWidget />
            <NotebookLMWidget />
            <BrainstormingWidget />
            <GrillMeWidget />
            <CronogramaWidget />
            <KarpathyWidget />
            <DebuggingWidget />
            <VerificationWidget />
            <QAAuditorWidget />
            <LoopModeWidget />
            <QualityLoopWidget />
            <MCPWidget />
            <MultiAgentWidget />
            <RemotionWidget />
            <SkillBuilderWidget />
            <SkillCreatorWidget />
            <SkillFromMastersWidget />
            <SkillInstallerWidget />
            <SkillOrchestratorWidget />
            <SuperpowersWidget />
            <WarpgrepsWidget />
            <WritingPlansWidget />
            <XPublisherWidget />
            <YouTubeClipperWidget />
            <FindSkillsWidget />
            <ConsultaContextoWidget />
            <MiroFishReportsWidget />
            <OptimizacionWidget />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
