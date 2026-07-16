"use client";
import { useState, useRef, useEffect } from "react";
import { commandsCatalog } from "@/data/commandsCatalog";

export default function CommandCenterWidget() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rr-command-history");
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {
      localStorage.removeItem("rr-command-history");
    }
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add to history
    const newHistory = [trimmed, ...history.filter(h => h !== trimmed)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("rr-command-history", JSON.stringify(newHistory));

    // Find matching command
    const match = commandsCatalog.find(c =>
      c.shortcut?.toLowerCase() === trimmed ||
      c.keywords.some(k => trimmed.includes(k))
    );

    if (match) {
      if (match.action === "navigate" && match.target) {
        const el = document.getElementById(match.target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (match.action === "search") {
        // Trigger search
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
      } else if (match.action === "info") {
        alert(`${match.icon} ${match.name}: ${match.description}`);
      }
    } else {
      alert(`Comando no reconocido: "${cmd}". Escribe "ayuda" para ver comandos disponibles.`);
    }

    setInput("");
    setShowHistory(false);
  };

  return (
    <div className="card p-4 animate-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⌨️</span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Centro de Comandos</h3>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") executeCommand(input);
            if (e.key === "Escape") { setShowHistory(false); inputRef.current?.blur(); }
          }}
          placeholder="Escribe un comando... (ej: /reportes, /skills, ayuda)"
          className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px]" style={{ color: "var(--text-muted)" }}>
          Enter ↵
        </div>
      </div>

      {showHistory && history.length > 0 && (
        <div className="mt-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
          <span className="font-semibold">Recientes:</span>{" "}
          {history.slice(0, 5).map((h, i) => (
            <button
              key={i}
              onClick={() => { setInput(h); executeCommand(h); }}
              className="px-1.5 py-0.5 rounded mr-1 mb-1 transition-colors hover:bg-white/10"
              style={{ background: "var(--border)" }}
            >
              {h}
            </button>
          ))}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-1">
        {commandsCatalog.slice(0, 6).map(cmd => (
          <button
            key={cmd.id}
            onClick={() => executeCommand(cmd.shortcut || cmd.keywords[0])}
            className="text-[10px] px-2 py-1 rounded transition-colors hover:bg-white/10"
            style={{ background: "var(--border)", color: "var(--text-secondary)" }}
          >
            {cmd.icon} {cmd.name}
          </button>
        ))}
      </div>
    </div>
  );
}
