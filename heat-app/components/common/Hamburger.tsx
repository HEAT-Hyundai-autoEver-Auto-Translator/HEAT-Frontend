type HamburgerProps = {
  width: string;
  height: string;
  fill: string;
};

export const Hamburger = ({ width, height, fill }: HamburgerProps) => (
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1H13M1 5H13M1 9H13"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
