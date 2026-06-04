import type { JSX, SVGProps } from "react";

const Moon = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.333 9.386a5.705 5.705 0 01-7.719-7.719 6.418 6.418 0 107.719 7.719z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Moon;