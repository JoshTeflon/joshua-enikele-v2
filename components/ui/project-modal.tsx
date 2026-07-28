"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { CloseIcon } from "../icons";
import MediaImage from "./media-image";
import ProjectTitleLink from "./project-title-link";

export type ProjectModalData = {
  title: string;
  description: string;
  link?: string | null;
  stack: string[];
  gallery: string[];
};

type ProjectModalProps = {
  project: ProjectModalData;
  onClose: () => void;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { lenis } = useSmoothScroll();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.documentElement.classList.add("site-scroll-locked");
    lenis?.stop();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.classList.remove("site-scroll-locked");
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lenis, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close project details"
        className="absolute inset-0 cursor-pointer bg-background/80"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        data-lenis-prevent
        className="project-modal relative z-10 flex w-full max-w-5xl flex-col overflow-hidden border border-foreground/20 bg-background sm:w-[90%]"
        style={{
          height: "calc(100dvh - 2 * var(--chrome-fade))",
          maxHeight: "calc(100dvh - 2 * var(--chrome-fade))",
        }}
      >
        {/* Compact on mobile so the gallery pane always has room to scroll */}
        <header className="relative shrink-0 border-b border-foreground/15 px-4 py-3 sm:px-8 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-3">
              <h2
                id="project-modal-title"
                className="text-xl font-medium tracking-tight sm:text-3xl lg:text-4xl"
              >
                <ProjectTitleLink title={project.title} link={project.link} />
              </h2>

              <p className="line-clamp-2 max-w-3xl text-xs leading-relaxed text-foreground/75 sm:line-clamp-none sm:text-sm">
                {project.description}
              </p>

              <ul className="flex max-h-16 flex-wrap gap-1.5 overflow-hidden sm:max-h-none sm:gap-2">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="border border-foreground/40 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider sm:px-2.5 sm:py-1 sm:text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center border border-foreground/20 text-foreground/80 transition-opacity hover:opacity-70"
            >
              <CloseIcon />
            </button>
          </div>
        </header>

        {/*
          data-lenis-prevent: Lenis still preventDefaults wheel/touch while
          stopped — this attribute lets native overflow scroll win.
        */}
        <div
          data-lenis-prevent
          className="project-modal-gallery min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-8 sm:py-6"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {project.gallery.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-video w-full bg-foreground/5"
              >
                <MediaImage
                  src={src}
                  alt={`${project.title} gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProjectModal;
