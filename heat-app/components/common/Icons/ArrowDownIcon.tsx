interface ArrowDownIconProps {
  width?: string;
  height?: string;
  className?: string;
}

const ArrowDownIcon = ({
  width = '100%',
  height = '100%',
  className,
}: ArrowDownIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00011 4.97656L10.1251 0.851562L11.3034 2.0299L6.00011 7.33323L0.696777 2.0299L1.87511 0.851562L6.00011 4.97656Z"
        fill="#2D3748"
      />
    </svg>
  );
};

export default ArrowDownIcon;
