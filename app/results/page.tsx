"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PartCard from "@/components/PartCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Part } from "@/lib/data";

function ResultsContent() {
  const searchParams = useSearchParams();
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("category") || "");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const brand = searchParams.get("brand") || "";
  const model = searchParams.get("model") || "";
  const year = searchParams.get("year") || "";

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

  // Reset category filter if URL param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategoryFilter(cat);
  }, [searchParams]);

  const filteredParts = useMemo(() => {
    let result = [...parts];

    // Filter by car
    if (brand) {
      result = result.filter((p) => p.carBrand === brand);
    }
    if (model) {
      result = result.filter((p) => p.carModel === model);
    }
    if (year) {
      const y = parseInt(year);
      result = result.filter((p) => y >= p.yearFrom && y <= p.yearTo);
    }

    // Filter by category
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Filter by type
    if (typeFilter) {
      result = result.filter((p) => p.type === typeFilter);
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((p) => p.price >= min && (max ? p.price <= max : true));
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return result;
  }, [parts, brand, model, year, categoryFilter, typeFilter, priceRange, sortBy]);

  const clearFilters = useCallback(() => {
    setCategoryFilter("");
    setTypeFilter("");
    setPriceRange("");
    setSortBy("newest");
  }, []);

  const categories = ["Engine", "Brakes", "Lighting", "Electrical", "Cooling", "Suspension"];
  const types = ["OEM", "Aftermarket", "Imported"];
  const priceRanges = [
    { label: "Under EGP 500", value: "0-500" },
    { label: "EGP 500 – 1,500", value: "500-1500" },
    { label: "EGP 1,500 – 3,000", value: "1500-3000" },
    { label: "EGP 3,000 – 5,000", value: "3000-5000" },
    { label: "EGP 5,000+", value: "5000-0" },
  ];

  const activeFilters = [brand, model, year, categoryFilter, typeFilter, priceRange].filter(Boolean).length;

  // Sidebar content (shared between mobile overlay and desktop)
  const filterSidebar = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
        {activeFilters > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs transition-colors"
            style={{ color: "var(--color-orange)" }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Car info */}
      {brand && (
        <div className="p-3 rounded-lg" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <p className="text-xs text-gray-400 mb-1">Showing parts for</p>
          <p className="text-sm font-medium text-white">
            {brand} {model} {year}
          </p>
        </div>
      )}

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(categoryFilter === cat ? "" : cat)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: categoryFilter === cat ? "rgba(232,124,30,0.1)" : "transparent",
                color: categoryFilter === cat ? "var(--color-orange)" : "var(--color-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Part type</h4>
        <div className="space-y-1">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(typeFilter === type ? "" : type)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: typeFilter === type ? "rgba(232,124,30,0.1)" : "transparent",
                color: typeFilter === type ? "var(--color-orange)" : "var(--color-muted)",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Price range</h4>
        <div className="space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setPriceRange(priceRange === range.value ? "" : range.value)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: priceRange === range.value ? "rgba(232,124,30,0.1)" : "transparent",
                color: priceRange === range.value ? "var(--color-orange)" : "var(--color-muted)",
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {brand ? `Parts for ${brand} ${model} ${year}` : "All parts"}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? "Loading..." : `${filteredParts.length} parts found`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              Filters
              {activeFilters > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--color-orange)" }}>
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              className="select-field w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside
            className="hidden lg:block w-64 shrink-0 rounded-xl p-5 h-fit sticky top-24"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
          >
            {filterSidebar}
          </aside>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div
                className="absolute left-0 top-0 bottom-0 w-72 p-6 overflow-y-auto"
                style={{ background: "var(--color-card)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Filters</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded text-gray-400 hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                {filterSidebar}
              </div>
            </div>
          )}

          {/* Results grid */}
          <div className="flex-1">
            {loading ? (
              <LoadingSkeleton count={8} />
            ) : filteredParts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No parts found</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Try adjusting your filters or search for a different car.
                </p>
                <button onClick={clearFilters} className="btn-orange">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredParts.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton count={8} />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
