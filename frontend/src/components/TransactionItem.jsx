import React from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import useModalStore from "../contexts/ModalContext";

export default function TransactionItem({ transaction }) {
  const isInc = transaction.type === "income";
  const { setEditModalOpen, setCurrentTransaction } = useModalStore();

  const onClick = () => {
    setEditModalOpen(true);
    setCurrentTransaction(transaction);
  };
    
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-border last:border-none" onClick={onClick}>
      <div className="flex items-center gap-3.75">
        <div className="w-11 h-11 bg-bg rounded-xl flex items-center justify-center text-primary">
          {isInc ? <ArrowUpRight size={20} /> : <ShoppingBag size={20} />}
        </div>
        <div>
          <div className="font-bold text-[0.95rem]">
            {transaction.category}
          </div>
          <div className="text-[0.75rem] text-text-sub">
            {getFormattedDate(transaction.day, transaction.payment_type)}
          </div>
        </div>
      </div>
      <div
        className={`font-extrabold text-[1rem] ${isInc ? "text-success" : "text-danger"}`}
      >
        {isInc ? "+" : "-"}${transaction.money_amount.toFixed(2)}
      </div>
    </div>
  );
}

function getFormattedDate(day, payment_type) {
  if (payment_type === "daily") return "Daily";
  if (payment_type == "once") {
    // Case: YYYY-MM-DD (One time)
    if (/^\d{4}-\d{2}-\d{2}$/.test(day)) {
      const date = new Date(day);
      return `Once on ${date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  if (payment_type == "weekly") {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return `Every ${days[day]}`;
  }

  
  if (payment_type == "monthly") {
    // Case: DD (Monthly)
    if (/^\d{2}$/.test(day)) {
      return `Monthly on the ${parseInt(day)}${getOrdinalSuffix(parseInt(day))}`;
    }
  }
  if (payment_type == "annual") {
    // Case: MM-DD (Yearly)
    if (/^\d{2}-\d{2}$/.test(day)) {
      const [month, date] = day.split("-");
      const dateObj = new Date(2000, parseInt(month) - 1, parseInt(date));
      return `Every ${dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  return day; // Fallback
}

function getOrdinalSuffix(i) {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
