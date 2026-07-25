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

  const content = (
    <>
      <span>
        {title}
      </span>
      <span
        className={`inline-flex size-6 shrink-0 items-center justify-center border transition-all duration-300 ${
          isDisabled
            ? "border-foreground/20 text-foreground/30"
            : "border-foreground/50 text-foreground group-hover:border-foreground group-hover:[&_svg]:rotate-45"
        }`}
      >
        <ArrowIcon className="transition-transform duration-300" />
      </span>
    </>
  );

  if (isDisabled) {
    return (
      <span
        id={id}
        className={`inline-flex items-center gap-2.5 ${className}`}
        aria-disabled="true"
        title="Private / in-house project"
      >
        {content}
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
      {content}
    </a>
  );
};

export default ProjectTitleLink;
