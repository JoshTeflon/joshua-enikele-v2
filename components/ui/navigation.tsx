"use client";

import { createSectionNav } from "hashfree";
import { useEffect, useState } from "react";

import me from "@/content/me.json";

import Frame from "./frame";

const NAV_ITEMS = ["home", "work", "about", "connect"] as const;

/** Section that contains the reading focus line (works for tall sections). */
const getActiveSectionId = () => {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("[data-section][id]"),
  );

  if (sections.length === 0) return "home";

  const focusY = window.innerHeight * 0.35;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= focusY && rect.bottom > focusY) {
      return section.id;
    }
  }

  // Above first / below last — clamp to nearest
  const first = sections[0];
  const last = sections[sections.length - 1];
  if (first.getBoundingClientRect().top > focusY) return first.id;
  return last.id;
};

const Navigation = () => {
  const { firstName, lastName } = me;
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let cancelled = false;
    let nav: ReturnType<typeof createSectionNav> | null = null;
    let rafId = 0;
    let scrollRaf = 0;
    let scroller: HTMLElement | null = null;

    const syncActive = () => {
      const sectionId = getActiveSectionId();
      setActiveSection(sectionId);

      const path = `/${sectionId}`;
      if (window.location.pathname !== path) {
        history.replaceState({ sectionId }, "", path);
      }
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        syncActive();
      });
    };

    const init = () => {
      if (cancelled) return;

      // Wait for intro scroll-lock to clear so deep links can scrollIntoView
      if (document.documentElement.classList.contains("site-scroll-locked")) {
        rafId = requestAnimationFrame(init);
        return;
      }

      scroller = document.querySelector<HTMLElement>(".site-scroll");

      // Hashfree handles hash-less clicks + deep-link scroll. Its IO ratio
      // logic mis-ranks tall sections (about), so active/URL sync is ours.
      nav = createSectionNav({
        sections: [],
        updateStrategy: "replace",
      });

      syncActive();
      scroller?.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(scrollRaf);
      scroller?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      nav?.destroy();
    };
  }, []);

  return (
    <nav className="fixed inset-x-6 bottom-6 z-50 grid grid-cols-2 items-center p-2 uppercase xl:inset-x-8 xl:bottom-8">
      <h1 className="text-base tracking-[10%]">
        {firstName}.{lastName}
      </h1>

      <ul className="flex items-center justify-end space-x-8 text-sm">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item;

          return (
            <li key={item}>
              <a
                className={`frame-link ${isActive ? "active" : ""}`}
                href={`#${item}`}
              >
                <Frame className="px-4 py-1.5">{item}</Frame>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;