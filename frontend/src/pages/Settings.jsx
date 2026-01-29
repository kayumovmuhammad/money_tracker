import React from "react";
import Layout from "./Layout";
import useSettingsStore from "../contexts/SettingsContext";

function SettingsContent() {
  const { currency, setCurrency } = useSettingsStore();

  const currencies = [
    { code: "USD", label: "US Dollar ($)" },
    { code: "TJS", label: "Tajikistani Somoni (SM)" },
    { code: "RUB", label: "Russian Ruble (₽)" },
    { code: "EUR", label: "Euro (€)" },
    { code: "UZS", label: "Uzbekistani Som (UZS)" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="currency-select" className="text-sm text-text-sub font-medium">
            Currency
          </label>
          <select
            id="currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full sm:w-64 bg-bg border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-text-sub mt-1">
            Select the currency to display throughout the application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  return <Layout>{ { element: SettingsContent } }</Layout>;
}
