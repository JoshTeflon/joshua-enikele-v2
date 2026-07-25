"use client";

import { useEffect, useState } from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
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

  const first = sections[0];
  const last = sections[sections.length - 1];
  if (first.getBoundingClientRect().top > focusY) return first.id;
  return last.id;
};

const Navigation = () => {
  const { firstName, lastName } = me;
  const { lenis, reducedMotion } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let cancelled = false;
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

    const scrollToSection = (sectionId: string, immediate = false) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      if (lenis) {
        lenis.scrollTo(section, { offset: 0, immediate });
        return;
      }

      section.scrollIntoView({
        behavior: immediate || reducedMotion ? "auto" : "smooth",
      });
    };

    const handleNavClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const id = (anchor.getAttribute("href") ?? "").slice(1);
      if (!NAV_ITEMS.includes(id as (typeof NAV_ITEMS)[number])) return;
      if (!document.getElementById(id)) return;

      // Keep # out of the URL while scrolling via Lenis / native scroller
      event.preventDefault();
      scrollToSection(id);
    };

    const handlePopState = () => {
      const pathSection = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop();
      if (
        pathSection &&
        NAV_ITEMS.includes(pathSection as (typeof NAV_ITEMS)[number])
      ) {
        scrollToSection(pathSection, true);
      }
    };

    const init = () => {
      if (cancelled) return;

      if (document.documentElement.classList.contains("site-scroll-locked")) {
        rafId = requestAnimationFrame(init);
        return;
      }

      scroller = document.querySelector<HTMLElement>(".site-scroll");

      document.addEventListener("click", handleNavClick);
      window.addEventListener("popstate", handlePopState);

      const pathSection = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop();
      if (
        pathSection &&
        NAV_ITEMS.includes(pathSection as (typeof NAV_ITEMS)[number])
      ) {
        scrollToSection(pathSection, true);
      }

      syncActive();
      scroller?.addEventListener("scroll", onScroll, { passive: true });
      lenis?.on("scroll", onScroll);
      window.addEventListener("resize", onScroll);
    };

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(scrollRaf);
      document.removeEventListener("click", handleNavClick);
      window.removeEventListener("popstate", handlePopState);
      scroller?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, [lenis, reducedMotion]);

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
