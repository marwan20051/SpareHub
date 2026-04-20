"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven&apos;t added any parts yet.</p>
        <Link href="/results" className="btn-orange inline-block">
          Browse parts
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-2">Shopping cart</h1>
        <p className="text-sm text-gray-400 mb-8">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.part.id}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shrink-0" style={{ background: "var(--color-surface)" }}>
                  <Image
                    src={item.part.image}
                    alt={item.part.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.part.id}`}
                        className="text-sm sm:text-base font-semibold text-white hover:underline line-clamp-2"
                      >
                        {item.part.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.part.brand} · {item.part.carBrand} {item.part.carModel}
                      </p>
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.part.id)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-auto pt-3">
                    {/* Quantity selector */}
                    <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
                      <button
                        onClick={() => updateQuantity(item.part.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm font-medium text-white" style={{ background: "var(--color-surface)" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.part.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="price text-lg">
                      {formatPrice(item.part.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-6 sticky top-24"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <h2 className="text-lg font-bold text-white mb-6">Order summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-medium" style={{ color: "var(--color-oem)" }}>Free</span>
                </div>
                <div className="h-px" style={{ background: "var(--color-border)" }} />
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-white">Total</span>
                  <span className="price text-xl">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-orange w-full text-center block"
              >
                Proceed to checkout
              </Link>

              <Link
                href="/results"
                className="block mt-3 text-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
