export default function StatsBar() {
  const stats = [
    { value: "35+", label: "Parts listed" },
    { value: "4", label: "Car brands" },
    { value: "8", label: "Car models" },
    { value: "EGP", label: "Local pricing" },
  ];

  return (
    <div style={{
      background: "var(--color-surface)",
      borderTop: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              padding: "20px 16px",
              textAlign: "center",
              borderRight: i < 3 ? "1px solid var(--color-border)" : "none",
            }}>
              <div className="font-display animate-count-up" style={{
                fontSize: 28, fontWeight: 800,
                color: "var(--color-orange)",
                animationDelay: `${i * 0.08}s`,
              }}>
                {stat.value}
              </div>
              <div style={{
                color: "#555", fontSize: 11,
                fontWeight: 600, letterSpacing: "1.5px",
                textTransform: "uppercase", marginTop: 3,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
