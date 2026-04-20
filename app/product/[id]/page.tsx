"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PartCard from "@/components/PartCard";
import { useCart } from "@/context/CartContext";
import { formatPrice, getBadgeClass } from "@/lib/data";
import type { Part } from "@/lib/data";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [part, setPart] = useState<Part | null>(null);
  const [relatedParts, setRelatedParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/parts");
        const data: Part[] = await res.json();
        const found = data.find((p) => p.id === params.id);
        setPart(found || null);

        if (found) {
          // Related parts: same category or same car, exclude current
          const related = data
            .filter(
              (p) =>
                p.id !== found.id &&
                (p.category === found.category || (p.carBrand === found.carBrand && p.carModel === found.carModel))
            )
            .slice(0, 4);
          setRelatedParts(related);
        }
      } catch {
        setPart(null);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!part) return;
    addToCart(part);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-2xl animate-pulse" style={{ background: "var(--color-card)" }} />
          <div className="space-y-4">
            <div className="w-20 h-6 rounded-full animate-pulse" style={{ background: "var(--color-card)" }} />
            <div className="w-full h-8 rounded animate-pulse" style={{ background: "var(--color-card)" }} />
            <div className="w-1/2 h-5 rounded animate-pulse" style={{ background: "var(--color-card)" }} />
            <div className="w-1/3 h-10 rounded animate-pulse" style={{ background: "var(--color-card)" }} />
            <div className="w-full h-20 rounded animate-pulse" style={{ background: "var(--color-card)" }} />
            <div className="w-full h-14 rounded-lg animate-pulse" style={{ background: "var(--color-card)" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!part) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-4xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-white mb-2">Part not found</h1>
        <p className="text-gray-400 mb-6">The part you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <a href="/results" className="btn-orange inline-block">
          Browse all parts
        </a>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <a href="/results" className="hover:text-white transition-colors">Parts</a>
          <span>/</span>
          <a href={`/results?category=${part.category}`} className="hover:text-white transition-colors">{part.category}</a>
          <span>/</span>
          <span className="text-gray-300">{part.name}</span>
        </nav>

        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div
            className="relative aspect-square rounded-2xl overflow-hidden"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
          >
            <Image
              src={part.image}
              alt={part.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {!part.inStock && (
              <div className="absolute top-4 left-4">
                <span className="text-sm font-semibold text-white bg-red-600 px-3 py-1 rounded-full">Out of stock</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Type badge */}
            <div className="mb-3">
              <span className={getBadgeClass(part.type)}>{part.type}</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-white mb-2">{part.name}</h1>

            {/* Brand */}
            <p className="text-base text-gray-400 mb-4">
              by <span className="text-white font-medium">{part.brand}</span>
            </p>

            {/* Price */}
            <p className="price text-3xl mb-6">{formatPrice(part.price)}</p>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: "var(--color-border)" }} />

            {/* Compatibility */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Compatibility</h3>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
                  <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
                  <path d="M5 17H3v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" />
                  <path d="M9 17h6" />
                </svg>
                <span className="text-sm text-white font-medium">
                  {part.carBrand} {part.carModel} ({part.yearFrom}–{part.yearTo})
                </span>
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Category</h3>
              <span className="text-sm text-gray-400">{part.category}</span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Description</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{part.description}</p>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: part.inStock ? "var(--color-oem)" : "#ef4444" }}
              />
              <span className="text-sm" style={{ color: part.inStock ? "var(--color-oem)" : "#ef4444" }}>
                {part.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!part.inStock}
              className="w-full py-4 rounded-xl text-base font-bold text-white transition-all flex items-center justify-center gap-3 mt-auto"
              style={{
                background: added ? "#22c55e" : "var(--color-orange)",
                opacity: part.inStock ? 1 : 0.4,
                cursor: part.inStock ? "pointer" : "not-allowed",
              }}
            >
              {added ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added to cart!
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Related parts */}
        {relatedParts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related parts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedParts.map((rp) => (
                <PartCard key={rp.id} part={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
