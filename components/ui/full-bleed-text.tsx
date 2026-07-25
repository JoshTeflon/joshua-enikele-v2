"use client";

import { useLayoutEffect, useRef, useState } from "react";

type FullBleedTextProps = {
  children: string;
  className?: string;
  "aria-label"?: string;
};

const FullBleedText = ({
  children,
  className = "",
  "aria-label": ariaLabel,
}: FullBleedTextProps) => {
  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState("0 0 1000 160");

  useLayoutEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const bbox = text.getBBox();
    if (bbox.width === 0 || bbox.height === 0) return;

    setViewBox(`0 0 ${bbox.width} ${bbox.height}`);
  }, [children]);

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={ariaLabel ?? children}
      className={`block w-full overflow-visible ${className}`}
    >
      <text
        ref={textRef}
        x="0"
        y="0"
        dominantBaseline="hanging"
        fontSize="200"
        fill="currentColor"
      >
        {children}
      </text>
    </svg>
  );
};

export default FullBleedText;
