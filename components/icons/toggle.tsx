import type { JSX, SVGProps } from "react";

const Toggle = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
        d="M8 0a8 8 0 00-8 8 8 8 0 008 8c4.42 0 8-3.58 8-8s-3.58-8-8-8zm-.56 3.113h1.12v5.574H7.44V3.113zm.56 8.99A3.91 3.91 0 016.968 4.42v1.14a2.831 2.831 0 00-1.797 2.64 2.83 2.83 0 103.865-2.636V4.42A3.912 3.912 0 018 12.103z"
        fill="currentColor"
      />
  </svg>
);

export default Toggle;