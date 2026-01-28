
import React from "react";

export default function ModalElement({ isOpen, onClose, children, className = "" }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-slate-900/40 backdrop-blur-xs z-2000"
        onClick={onClose}
      ></div>

      <div
        className={`fixed z-2001 bg-card transition-all duration-300 shadow-2xl
        md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-max md:w-full md:max-w-125 md:rounded-3xl md:p-7.5
        bottom-0 left-0 w-full h-max rounded-t-3xl p-7.5 animate-in apper_from_buttom md:animate-none ${className}`}
      >
        <div className="md:hidden w-10 h-1.5 bg-border rounded-full mx-auto -mt-2.5 mb-5"></div>
        {children}
      </div>
    </>
  );
}
