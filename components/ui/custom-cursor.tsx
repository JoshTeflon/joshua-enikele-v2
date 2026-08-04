"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  '[role="button"]',
  "input",
  "textarea",
  "select",
  "label[for]",
  "summary",
  ".cursor-pointer",
  "[data-cursor]",
].join(",");

const HIDE_SELECTOR = "[data-cursor-hide]";

const LERP = 0.28;
const WOBBLE_PX = 1.35;
const WOBBLE_SPEED = 0.0045;
const CURSOR_SIZE = 24;

const useFinePointer = () => {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const pointerMq = window.matchMedia("(pointer: fine)");
    const hoverMq = window.matchMedia("(hover: hover)");

    const update = () => {
      setFine(pointerMq.matches && hoverMq.matches);
    };

    update();
    pointerMq.addEventListener("change", update);
    hoverMq.addEventListener("change", update);
    return () => {
      pointerMq.removeEventListener("change", update);
      hoverMq.removeEventListener("change", update);
    };
  }, []);

  return fine;
};

const CustomCursor = () => {
  const finePointer = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const activeRef = useRef(false);
  const hideRef = useRef(false);
  const inWindowRef = useRef(false);

  useEffect(() => {
    if (!finePointer) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wobbleAmt = reducedMotion ? 0 : WOBBLE_PX;

    const setDotVisibility = () => {
      const show =
        inWindowRef.current &&
        activeRef.current &&
        !hideRef.current &&
        visibleRef.current;
      dot.style.opacity = show ? "1" : "0";
    };

    const onPointerMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      inWindowRef.current = true;

      if (!visibleRef.current) {
        currentRef.current.x = event.clientX;
        currentRef.current.y = event.clientY;
        visibleRef.current = true;
      }

      const el = event.target;
      if (el instanceof Element) {
        hideRef.current = Boolean(el.closest(HIDE_SELECTOR));
        activeRef.current = Boolean(el.closest(INTERACTIVE_SELECTOR));
      } else {
        hideRef.current = false;
        activeRef.current = false;
      }

      setDotVisibility();
    };

    const onPointerOut = (event: PointerEvent) => {
      // Leaving the document / viewport
      if (!event.relatedTarget && !(event as PointerEvent).buttons) {
        inWindowRef.current = false;
        visibleRef.current = false;
        setDotVisibility();
      }
    };

    const onWindowLeave = () => {
      inWindowRef.current = false;
      visibleRef.current = false;
      setDotVisibility();
    };

    let time = 0;

    const tick = () => {
      time += 16;
      const { x: tx, y: ty } = targetRef.current;
      const cur = currentRef.current;

      cur.x += (tx - cur.x) * LERP;
      cur.y += (ty - cur.y) * LERP;

      const wobbleX = Math.sin(time * WOBBLE_SPEED) * wobbleAmt;
      const wobbleY = Math.cos(time * WOBBLE_SPEED * 1.35) * wobbleAmt;

      dot.style.transform = `translate3d(${cur.x + wobbleX}px, ${cur.y + wobbleY}px, 0) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", onWindowLeave);
    document.documentElement.addEventListener("mouseleave", onWindowLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", onWindowLeave);
      document.documentElement.removeEventListener("mouseleave", onWindowLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <div
      ref={dotRef}
      className="custom-cursor"
      aria-hidden
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
      }}
    />
  );
};

export default CustomCursor;
