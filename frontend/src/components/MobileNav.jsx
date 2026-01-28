import React from "react";
import { sidebarElements } from "../data/sidebarElements";
import { Link } from "react-router-dom";

export default function MobileNav({ onAddEntry }) {
  return (
    <nav className="fixed bottom-0 w-full bg-card border-t border-border flex justify-around px-2.5 pt-3.75 pb-[calc(15px+env(safe-area-inset-bottom))] z-50 md:hidden">
      {sidebarElements.map((item) => {
        const Icon = item.mobileIcon || item.icon;
        const label = item.mobileLabel !== undefined ? item.mobileLabel : item.label;

        if (item.special) {
          return (
            <div
              key={item.id}
              onClick={item.action === "onAddEntry" ? onAddEntry : undefined}
              className="w-15 h-15 bg-primary text-white rounded-full flex items-center justify-center -mt-10 border-[2px] border-bg shadow-[0_10px_20px_rgba(99,102,241,0.3)] cursor-pointer"
            >
              <Icon size={32} />
            </div>
          );
        }

        return (
          <Link
            key={item.id}
            to={item.path}
            className="flex flex-col items-center text-[10px] text-text-sub gap-1.25 cursor-pointer"
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
