import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-lg"
                style={{ background: "var(--color-orange)" }}
              >
                S
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SPARE<span style={{ color: "var(--color-orange)" }}>HUB</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Egypt&apos;s trusted marketplace for genuine and aftermarket car spare parts.
              Quality parts at competitive prices.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All parts
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              {["Engine", "Brakes", "Lighting", "Electrical", "Cooling", "Suspension"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/results?category=${cat}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +20 100 123 4567
              </li>
              <li className="text-sm text-gray-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                support@sparehub.eg
              </li>
              <li className="text-sm text-gray-400 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2024 SpareHub. All rights reserved. This is a demo project.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Made for the Egyptian market 🇪🇬</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
