"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import projects from "@/content/projects.json";

import "swiper/css";

const SLIDES_PER_VIEW = 3;
const PROJECT_COUNT = projects.length;
const LOOP_COPIES = 3;

const slides = Array.from({ length: PROJECT_COUNT * LOOP_COPIES }, (_, index) => ({
  ...projects[index % PROJECT_COUNT],
  slideId: index,
}));

const getPaginationSlots = (activeIndex: number, total: number) => {
  const prev = (activeIndex - 1 + total) % total;
  const next = (activeIndex + 1) % total;
  return [prev, activeIndex, next] as const;
};

const getProjectSlideIndex = (projectIndex: number, copy: number) =>
  copy * PROJECT_COUNT + projectIndex;

const getClosestSlideIndex = (
  projectIndex: number,
  currentSlideIndex: number,
) => {
  const candidates = Array.from({ length: LOOP_COPIES }, (_, copy) =>
    getProjectSlideIndex(projectIndex, copy),
  );

  return candidates.reduce((best, candidate) =>
    Math.abs(candidate - currentSlideIndex) <
    Math.abs(best - currentSlideIndex)
      ? candidate
      : best,
  );
};

const normalizeLoopPosition = (swiper: SwiperInstance) => {
  const { activeIndex } = swiper;

  if (activeIndex < PROJECT_COUNT) {
    swiper.slideTo(activeIndex + PROJECT_COUNT, 0, false);
    return;
  }

  if (activeIndex >= PROJECT_COUNT * 2) {
    swiper.slideTo(activeIndex - PROJECT_COUNT, 0, false);
  }
};

const Work = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const paginationSlots = useMemo(
    () => getPaginationSlots(activeIndex, PROJECT_COUNT),
    [activeIndex],
  );

  const activeProject = projects[activeIndex];

  const goToProject = (projectIndex: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const targetSlide = getClosestSlideIndex(projectIndex, swiper.activeIndex);
    swiper.slideTo(targetSlide);
  };

  return (
    <section className="py-20 flex min-h-screen flex-col justify-center gap-16 xl:gap-20">
      <nav
        aria-label="Project pagination"
        className="mx-auto grid w-full max-w-24 grid-cols-3 items-end gap-6 lg:max-w-32 lg:gap-8"
      >
        {paginationSlots.map((index, slot) => {
          const isActive = slot === 1;

          return (
            <button
              key={`${index}-${slot}`}
              type="button"
              onClick={() => goToProject(index)}
              aria-current={isActive ? "true" : undefined}
              className={`cursor-pointer justify-self-center font-cascadia-code leading-none transition-all duration-300 ${
                isActive
                  ? "scale-100 text-[1.5rem] text-foreground"
                  : "scale-90 text-[0.875rem] text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </nav>

      <Swiper
        className="work-swiper w-full"
        centeredSlides
        grabCursor
        watchSlidesProgress
        initialSlide={getProjectSlideIndex(1, 1)}
        slidesPerView={SLIDES_PER_VIEW}
        spaceBetween={16}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex % PROJECT_COUNT);
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          normalizeLoopPosition(swiper);
          setActiveIndex(swiper.activeIndex % PROJECT_COUNT);
        }}
        breakpoints={{
          1024: {
            spaceBetween: 32,
          },
        }}
      >
        {slides.map((project) => (
          <SwiperSlide key={project.slideId}>
            <div className="work-slide-inner relative aspect-video w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 33vw, 33vw"
                className="object-cover"
                priority={project.slideId === getProjectSlideIndex(1, 1)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-2 text-center sm:gap-4">
        <h3 className="text-base font-medium lowercase tracking-wide lg:text-[1.5rem]">
          {activeProject.title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground/80 lg:text-[0.875rem]">
          {activeProject.description}
        </p>
      </div>
    </section>
  );
};

export default Work;
