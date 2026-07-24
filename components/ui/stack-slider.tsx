import type { CSSProperties } from "react";
import type { IconType } from "react-icons";

export type StackItem = {
  name: string;
  icon: IconType;
  color?: string;
  inverted?: boolean;
};

type StackSliderProps = {
  stacks: StackItem[];
  visibleCount?: number;
};

const ITEM_HEIGHT_REM = 2.5;
const SKEW_DEG = -5;

const StackSlider = ({ stacks, visibleCount = 4 }: StackSliderProps) => {
  if (stacks.length === 0) return null;

  const looped = [...stacks, ...stacks];
  const viewportHeight = `${visibleCount * ITEM_HEIGHT_REM}rem`;
  const durationSeconds = Math.max(stacks.length * 3.375, 18);

  return (
    <div
      className="stack-slider relative w-fit overflow-hidden"
      style={
        {
          height: viewportHeight,
          transform: `skewY(${SKEW_DEG}deg)`,
        } as CSSProperties
      }
      aria-label="Technology stack"
    >
      <ul
        className="stack-slider-track m-0 flex list-none flex-col p-0"
        style={{
          ["--stack-duration" as string]: `${durationSeconds}s`,
        }}
      >
        {looped.map(({ name, icon: Icon, color, inverted }, index) => (
          <li
            key={`${name}-${index}`}
            className="flex items-center gap-3 uppercase tracking-wider"
            style={{
              height: `${ITEM_HEIGHT_REM}rem`,
              transform: `skewY(${-SKEW_DEG}deg)`,
            }}
          >
            <span
              className={`inline-flex size-5 shrink-0 items-center justify-center ${
                inverted ? "rounded-sm bg-foreground text-background" : ""
              }`}
              style={color && !inverted ? { color } : undefined}
            >
              <Icon aria-hidden className="size-3.5" />
            </span>
            <span className="text-sm whitespace-nowrap">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StackSlider;
