"use client";

import { useSyncExternalStore } from "react";

import { DeviceIcon, SunIcon, MoonIcon } from "../icons";

type Theme = "system" | "light" | "dark";

const THEMES: Theme[] = ["system", "light", "dark"];

const ICONS: Record<Theme, typeof DeviceIcon> = {
  system: DeviceIcon,
  light: SunIcon,
  dark: MoonIcon,
};

const THEME_EVENT = "themechange";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme !== "system") root.classList.add(theme);
};

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
};

const getSnapshot = (): Theme => {
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored && THEMES.includes(stored) ? stored : "system";
};

const getServerSnapshot = (): Theme => "system";

const ThemeToggle = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    localStorage.setItem("theme", next);
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const Icon = ICONS[theme];
  const label = `Switch theme (current: ${theme})`;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="top-bar-icon flex items-center cursor-pointer"
    >
      <Icon />
    </button>
  );
};

export default ThemeToggle;
