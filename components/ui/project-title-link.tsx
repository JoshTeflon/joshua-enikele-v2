import { LuLock } from "react-icons/lu";

import { ArrowIcon } from "../icons";

type ProjectTitleLinkProps = {
  title: string;
  link?: string | null;
  className?: string;
  id?: string;
};

const ProjectTitleLink = ({
  title,
  link,
  className = "",
  id,
}: ProjectTitleLinkProps) => {
  const isDisabled = !link;

  if (isDisabled) {
    return (
      <span
        id={id}
        className={`inline-flex items-center gap-2 ${className}`}
        aria-disabled="true"
        title="Private / in-house project"
      >
        <span>{title}</span>
        <LuLock
          aria-hidden
          className="size-3.5 shrink-0 text-foreground/45 sm:size-4"
        />
      </span>
    );
  }

  return (
    <a
      id={id}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`Visit ${title}`}
    >
      <span className="transition-[letter-spacing] duration-300 group-hover:tracking-wider">
        {title}
      </span>
      <span className="inline-flex size-6 shrink-0 items-center justify-center border border-foreground/50 text-foreground transition-all duration-300 group-hover:border-foreground group-hover:[&_svg]:rotate-45 sm:size-7">
        <ArrowIcon className="transition-transform duration-300" />
      </span>
    </a>
  );
};

export default ProjectTitleLink;
