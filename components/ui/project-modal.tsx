"use client";

import { useEffect } from "react";

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

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.documentElement.classList.add("site-scroll-locked");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.classList.remove("site-scroll-locked");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
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
        className="project-modal relative z-10 flex w-[90%] flex-col overflow-hidden border border-foreground/20 bg-background"
        style={{
          height: "calc((100vh - 2 * var(--chrome-fade)))",
          maxHeight: "calc((100vh - 2 * var(--chrome-fade)))",
        }}
      >
        <div className="flex items-start justify-between gap-6 border-b border-foreground/15 px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0 flex-1 space-y-2 lg:space-y-3">
            <h2
              id="project-modal-title"
              className="text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl"
            >
              <ProjectTitleLink title={project.title} link={project.link} />
            </h2>

            <p className="max-w-3xl text-sm leading-relaxed text-foreground/75">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="border border-foreground/40 px-2.5 py-1 text-xs uppercase tracking-wider"
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

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
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
                  sizes="(max-width: 640px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
