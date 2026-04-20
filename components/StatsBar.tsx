export default function StatsBar() {
  const stats = [
    { value: "10,000+", label: "Parts", icon: "🔩" },
    { value: "200+", label: "Suppliers", icon: "🏭" },
    { value: "50+", label: "Models", icon: "🚗" },
    { value: "EGP", label: "Local pricing", icon: "💰" },
  ];

  return (
    <div
      className="w-full py-8"
      style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xl font-bold" style={{ color: "var(--color-orange)" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
