"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";

type MobileMenuProps = {
  open: boolean;
  items: readonly string[];
  activeSection: string;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
};

const MobileMenu = ({
  open,
  items,
  activeSection,
  onClose,
  onNavigate,
}: MobileMenuProps) => {
  const { lenis, reducedMotion } = useSmoothScroll();
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const savedScrollRef = useRef(0);

  // Pin scroll position while open. Avoid lenis.stop()/start() — they call
  // reset()+emit() and interact badly with our scroller + ScrollTrigger.
  // Also avoid overflow:hidden, which zeroes scrollTop on `.site-scroll`.
  useEffect(() => {
    if (!open) return;

    const scroller = document.querySelector<HTMLElement>(".site-scroll");
    const saved =
      lenis?.scroll ?? scroller?.scrollTop ?? 0;
    savedScrollRef.current = saved;

    const pinScroll = () => {
      const target = savedScrollRef.current;
      if (scroller && scroller.scrollTop !== target) {
        scroller.scrollTop = target;
      }
      if (lenis && Math.abs(lenis.scroll - target) > 0.5) {
        lenis.scrollTo(target, { immediate: true, force: true });
      }
    };

    const preventScroll = (event: Event) => {
      event.preventDefault();
      pinScroll();
    };

    pinScroll();
    scroller?.addEventListener("scroll", pinScroll, { passive: true });
    scroller?.addEventListener("wheel", preventScroll, { passive: false });
    scroller?.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      scroller?.removeEventListener("scroll", pinScroll);
      scroller?.removeEventListener("wheel", preventScroll);
      scroller?.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      pinScroll();
    };
  }, [lenis, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    const links = linkRefs.current.filter(Boolean) as HTMLButtonElement[];

    if (!root || !backdrop || !panel) return;

    timelineRef.current?.kill();

    if (reducedMotion) {
      gsap.set(root, {
        autoAlpha: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      });
      gsap.set([backdrop, panel, ...links], { clearProps: "all" });
      return;
    }

    if (open) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      timelineRef.current = tl;

      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, {
        y: 28,
        opacity: 0,
        scale: 0.96,
        transformOrigin: "bottom right",
      });
      gsap.set(links, { y: 20, opacity: 0 });

      tl.to(backdrop, { opacity: 1, duration: 0.35 })
        .to(panel, { y: 0, opacity: 1, scale: 1, duration: 0.45 }, "-=0.15")
        .to(
          links,
          { y: 0, opacity: 1, duration: 0.2, stagger: 0.03 },
          "-=0.3",
        );
    } else {
      if (gsap.getProperty(root, "autoAlpha") === 0) {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.in" },
        onComplete: () => {
          gsap.set(root, { pointerEvents: "none" });
        },
      });
      timelineRef.current = tl;

      tl.to(links, { y: 12, opacity: 0, duration: 0.2, stagger: 0.03 })
        .to(
          panel,
          {
            y: 20,
            opacity: 0,
            scale: 0.97,
            duration: 0.28,
            transformOrigin: "bottom right",
          },
          "-=0.1",
        )
        .to(backdrop, { opacity: 0, duration: 0.22 }, "-=0.12")
        .set(root, { autoAlpha: 0 });
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [open, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-80 lg:hidden"
      style={{ visibility: "hidden" }}
      aria-hidden={!open}
    >
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-background/25 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sit above the bottom nav trigger (bottom-6 + bar), aligned right */}
      <div
        ref={panelRef}
        className="absolute right-6 bottom-19 z-10 w-[min(20rem,calc(100%-3rem))] bg-foreground px-7 py-8 text-background shadow-[0_24px_80px_rgba(0,0,0,0.75)] sm:right-8 sm:bottom-21 sm:px-8 sm:py-10"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <p className="mb-7 text-xs uppercase tracking-[0.2em] text-background/45">
          Menu
        </p>

        <ul className="flex flex-col gap-1">
          {items.map((item, index) => {
            const isActive = activeSection === item;

            return (
              <li key={item}>
                <button
                  ref={(node) => {
                    linkRefs.current[index] = node;
                  }}
                  type="button"
                  className={`font-duvel-sans block w-full cursor-pointer text-left text-[clamp(2.25rem,10vw,3rem)] leading-[1.05] uppercase tracking-wide transition-opacity duration-200 ${
                    isActive
                      ? "text-background"
                      : "text-background/45 hover:text-background"
                  }`}
                  onClick={() => onNavigate(item)}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
