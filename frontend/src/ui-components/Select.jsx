import React from "react";

export default function Select({
  label,
  options = [],
  containerClassName = "",
  className = "",
  children,
  ...props
}) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-[0.75rem] font-bold text-text-sub mb-1.25">
          {label}
        </label>
      )}
      <select
        className={`w-full p-3 border border-border rounded-[10px] outline-none font-inherit bg-card focus:border-primary transition-colors duration-200 ${className}`}
        {...props}
      >
        {children
          ? children
          : options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
      </select>
    </div>
  );
}
