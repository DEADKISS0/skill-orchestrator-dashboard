"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

const STORAGE_KEY = "rr-pitch-mode";

interface PresentationModeContextValue {
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
  setPresentationMode: (value: boolean) => void;
}

const PresentationModeContext = createContext<PresentationModeContextValue>({
  isPresentationMode: false,
  togglePresentationMode: () => {},
  setPresentationMode: () => {},
});

export function PresentationModeProvider({ children }: { children: ReactNode }) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setIsPresentationMode(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.body.dataset.presentation = isPresentationMode ? "true" : "false";
    try {
      sessionStorage.setItem(STORAGE_KEY, isPresentationMode ? "1" : "0");
    } catch {
      /* ignore */
    }
    return () => {
      delete document.body.dataset.presentation;
    };
  }, [isPresentationMode, hydrated]);

  const setPresentationMode = useCallback((value: boolean) => {
    setIsPresentationMode(value);
    if (value) {
      requestAnimationFrame(() => {
        document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const togglePresentationMode = useCallback(() => {
    setIsPresentationMode((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "p" && e.key !== "P") return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const tag = t.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t.isContentEditable) return;
      // Roles pitch/client force pitch — no toggle via keyboard
      if (document.body.dataset.rrRole === "pitch" || document.body.dataset.rrRole === "client") {
        return;
      }
      e.preventDefault();
      togglePresentationMode();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePresentationMode]);

  return (
    <PresentationModeContext.Provider
      value={{ isPresentationMode, togglePresentationMode, setPresentationMode }}
    >
      {children}
    </PresentationModeContext.Provider>
  );
}

export function usePresentationMode() {
  return useContext(PresentationModeContext);
}
