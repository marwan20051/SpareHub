"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/data";

interface OrderItem {
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  totalItems: number;
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes: string;
  };
}

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sparehub_last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-5xl mb-4">📦</div>
        <h1 className="text-2xl font-bold text-white mb-2">No order found</h1>
        <p className="text-gray-400 mb-8">It looks like you haven&apos;t placed an order yet.</p>
        <Link href="/" className="btn-orange inline-block">
          Go to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Success icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(34,197,94,0.15)" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-oem)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Success message */}
        <h1 className="text-3xl font-bold text-white mb-3">Your order has been placed!</h1>
        <p className="text-gray-400 mb-2">Thank you for shopping with SpareHub.</p>
        <p className="text-sm text-gray-500 mb-8">
          Order number:{" "}
          <span className="font-mono font-bold" style={{ color: "var(--color-orange)" }}>
            {order.orderNumber}
          </span>
        </p>

        {/* Order summary card */}
        <div
          className="rounded-xl p-6 text-left mb-8"
          style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Order summary</h2>

          {/* Items */}
          <div className="space-y-3 mb-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-gray-400">{item.quantity}×</span>
                  <span className="text-white truncate">{item.name}</span>
                  <span className="text-gray-500 shrink-0">({item.brand})</span>
                </div>
                <span className="font-medium shrink-0" style={{ color: "var(--color-orange)" }}>
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px mb-4" style={{ background: "var(--color-border)" }} />

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span style={{ color: "var(--color-oem)" }}>Free</span>
            </div>
            <div className="h-px" style={{ background: "var(--color-border)" }} />
            <div className="flex justify-between text-base font-bold">
              <span className="text-white">Total</span>
              <span style={{ color: "var(--color-orange)" }}>{formatPrice(order.subtotal)}</span>
            </div>
          </div>

          {/* Shipping info */}
          <div className="h-px mb-4" style={{ background: "var(--color-border)" }} />
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Shipping details</h3>
          <div className="space-y-1 text-sm">
            <p className="text-white">{order.shipping.name}</p>
            <p className="text-gray-400">{order.shipping.phone}</p>
            <p className="text-gray-400">{order.shipping.address}</p>
            <p className="text-gray-400">{order.shipping.city}</p>
            {order.shipping.notes && (
              <p className="text-gray-500 italic mt-2">Note: {order.shipping.notes}</p>
            )}
          </div>
        </div>

        {/* Estimated delivery */}
        <div
          className="rounded-xl p-4 mb-8 flex items-center gap-3 justify-center"
          style={{ background: "rgba(232,124,30,0.08)", border: "1px solid rgba(232,124,30,0.2)" }}
        >
          <span className="text-xl">🚚</span>
          <p className="text-sm" style={{ color: "var(--color-orange)" }}>
            Estimated delivery: 3–5 business days within Egypt
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-orange inline-block">
            Continue shopping
          </Link>
          <Link
            href="/results"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Browse more parts
          </Link>
        </div>
      </div>
    </div>
  );
}
