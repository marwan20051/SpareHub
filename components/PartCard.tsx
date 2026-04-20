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
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link href={`/product/${part.id}`} className="block">
      <div
        className="card-hover rounded-xl overflow-hidden flex flex-col h-full"
        style={{ background: "var(--color-card)" }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ background: "var(--color-surface)" }}>
          <Image
            src={part.image}
            alt={part.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {!part.inStock && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
              <span className="text-sm font-semibold text-white bg-red-600 px-3 py-1 rounded-full">Out of stock</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          {/* Type badge */}
          <div>
            <span className={getBadgeClass(part.type)}>{part.type}</span>
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 min-h-[2.5rem]">
            {part.name}
          </h3>

          {/* Brand */}
          <p className="text-xs text-gray-400">
            {part.brand} · {part.carBrand} {part.carModel}
          </p>

          {/* Price */}
          <p className="price text-lg mt-auto pt-2">
            {formatPrice(part.price)}
          </p>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!part.inStock}
            className="w-full mt-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
            style={{
              background: added ? "#22c55e" : "var(--color-orange)",
              opacity: part.inStock ? 1 : 0.4,
              cursor: part.inStock ? "pointer" : "not-allowed",
            }}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
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
