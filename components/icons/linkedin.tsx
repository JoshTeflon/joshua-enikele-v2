import type { JSX, SVGProps } from "react";

const Linkedin = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 16h-3.536v-5.625c0-1.472-.553-2.477-1.77-2.477-.93 0-1.447.678-1.688 1.332-.09.234-.077.561-.077.888V16H5.426s.045-9.964 0-10.87H8.93v1.707c.208-.746 1.327-1.81 3.113-1.81C14.258 5.026 16 6.59 16 9.956V16zM1.884 3.771H1.86C.732 3.771 0 2.941 0 1.887 0 .814.753 0 1.905 0c1.15 0 1.858.812 1.88 1.884 0 1.053-.73 1.887-1.901 1.887zm-1.48 1.36h3.118V16H.404V5.13z"
      fill="currentColor"
    />
  </svg>
);

export default Linkedin;