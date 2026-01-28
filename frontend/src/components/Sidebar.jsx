import React from "react";
import { sidebarElements } from "../data/sidebarElements";
import { Link } from "react-router-dom";

export default function Sidebar({ onAddEntry }) {
  return (
    <nav className="hidden md:flex w-(--sidebar-width) bg-card border-r border-border flex-col py-(--sidebar-padding-y) px-(--sidebar-padding-x) transition-transform duration-300">
      <div className="font-extrabold text-2xl text-primary mb-10 flex items-center gap-2.5">
        Aura
      </div>
      <div className="flex-1 list-none">
        {sidebarElements.map((item) => {
          if (item.mobileOnly) return null;

          if (item.type === "button") {
            return (
              <div
                key={item.id}
                onClick={item.action === "onAddEntry" ? onAddEntry : undefined}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-sub hover:bg-surface hover:text-primary transition-colors duration-200 cursor-pointer mb-2 font-semibold"
              >
                <item.icon size={20} />
                {item.label}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 cursor-pointer mb-2 font-semibold ${item.path === "/" ? "bg-surface text-primary" : "text-text-sub hover:bg-surface hover:text-primary"
                }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
