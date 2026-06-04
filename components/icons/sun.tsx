import type { JSX, SVGProps } from "react";

const Sun = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.333 8a3.333 3.333 0 11-6.666 0 3.333 3.333 0 016.666 0z"
      stroke="currentColor"
    />
    <path
      d="M8 1.333v1m0 11.333v1m4.714-1.952l-.707-.707M3.993 3.993l-.707-.708M14.666 8h-1M2.334 8h-1m11.381-4.715l-.707.708m-8.014 8.014l-.707.707"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export default Sun;