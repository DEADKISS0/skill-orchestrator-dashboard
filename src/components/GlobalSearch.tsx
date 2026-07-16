"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { searchIndex, SearchItem } from "@/data/searchIndex";

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Cmd+K shortcut
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

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search with debounce
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
      const filtered = searchIndex.filter(item =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower)
      );
      setResults(filtered.slice(0, 8));
    }, 200);
  }, []);

  // Navigate results with keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      selectResult(results[selectedIndex]);
    }
  };

  const selectResult = (item: SearchItem) => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    const el = document.getElementById(item.targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs px-2 py-1 rounded transition-colors hover:bg-white/10 flex items-center gap-1"
        style={{ color: "var(--text-muted)", background: "var(--bg-secondary)" }}
        title="Buscar (Ctrl+K)"
      >
        🔍 <span className="hidden md:inline">Buscar</span>
        <kbd className="hidden md:inline text-[9px] px-1 rounded" style={{ background: "var(--border)" }}>⌘K</kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
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
          <kbd className="text-[10px] px-1 rounded" style={{ background: "var(--border)", color: "var(--text-muted)" }}>ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((item, i) => (
              <button
                key={item.id}
                onClick={() => selectResult(item)}
                className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors"
                style={{
                  background: i === selectedIndex ? "var(--accent)" : "transparent",
                  color: i === selectedIndex ? "white" : "var(--text-primary)",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.title}</div>
                  <div className="text-xs truncate" style={{ color: i === selectedIndex ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                    {item.description}
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: i === selectedIndex ? "rgba(255,255,255,0.2)" : "var(--border)" }}>
                  {item.section}
                </span>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-sm">No se encontraron resultados para "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="p-4 text-center" style={{ color: "var(--text-muted)" }}>
            <p className="text-xs">Escribe para buscar en {searchIndex.length} items</p>
          </div>
        )}
      </div>
    </div>
  );
}
