import React from "react";

export default function SummaryCard({ title, amount, variant = "default" }) {
  let cardStyles =
    "p-6 rounded-[20px] border border-border shadow-card bg-card";
  let titleStyles = "text-[0.85rem] opacity-80 font-medium";
  let amountStyles = "text-[2rem] mt-1.5 font-extrabold";

  if (variant === "main") {
    cardStyles =
      "p-6 rounded-[20px] border-none shadow-card bg-primary text-white";
  } else if (variant === "income") {
    titleStyles += " text-success";
    amountStyles += " text-success";
  } else if (variant === "outcome") {
    titleStyles += " text-danger";
    amountStyles += " text-danger";
  }

  return (
    <div className={cardStyles}>
      <span className={titleStyles}>{title}</span>
      <h2 className={amountStyles}>{amount}</h2>
    </div>
  );
}
