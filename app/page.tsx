"use client";

import { useState, useEffect } from "react";
import PartCard from "@/components/PartCard";
import CarSelector from "@/components/CarSelector";
import StatsBar from "@/components/StatsBar";
import CategoryGrid from "@/components/CategoryGrid";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Part } from "@/lib/data";

export default function HomePage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadParts() {
      try {
        const res = await fetch("/api/parts");
        const data = await res.json();
        setParts(data);
      } catch {
        setParts([]);
      } finally {
        setLoading(false);
      }
    }
    loadParts();
  }, []);

  const featured = parts.filter((p) => p.inStock).slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section
        className="relative pt-16 pb-20 px-4"
        style={{
          background: "linear-gradient(180deg, rgba(232,124,30,0.08) 0%, transparent 60%)",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(232,124,30,0.1)", color: "var(--color-orange)", border: "1px solid rgba(232,124,30,0.2)" }}>
            🇪🇬 Egypt&apos;s #1 car parts platform
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            The right part.{" "}
            <span style={{ color: "var(--color-orange)" }}>The right price.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse thousands of genuine OEM, aftermarket, and imported spare parts for
            Toyota, Hyundai, Kia, and Nissan vehicles — all priced in EGP with fast
            delivery across Egypt.
          </p>

          {/* Car selector */}
          <CarSelector />
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar />

      {/* Featured parts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured parts</h2>
            <p className="text-sm text-gray-400 mt-1">Top picks for popular Egyptian cars</p>
          </div>
          <a
            href="/results"
            className="text-sm font-medium flex items-center gap-1 transition-colors"
            style={{ color: "var(--color-orange)" }}
          >
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        {loading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        )}
      </section>

      {/* Browse by category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Browse by category</h2>
          <p className="text-sm text-gray-400 mt-1">Find exactly what your car needs</p>
        </div>
        <CategoryGrid />
      </section>
    </div>
  );
}
