import React from "react";
import { CircularProgress } from "@mui/material";

export default function Button({
  children,
  isLoading=false,
  variant = "primary",
  className = "",
  ...props
}) {
  let baseStyles =
    "font-bold rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-center outline-none";

  if (isLoading) {
    variant = "outline";
    props.onChange = () => {};
    baseStyles += " !bg-surface";
    props.disabled = true;
    children = <CircularProgress size={20} color="inherit" />;
  }

  const variants = {
    primary: "bg-primary text-white border-none hover:opacity-90",
    secondary: "bg-surface text-primary border-none hover:bg-border",
    ghost:
      "bg-transparent text-text-sub border-none hover:text-text hover:bg-surface",
    danger: "bg-transparent text-danger border-none hover:bg-surface",
    outline: "bg-transparent border border-border text-text hover:bg-surface",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
