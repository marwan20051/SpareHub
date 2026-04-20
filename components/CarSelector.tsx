"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { carData } from "@/lib/data";

export default function CarSelector() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const brands = Object.keys(carData);
  const models = brand ? Object.keys(carData[brand]) : [];
  const years = brand && model ? carData[brand][model] : [];

  const handleBrandChange = (val: string) => {
    setBrand(val);
    setModel("");
    setYear("");
  };

  const handleModelChange = (val: string) => {
    setModel(val);
    setYear("");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    router.push(`/results?${params.toString()}`);
  };

  return (
    <div
      className="rounded-2xl p-6 w-full max-w-3xl mx-auto"
      style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
    >
      <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Find parts for your car</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Brand */}
        <select
          className="select-field"
          value={brand}
          onChange={(e) => handleBrandChange(e.target.value)}
        >
          <option value="">Select brand</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {/* Model */}
        <select
          className="select-field"
          value={model}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={!brand}
        >
          <option value="">Select model</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Year */}
        <select
          className="select-field"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={!model}
        >
          <option value="">Select year</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="btn-orange flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Find my parts
        </button>
      </div>
    </div>
  );
}
