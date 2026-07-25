"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export const SCROLL_ROOT_SELECTOR = ".site-scroll";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  reducedMotion: boolean;
  scrollRoot: string;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  reducedMotion: false,
  scrollRoot: SCROLL_ROOT_SELECTOR,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
};

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/** Provides Lenis + reduced-motion context. Pair with `ScrollRoot` for the scroller. */
export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const value = useMemo(
    () => ({
      lenis,
      reducedMotion,
      scrollRoot: SCROLL_ROOT_SELECTOR,
    }),
    [lenis, reducedMotion],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      <LenisRegistrar reducedMotion={reducedMotion} onLenisChange={setLenis} />
      {children}
    </SmoothScrollContext.Provider>
  );
};

/** Invisible registrar that finds `.site-scroll` after `ScrollRoot` mounts. */
const LenisRegistrar = ({
  reducedMotion,
  onLenisChange,
}: {
  reducedMotion: boolean;
  onLenisChange: (lenis: Lenis | null) => void;
}) => {
  useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>(SCROLL_ROOT_SELECTOR);
    const content = wrapper?.querySelector<HTMLElement>(".site-scroll-content");
    if (!wrapper || !content) return;

    ScrollTrigger.defaults({ scroller: wrapper });
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (reducedMotion) {
      ScrollTrigger.refresh();
      onLenisChange(null);
      return;
    }

    const lenis = new Lenis({
      wrapper,
      content,
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });

    onLenisChange(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const syncLock = () => {
      const locked = document.documentElement.classList.contains(
        "site-scroll-locked",
      );
      if (locked) {
        lenis.stop();
      } else {
        lenis.start();
        ScrollTrigger.refresh();
      }
    };

    syncLock();

    const mutationObserver = new MutationObserver(syncLock);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    ScrollTrigger.refresh();

    return () => {
      mutationObserver.disconnect();
      gsap.ticker.remove(ticker);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      onLenisChange(null);
      // Leave section-owned ScrollTriggers to each component's gsap.context cleanup.
      // Killing them here races React Strict Mode and throws `_gsap` errors.
    };
  }, [onLenisChange, reducedMotion]);

  return null;
};

type ScrollRootProps = {
  children: ReactNode;
};

export const ScrollRoot = ({ children }: ScrollRootProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef} className="site-scroll">
      <div className="site-scroll-content">{children}</div>
    </div>
  );
};
