"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, getBadgeClass } from "@/lib/data";
import type { Part } from "@/lib/data";
import { useState } from "react";

interface PartCardProps {
  part: Part;
}

export default function PartCard({ part }: PartCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(part);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={`/product/${part.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        className="card-hover"
        style={{
          background: "var(--color-card)",
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Image container */}
        <div style={{
          position: "relative", width: "100%", paddingTop: "68%",
          background: "var(--color-surface)", overflow: "hidden",
        }}>
          <Image
            src={part.image}
            alt={part.name}
            fill
            className="card-img"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {!part.inStock && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontSize: 12, fontWeight: 700, color: "#fff",
                background: "#ef4444", padding: "4px 12px", borderRadius: 20,
              }}>Out of stock</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
          <span className={getBadgeClass(part.type)}>{part.type}</span>

          <h3 style={{
            color: "#eee", fontSize: 14, fontWeight: 600,
            lineHeight: 1.35, margin: 0,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
            minHeight: "2.7em",
          }}>
            {part.name}
          </h3>

          <p style={{ color: "#555", fontSize: 12, margin: 0 }}>
            {part.brand} · {part.carBrand} {part.carModel}
          </p>

          <p className="price" style={{ fontSize: 18, marginTop: "auto", paddingTop: 8 }}>
            {formatPrice(part.price)}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!part.inStock}
            style={{
              width: "100%",
              padding: "9px 0",
              borderRadius: 8,
              border: `1px solid ${added ? "#22c55e" : "var(--color-orange)"}`,
              background: added ? "rgba(34,197,94,0.1)" : "transparent",
              color: added ? "#22c55e" : "var(--color-orange)",
              fontSize: 13, fontWeight: 600,
              cursor: part.inStock ? "pointer" : "not-allowed",
              opacity: part.inStock ? 1 : 0.35,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              if (!part.inStock || added) return;
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "var(--color-orange)";
              el.style.color = "#fff";
            }}
            onMouseLeave={e => {
              if (!part.inStock || added) return;
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "transparent";
              el.style.color = "var(--color-orange)";
            }}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
