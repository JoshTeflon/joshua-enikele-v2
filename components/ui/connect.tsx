import me from "@/content/me.json";

import { ArrowIcon } from "../icons";

const Connect = () => {
  const { firstName, lastName, email, socials } = me;

  const contacts = [
    { label: "Email", value: email, href: `mailto:${email}` },
    { label: "LinkedIn", value: "Let's Connect", href: socials.linkedin },
    { label: "GitHub", value: "JoshTeflon — Let's Build", href: socials.github },
  ];

  const fullName = `${firstName} ${lastName}`.toUpperCase();

  return (
    <section className="flex min-h-screen flex-col justify-between gap-12 py-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12">
        <h2 className="font-duvel-sans uppercase tracking-wider text-[clamp(1.75rem,5vw,2.5rem)] lg:text-[2.5rem]">
          Let&rsquo;s connect
        </h2>

        <ul className="w-full lg:w-1/2">
          {contacts.map(({ label, value, href }) => (
            <li key={label} className="border-b border-foreground/75">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[7rem_1fr_auto] items-center gap-4 md:gap-8 lg:gap-16 py-10 text-base uppercase tracking-wider"
              >
                <span className="text-foreground/75">{label}</span>
                <span className="truncate">{value}</span>
                <ArrowIcon className="shrink-0 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <svg
        viewBox="0 0 600 100"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={fullName}
        className="w-full overflow-visible font-duvel"
      >
        <text
          x="0"
          y="76"
          fontSize="100"
          textLength="600"
          lengthAdjust="spacingAndGlyphs"
          fill="currentColor"
        >
          {fullName}
        </text>
      </svg>
    </section>
  );
};

export default Connect;
