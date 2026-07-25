"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type MediaImageProps = Omit<ImageProps, "onLoad" | "onError"> & {
  wrapperClassName?: string;
};

const MediaImage = ({
  wrapperClassName = "",
  className = "",
  alt,
  fill,
  ...props
}: MediaImageProps) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div
      className={[
        "overflow-hidden",
        // `fill` images are absolutely positioned — the wrapper must own the
        // box size (absolute inset-0 in a sized parent, or relative + aspect/h-*).
        fill ? "absolute inset-0" : "relative",
        wrapperClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {status !== "loaded" ? (
        <div className="image-shimmer absolute inset-0" aria-hidden />
      ) : null}

      {status !== "error" ? (
        <Image
          {...props}
          alt={alt}
          fill={fill}
          className={`${className} transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      ) : null}
    </div>
  );
};

export default MediaImage;
