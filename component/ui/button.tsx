"use client";
import { ButtonProps } from "@/types/ui/button";
import { motion } from "motion/react";

export const ButtonComp = ({
  children,
  icon,
  type = "button",
  onClick,
  className,
  text,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {icon && icon}
      {text}
    </motion.button>
  );
};
