"use client";

import { useState, useEffect } from "react";
import PartCard from "@/components/PartCard";
import CarSelector from "@/components/CarSelector";
import StatsBar from "@/components/StatsBar";
import CategoryGrid from "@/components/CategoryGrid";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Part } from "@/lib/data";

const TRUST_BADGES = [
  { icon: "🛡️", title: "Verified Suppliers", desc: "Every supplier reviewed and approved" },
  { icon: "⭐", title: "OEM & Aftermarket", desc: "Wide selection across all part types" },
  { icon: "🚚", title: "Cairo & Giza Delivery", desc: "Fast delivery across Greater Cairo" },
];

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
      {/* Hero */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden">
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "50%", left: "60%",
          transform: "translate(-50%,-50%)",
          width: 700, height: 500,
          background: "radial-gradient(ellipse, rgba(232,124,30,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "30%", left: "5%",
          width: 350, height: 350,
          background: "radial-gradient(ellipse, rgba(232,124,30,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="max-w-7xl mx-auto text-center relative">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(232,124,30,0.08)", color: "var(--color-orange)", border: "1px solid rgba(232,124,30,0.18)" }}>
            <span style={{ width: 6, height: 6, background: "var(--color-orange)", borderRadius: "50%", display: "inline-block" }} />
            Egypt&apos;s #1 Car Parts Platform
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 font-display text-white leading-none mb-5"
            style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 800, letterSpacing: "-1px" }}>
            The right part.<br />
            <span style={{ color: "var(--color-orange)" }}>The right price.</span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-up delay-200 text-gray-400 mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 17, maxWidth: 520 }}>
            Find genuine OEM, aftermarket, and imported spare parts for Toyota, Hyundai, Kia, and Nissan — all priced in EGP.
          </p>

          {/* Selector */}
          <div className="animate-fade-up delay-300">
            <CarSelector />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <StatsBar />

      {/* Trust badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="animate-fade-up"
              style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                background: "var(--color-card)", border: "1px solid var(--color-border)",
                borderRadius: 12, padding: "16px 18px",
                animationDelay: `${i * 0.1}s`,
              }}>
              <div style={{ fontSize: 22, lineHeight: 1 }}>{b.icon}</div>
              <div>
                <div style={{ color: "#ddd", fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{b.title}</div>
                <div style={{ color: "#666", fontSize: 12, lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured parts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div style={{ color: "var(--color-orange)", fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>
              Popular picks
            </div>
            <h2 className="font-display text-white" style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>
              Featured Parts
            </h2>
          </div>
          <a href="/results" className="text-sm font-medium flex items-center gap-1.5 transition-colors"
            style={{ color: "var(--color-orange)" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            View all
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        {loading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glow-line" />
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <div style={{ color: "var(--color-orange)", fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>
            Browse by type
          </div>
          <h2 className="font-display text-white" style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.5px", margin: 0 }}>
            Categories
          </h2>
        </div>
        <CategoryGrid />
      </section>
    </div>
  );
}
