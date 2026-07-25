"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import me from "@/content/me.json";

gsap.registerPlugin(ScrollTrigger);

const renderRichText = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="about-em font-semibold text-accent">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });

const About = () => {
  const { about } = me;
  const { reducedMotion, scrollRoot } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const scroller = document.querySelector<HTMLElement>(scrollRoot);
    if (!section || !scroller || reducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-about-line]", section);

      lines.forEach((line) => {
        const emphasis = line.querySelectorAll<HTMLElement>(".about-em");

        gsap.set(line, { y: 28, opacity: 0 });
        if (emphasis.length) gsap.set(emphasis, { opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: line,
            scroller,
            start: "top 85%",
            once: true,
          },
        });

        timeline.to(line, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (emphasis.length) {
          timeline.to(
            emphasis,
            {
              opacity: 1,
              duration: 0.22,
              stagger: 0.025,
              ease: "power1.out",
              overwrite: "auto",
            },
            "-=0.45",
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, scrollRoot]);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section
      className="flex min-h-screen flex-col justify-center py-20 pt-24 pb-28 text-[clamp(1.8rem,5.4vw,3.6rem)] leading-[1.24] tracking-wider lg:text-[3.6rem] lg:leading-18 xl:pt-28 xl:pb-32"
    >
      <div className="flex flex-col gap-[0.6em]">
        {about.map((paragraph) => (
          <p key={paragraph} data-about-line>
            {renderRichText(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
};

export default About;
