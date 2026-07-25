"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import me from "@/content/me.json";

import { ArrowIcon } from "../icons";
import FullBleedText from "./full-bleed-text";

gsap.registerPlugin(ScrollTrigger);

const Connect = () => {
  const { firstName, lastName, email, socials, connectBlurb } = me;
  const { reducedMotion, scrollRoot } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const contacts = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "LinkedIn", value: "Let's Connect", href: socials.linkedin },
    { label: "GitHub", value: "JoshTeflon — Let's Build", href: socials.github },
  ];

  const fullName = `${firstName} ${lastName}`.toUpperCase();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const nameEl = nameRef.current;
    const scroller = document.querySelector<HTMLElement>(scrollRoot);
    if (!section || !scroller || reducedMotion) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-connect-row]", section);

      if (rows.length > 0) {
        gsap.set(rows, { y: 20, opacity: 0 });

        ScrollTrigger.batch(rows, {
          scroller,
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: "auto",
            });
          },
        });
      }

      if (nameEl) {
        gsap.to(nameEl, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, scrollRoot]);

  return (
    <section
      ref={sectionRef}
      id="connect"
      data-section
      className="flex min-h-screen flex-col justify-between gap-12 py-20"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12">
        <div className="flex max-w-md flex-col gap-4">
          <h2 className="font-duvel-sans uppercase tracking-wider text-[clamp(1.75rem,5vw,2.5rem)] lg:text-[2.5rem]">
            Let&rsquo;s connect
          </h2>
          <p className="text-sm leading-relaxed text-foreground/75">
            {connectBlurb}
          </p>
        </div>

        <ul className="w-full lg:w-1/2">
          {contacts.map(({ label, value, href }) => (
            <li
              key={label}
              data-connect-row
              className="border-b border-foreground/75"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[7rem_1fr_auto] items-center gap-4 py-10 text-base uppercase tracking-wider md:gap-8 lg:gap-16"
              >
                <span className="text-foreground/75">{label}</span>
                <span className="truncate">{value}</span>
                <ArrowIcon className="shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div ref={nameRef} className="will-change-transform">
        <FullBleedText className="font-duvel-sans" aria-label={fullName}>
          {fullName}
        </FullBleedText>
      </div>
    </section>
  );
};

export default Connect;
