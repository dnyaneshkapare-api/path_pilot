"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, RIASECScore } from "@/types";

export type SupportedLanguage = "en" | "hi" | "mr";

interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  lang: SupportedLanguage;
  setLang: (l: SupportedLanguage) => void;
  savedCareerIds: string[];
  toggleSaveCareer: (id: string) => void;
  lastAssessmentScores: RIASECScore | null;
  setLastAssessmentScores: (s: RIASECScore | null) => void;
  isGuest: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>(["car-01"]);
  const [lastAssessmentScores, setLastAssessmentScores] = useState<RIASECScore | null>(null);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/v1/auth/me");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const toggleSaveCareer = (id: string) => {
    setSavedCareerIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const logout = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        lang,
        setLang,
        savedCareerIds,
        toggleSaveCareer,
        lastAssessmentScores,
        setLastAssessmentScores,
        isGuest: !user,
        logout,
        refreshUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
