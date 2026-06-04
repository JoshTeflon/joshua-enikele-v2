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
      d="M4.667 6.667v4.667M7.333 8.667v2.667m0-2.667a2 2 0 114 0v2.667m-4-2.667v-2M4.75 4.5h-.083m.166 0a.167.167 0 11-.333 0 .167.167 0 01.333 0z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2c2.828 0 4.243 0 5.121.879C14 3.757 14 5.172 14 8c0 2.828 0 4.243-.879 5.121C12.243 14 10.828 14 8 14c-2.828 0-4.243 0-5.121-.879C2 12.243 2 10.828 2 8z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Linkedin;