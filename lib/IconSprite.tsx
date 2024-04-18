import React from "react";
import Icons from "@/assets/icons/icons.svg";

interface IconProps {
  name: string;
  color?: string;
  size: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => (
  <svg
    className={`icon icon-${name} ${className}`}
    fill={color}
    width={size}
    height={size}
  >
    <use xlinkHref={`${Icons.src}#icon-${name}`} />
  </svg>
);

export default Icon;
