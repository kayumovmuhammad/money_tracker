import React from "react";

export default function Input({
  label,
  containerClassName = "",
  className = "",
  ...props
}) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-[0.75rem] font-bold text-text-sub mb-1.25">
          {label}
        </label>
      )}
      <input
        className={`w-full p-3 border border-border rounded-[10px] outline-none font-inherit bg-card focus:border-primary transition-colors duration-200 ${className}`}
        {...props}
      />
    </div>
  );
}
