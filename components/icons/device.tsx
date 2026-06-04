import type { JSX, SVGProps } from "react";

const Device = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 11.333H5.333c-1.885 0-2.828 0-3.414-.585-.586-.586-.586-1.53-.586-3.415V6c0-1.886 0-2.828.586-3.414C2.505 2 3.448 2 5.333 2h5.334c1.885 0 2.828 0 3.414.586.55.55.584 1.415.586 3.08"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.666 9.333V12c0 .943 0 1.414.293 1.707.293.293.765.293 1.707.293.943 0 1.415 0 1.708-.293.292-.293.292-.764.292-1.707V9.333c0-.943 0-1.414-.292-1.707-.293-.293-.765-.293-1.708-.293-.942 0-1.414 0-1.707.293-.293.293-.293.764-.293 1.707zM6.667 14H5.334m1.333 0a1 1 0 001-1v-1.667H8M6.667 14h1.667v-2.667H8m0 0V14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Device;