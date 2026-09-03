"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

interface DateSelectorProps {
  lang: string;
  onDateSelected: (date: Date) => void;
}

export function DateSelector({ lang, onDateSelected }: DateSelectorProps) {
  const [date, setDate] = useState<string>("");
  const isEn = lang === "en";

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDate(val);
    if (val) {
      onDateSelected(new Date(val));
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center py-12 px-6">
      <h2 className="text-3xl md:text-4xl font-serif text-text-dark text-center mb-6">
        {isEn ? "When is your celebration?" : "Quando será sua celebração?"}
      </h2>
      
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Calendar className="text-primary" size={20} />
        </div>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-white border border-brand-border rounded-xl py-4 pl-12 pr-4 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg cursor-pointer"
        />
        
        {!date && (
          <div className="absolute inset-0 flex items-center left-12 pointer-events-none text-soft-text text-lg bg-white right-4 py-4 rounded-r-xl">
            {isEn ? "SELECT DATE" : "ESCOLHER DATA"}
          </div>
        )}
      </div>
    </div>
  );
}
