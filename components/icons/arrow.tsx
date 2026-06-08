import type { JSX, SVGProps } from "react";

const Arrow = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={9}
    height={9}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.539.192a.48.48 0 00-.383-.19L2.4 0a.48.48 0 100 .96L7 .96l-6.86 6.86a.48.48 0 00.678.68l6.857-6.857.002 4.592a.48.48 0 00.96 0L8.636.52A.479.479 0 008.54.192z"
      fill="currentColor"
    />
  </svg>
);

export default Arrow;