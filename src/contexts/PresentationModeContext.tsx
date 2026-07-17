"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PresentationModeContextValue {
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
}

const PresentationModeContext = createContext<PresentationModeContextValue>({
  isPresentationMode: false,
  togglePresentationMode: () => {},
});

export function PresentationModeProvider({ children }: { children: ReactNode }) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  useEffect(() => {
    document.body.dataset.presentation = isPresentationMode ? "true" : "false";
    return () => {
      delete document.body.dataset.presentation;
    };
  }, [isPresentationMode]);

  return (
    <PresentationModeContext.Provider
      value={{
        isPresentationMode,
        togglePresentationMode: () => setIsPresentationMode((v) => !v),
      }}
    >
      {children}
    </PresentationModeContext.Provider>
  );
}

export function usePresentationMode() {
  return useContext(PresentationModeContext);
}
