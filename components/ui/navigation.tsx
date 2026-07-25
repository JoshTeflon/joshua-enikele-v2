"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { CloseIcon } from "@/components/icons";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import me from "@/content/me.json";

import Frame from "./frame";
import MobileMenu from "./mobile-menu";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const didDeepLinkRef = useRef(false);

  useLayoutEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  const scrollToSection = useCallback(
    (sectionId: string, immediate = false) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      if (lenis) {
        lenis.scrollTo(section, { offset: 0, immediate });
        return;
      }

      section.scrollIntoView({
        behavior: immediate || reducedMotion ? "auto" : "smooth",
      });
    },
    [lenis, reducedMotion],
  );

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let scrollRaf = 0;
    let scroller: HTMLElement | null = null;

    const syncActive = () => {
      // Opening the mobile menu can briefly desync scroll metrics — freeze
      // active section + URL updates until the menu is closed.
      if (menuOpenRef.current) return;

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

    const handleNavClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      if (anchor.closest("[data-mobile-menu]")) return;

      const id = (anchor.getAttribute("href") ?? "").slice(1);
      if (!NAV_ITEMS.includes(id as (typeof NAV_ITEMS)[number])) return;
      if (!document.getElementById(id)) return;

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

      // Deep-link once only — re-running scrollTo on every effect refresh
      // was fighting the mobile menu open/close scroll pin.
      if (!didDeepLinkRef.current) {
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
        didDeepLinkRef.current = true;
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
  }, [lenis, scrollToSection]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMobileNavigate = (sectionId: string) => {
    setMenuOpen(false);
    // Wait for unlock + exit animation start so Lenis can scroll
    window.setTimeout(() => {
      scrollToSection(sectionId);
    }, reducedMotion ? 0 : 320);
  };

  return (
    <>
      <nav className="fixed inset-x-6 bottom-6 z-90 grid grid-cols-2 items-center p-2 uppercase xl:inset-x-8 xl:bottom-8">
        <h1 className="text-base tracking-[10%]">
          {firstName}.{lastName}
        </h1>

        <ul className="hidden items-center justify-end space-x-8 text-sm lg:flex">
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

        <div className="flex justify-end lg:hidden">
          <button
            type="button"
            className="frame-link cursor-pointer"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Frame className="px-4 py-1.5 text-sm">
              <span className="relative grid h-5 w-13 place-items-center">
                <span
                  className={`col-start-1 row-start-1 inline-flex items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    menuOpen
                      ? "pointer-events-none -translate-y-1 scale-75 opacity-0"
                      : "translate-y-0 scale-100 opacity-100"
                  }`}
                >
                  Menu
                </span>
                <span
                  className={`col-start-1 row-start-1 inline-flex items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    menuOpen
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none translate-y-1 scale-75 opacity-0"
                  }`}
                  aria-hidden={!menuOpen}
                >
                  <CloseIcon className="size-3.5" />
                </span>
              </span>
            </Frame>
          </button>
        </div>
      </nav>

      <div id="mobile-site-menu" data-mobile-menu>
        <MobileMenu
          open={menuOpen}
          items={NAV_ITEMS}
          activeSection={activeSection}
          onClose={() => setMenuOpen(false)}
          onNavigate={handleMobileNavigate}
        />
      </div>
    </>
  );
};

export default Navigation;
