import React from "react";
import TransactionItem from "./TransactionItem";
import useTransactions from "../contexts/TransactionsContext";

export default function TransactionList() {
  const { transactions } = useTransactions();

  return (
    <div className="bg-card rounded-[20px] border border-border overflow-hidden">
      {transactions.length === 0 ? (
        <div className="p-10 text-center text-text-sub">
          No transactions recorded yet.
        </div>
      ) : (
        transactions.map((t, index) => (
          <TransactionItem key={index} transaction={t} />
        ))
      )}
    </div>
  );
}
