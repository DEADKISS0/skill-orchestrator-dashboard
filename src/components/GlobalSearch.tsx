"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { searchIndex, SearchItem, quickActions, QuickAction } from "@/data/searchIndex";

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!value.trim()) {
        setResults([]);
        return;
      }
      const lower = value.toLowerCase();
      const filtered = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          item.section.toLowerCase().includes(lower)
      );
      setResults(filtered.slice(0, 8));
    }, 200);
  }, []);

  const navigateTo = (targetId?: string, sectionId?: string) => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    if (sectionId) {
      window.dispatchEvent(new CustomEvent("dashboard-nav", { detail: { sectionId } }));
    }
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, sectionId ? 150 : 0);
    }
  };

  const selectResult = (item: SearchItem) => {
    navigateTo(item.targetId, item.sectionId);
  };

  const selectAction = (action: QuickAction) => {
    if (action.href) {
      window.open(action.href, "_blank", "noopener,noreferrer");
      setIsOpen(false);
      setQuery("");
      return;
    }
    navigateTo(action.targetId, action.sectionId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      selectResult(results[selectedIndex]);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-ghost !py-1.5 flex items-center gap-1.5"
        title="Buscar (Ctrl+K)"
      >
        🔍 <span className="hidden md:inline font-mono-label">Buscar</span>
        <kbd className="hidden md:inline text-[9px] px-1 rounded" style={{ background: "var(--border)" }}>
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: "rgba(15,15,15,0.88)" }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden glass-panel"
        style={{ boxShadow: "var(--shadow-ember)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="text-sm">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar skills, widgets, reportes..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
          <kbd className="text-[10px] px-1 rounded font-mono-label" style={{ background: "var(--border)", color: "var(--text-muted)" }}>
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((item, i) => (
              <button
                key={item.id}
                onClick={() => selectResult(item)}
                className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors"
                style={{
                  background: i === selectedIndex ? "var(--ember)" : "transparent",
                  color: i === selectedIndex ? "var(--parchment)" : "var(--text-primary)",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.title}</div>
                  <div
                    className="text-xs truncate"
                    style={{ color: i === selectedIndex ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}
                  >
                    {item.description}
                  </div>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded font-mono-label"
                  style={{ background: i === selectedIndex ? "rgba(255,255,255,0.2)" : "var(--border)" }}
                >
                  {item.section}
                </span>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-sm">No se encontraron resultados para &quot;{query}&quot;</p>
          </div>
        )}

        {!query && (
          <div className="p-3">
            <p className="font-mono-label px-2 mb-2" style={{ color: "var(--text-muted)" }}>
              Acciones rápidas
            </p>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => selectAction(action)}
                  className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors hover:bg-white/5"
                >
                  <span>{action.icon}</span>
                  <div>
                    <div className="text-sm" style={{ color: "var(--text-primary)" }}>{action.title}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{action.description}</div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-center mt-3 font-mono-label" style={{ color: "var(--text-muted)" }}>
              {searchIndex.length} items indexados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
