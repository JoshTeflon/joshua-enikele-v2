"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import me from "@/content/me.json";

import StackSlider, { type StackItem } from "./stack-slider";

gsap.registerPlugin(ScrollTrigger);

const STACK_META: Record<
  string,
  Pick<StackItem, "icon" | "color" | "inverted">
> = {
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, inverted: true },
  "Vue.js": { icon: SiVuedotjs, color: "#42B883" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "C#": { icon: TbBrandCSharp, color: "#512BD4" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
};

const Hero = () => {
  const { role, pitch, locationLine, stacks } = me;
  const { reducedMotion, scrollRoot } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const stackItems: StackItem[] = stacks.map((name) => ({
    name,
    ...STACK_META[name]!,
  }));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const roleEl = roleRef.current;
    const slider = sliderRef.current;
    const scroller = document.querySelector<HTMLElement>(scrollRoot);
    if (!section || !roleEl || !scroller || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(roleEl, {
        scale: 0.88,
        opacity: 0.4,
        ease: "none",
        transformOrigin: "center bottom",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      if (slider) {
        ScrollTrigger.create({
          trigger: section,
          scroller,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            slider
              .querySelector(".stack-slider")
              ?.classList.toggle("is-paused", !self.isActive);
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, scrollRoot]);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-section
      className="flex min-h-screen flex-col justify-between gap-12 py-20 pt-24 pb-28 xl:pt-28 xl:pb-32"
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        <div className="flex max-w-xl flex-col gap-6 text-sm leading-relaxed tracking-wide sm:text-base">
          {pitch.map((paragraph) => (
            <p key={paragraph} className="capitalize">
              {paragraph}
            </p>
          ))}
        </div>

        <div ref={sliderRef}>
          <StackSlider stacks={stackItems} />
        </div>
      </div>

      <div ref={roleRef} className="flex flex-col gap-1 will-change-transform">
        <p className="-mb-4 self-end text-right text-xs uppercase tracking-wider text-foreground/80 md:-mb-6 lg:-mb-8 lg:text-sm">
          {locationLine}
        </p>

        <svg
          viewBox="0 0 1000 130"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={role}
          className="block w-full overflow-visible font-duvel-sans"
        >
          <text
            x="0"
            y="50%"
            dominantBaseline="central"
            fontSize="130"
            textLength="1000"
            lengthAdjust="spacing"
            fill="currentColor"
          >
            {role.toUpperCase()}.
          </text>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
