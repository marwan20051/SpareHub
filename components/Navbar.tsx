"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: "rgba(17,17,17,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ background: "var(--color-orange)" }}>
              S
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              SPARE<span style={{ color: "var(--color-orange)" }}>HUB</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/results" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              All parts
            </Link>
            <Link href="/cart" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Cart
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-400">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : null}

            {/* Cart pill */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "var(--color-orange)" }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/results"
                className="text-sm font-medium text-gray-300 hover:text-white px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                All parts
              </Link>
              <Link
                href="/cart"
                className="text-sm font-medium text-gray-300 hover:text-white px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
              {isAuthenticated && user && (
                <>
                  <span className="text-sm text-gray-400 px-2">Hi, {user.name}</span>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-sm text-gray-400 hover:text-white text-left px-2 py-1"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
