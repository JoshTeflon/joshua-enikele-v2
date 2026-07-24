"use client";

import { useEffect, useState } from "react";

import projects from "@/content/projects.json";

import LoadingScreen from "./loading-screen";

const MIN_DURATION_MS = 1600;
const FADE_MS = 500;
const LOCK_CLASS = "site-scroll-locked";

const uniqueAssets = [
  ...new Set(projects.map((project) => project.image).filter(Boolean)),
];

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

const lockScroll = () => {
  document.documentElement.classList.add(LOCK_CLASS);
};

const unlockScroll = () => {
  document.documentElement.classList.remove(LOCK_CLASS);
};

const IntroLoader = () => {
  const [phase, setPhase] = useState<"visible" | "exiting" | "done">("visible");

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    const scroller = document.querySelector<HTMLElement>(".site-scroll");

    // Clear any leftover inline overflow from earlier lock attempts
    if (scroller) {
      scroller.style.removeProperty("overflow");
      scroller.style.removeProperty("overflow-x");
      scroller.style.removeProperty("overflow-y");
    }

    const finish = async () => {
      await Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        ...uniqueAssets.map(preloadImage),
      ]);

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remaining));
      if (cancelled) return;

      setPhase("exiting");
      await new Promise((resolve) => setTimeout(resolve, FADE_MS));
      if (cancelled) return;

      setPhase("done");
    };

    lockScroll();
    finish();

    return () => {
      cancelled = true;
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (phase === "done") unlockScroll();
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ease-out ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      aria-busy={phase === "visible"}
    >
      <LoadingScreen />
    </div>
  );
};

export default IntroLoader;
