export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
        >
          <div
            className="w-full aspect-[4/3] animate-pulse"
            style={{ background: "var(--color-surface)" }}
          />
          <div className="p-4 space-y-3">
            <div className="w-16 h-5 rounded-full animate-pulse" style={{ background: "var(--color-surface)" }} />
            <div className="w-full h-4 rounded animate-pulse" style={{ background: "var(--color-surface)" }} />
            <div className="w-2/3 h-3 rounded animate-pulse" style={{ background: "var(--color-surface)" }} />
            <div className="w-1/3 h-6 rounded animate-pulse" style={{ background: "var(--color-surface)" }} />
            <div className="w-full h-10 rounded-lg animate-pulse" style={{ background: "var(--color-surface)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
