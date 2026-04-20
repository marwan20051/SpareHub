"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, egyptianCities } from "@/lib/data";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { isAuthenticated, setShowAuthModal } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  // Redirect to login modal if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, setShowAuthModal]);

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^01[0-9]{9}$/.test(phone.trim())) newErrors.phone = "Enter a valid Egyptian phone number (01XXXXXXXXX)";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city) newErrors.city = "Please select a city";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!validate()) return;

    setProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate order number
    const orderNumber = `SH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Store order info for confirmation page
    const orderData = {
      orderNumber,
      items: items.map((i) => ({
        name: i.part.name,
        brand: i.part.brand,
        price: i.part.price,
        quantity: i.quantity,
        image: i.part.image,
      })),
      subtotal,
      totalItems,
      shipping: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city,
        notes: notes.trim(),
      },
    };

    localStorage.setItem("sparehub_last_order", JSON.stringify(orderData));
    clearCart();
    router.push("/order-confirmed");
  };

  if (!isAuthenticated) {
    return (
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-white mb-2">Sign in required</h1>
        <p className="text-gray-400 mb-8">Please sign in or create an account to proceed with checkout.</p>
        <button onClick={() => setShowAuthModal(true)} className="btn-orange">
          Sign in / Register
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-white mb-2">Checkout</h1>
        <p className="text-sm text-gray-400 mb-8">Complete your order details</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <h2 className="text-lg font-bold text-white mb-6">Shipping information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone number</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">City</label>
                  <select
                    className="select-field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select city</option>
                    {egyptianCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Street address</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Building number, street name, area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Delivery notes (optional)</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Any special instructions for delivery..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ resize: "vertical" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-6 sticky top-24"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <h2 className="text-lg font-bold text-white mb-4">Order summary</h2>

              {/* Items preview */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.part.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ background: "var(--color-surface)" }}>
                      <Image
                        src={item.part.image}
                        alt={item.part.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium truncate">{item.part.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-medium" style={{ color: "var(--color-orange)" }}>
                      {formatPrice(item.part.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: "var(--color-border)" }} />

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
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

              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="btn-orange w-full text-center flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Place order"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order you agree to our terms. This is a demo — no real payment is processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
