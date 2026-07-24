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

import me from "@/content/me.json";

import StackSlider, { type StackItem } from "./stack-slider";

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

  const stackItems: StackItem[] = stacks.map((name) => ({
    name,
    ...STACK_META[name]!,
  }));

  return (
    <section className="flex min-h-screen flex-col justify-between gap-12 py-20 pt-24 pb-28 xl:pt-28 xl:pb-32">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        <div className="flex max-w-xl flex-col gap-6 text-sm leading-relaxed tracking-wide sm:text-base">
          {pitch.map((paragraph) => (
            <p key={paragraph} className="capitalize">
              {paragraph}
            </p>
          ))}
        </div>

        <StackSlider stacks={stackItems} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="self-end text-right text-xs uppercase tracking-wider text-foreground/80 lg:text-sm">
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
