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
    <nav
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: "rgba(13,13,13,0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "var(--color-orange)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(232,124,30,0.5)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="font-display text-white" style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2 }}>
              SPARE<span style={{ color: "var(--color-orange)" }}>HUB</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[["Home", "/"], ["All Parts", "/results"]].map(([label, href]) => (
              <Link key={href} href={href}
                className="nav-link-animated text-sm font-medium text-gray-400"
                style={{ textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-500">Hi, {user.name.split(" ")[0]}</span>
                <button onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-300">
                  Logout
                </button>
              </div>
            ) : null}

            {/* Cart */}
            <Link href="/cart" style={{
              position: "relative", display: "flex", alignItems: "center", gap: 8,
              padding: "7px 16px", borderRadius: 8, textDecoration: "none",
              background: "var(--color-card)", border: "1px solid var(--color-border)",
              color: "#ddd", fontSize: 14, fontWeight: 500,
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-orange)";
                el.style.boxShadow = "0 0 16px rgba(232,124,30,0.2)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--color-border)";
                el.style.boxShadow = "none";
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
              {totalItems > 0 && (
                <span style={{
                  position: "absolute", top: -7, right: -7,
                  width: 19, height: 19, borderRadius: "50%",
                  background: "var(--color-orange)", color: "#fff",
                  fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-slide-down py-4 border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex flex-col gap-3">
              {[["Home", "/"], ["All Parts", "/results"], ["Cart", "/cart"]].map(([label, href]) => (
                <Link key={href} href={href}
                  className="text-sm font-medium text-gray-300 hover:text-white px-2 py-1"
                  style={{ textDecoration: "none" }}
                  onClick={() => setMobileMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              {isAuthenticated && user && (
                <>
                  <span className="text-sm text-gray-500 px-2">Hi, {user.name}</span>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-sm text-gray-500 hover:text-white text-left px-2 py-1">
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
