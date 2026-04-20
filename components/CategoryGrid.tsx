import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/results?category=${cat.name}`}
          className="group card-hover rounded-xl p-6 flex flex-col items-center text-center gap-3"
          style={{ background: "var(--color-card)" }}
        >
          <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
            {cat.icon}
          </span>
          <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
        </Link>
      ))}
    </div>
  );
}
