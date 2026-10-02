'use client';

import { X } from 'lucide-react';
import { BRANDS } from '@/lib/products';

// ─── Props ───────────────────────────────────────────────────────────────────

interface FilterSidebarProps {
  currentCategory?: string;
  currentBrands: string[];
  priceRange: [number, number];
  onCategoryChange: (cat: string) => void;
  onBrandToggle: (brand: string) => void;
  onPriceChange: (range: [number, number]) => void;
  productCount: number;
}

const CATEGORIES = ['Tutti', 'Auto', 'Moto', 'Camion'] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function FilterSidebar({
  currentCategory = 'Tutti',
  currentBrands,
  priceRange,
  onCategoryChange,
  onBrandToggle,
  onPriceChange,
  productCount,
}: FilterSidebarProps) {
  const hasActiveFilters =
    currentCategory !== 'Tutti' ||
    currentBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500;

  function handleReset() {
    onCategoryChange('Tutti');
    // reset brands one by one
    currentBrands.forEach((b) => onBrandToggle(b));
    onPriceChange([0, 500]);
  }

  return (
    /* Visibile ovunque, su mobile prende tutta la larghezza */
    <aside className="flex flex-col gap-6 w-full md:w-60 shrink-0">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Filtri</h2>
        <span className="text-xs text-zinc-500">
          {productCount} {productCount === 1 ? 'risultato' : 'risultati'}
        </span>
      </div>

      {/* ── Categoria ── */}
      <section className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Categoria
        </p>
        <ul className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="categoria"
                  value={cat}
                  checked={currentCategory === cat}
                  onChange={() => onCategoryChange(cat)}
                  className="accent-[#2563EB] h-4 w-4 cursor-pointer"
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200">
                  {cat}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <div className="h-px bg-white/8" />

      {/* ── Brand ── */}
      <section className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Brand
        </p>
        <ul className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <li key={brand}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  value={brand}
                  checked={currentBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                  className="accent-[#2563EB] h-4 w-4 rounded cursor-pointer"
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors duration-200">
                  {brand}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <div className="h-px bg-white/8" />

      {/* ── Prezzo ── */}
      <section className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Prezzo (€)
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs text-zinc-600 mb-1 block">Min</label>
            <input
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) =>
                onPriceChange([Number(e.target.value), priceRange[1]])
              }
              className="w-full h-8 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs text-white
                         placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#2563EB]
                         focus:border-transparent transition-all duration-200"
            />
          </div>
          <span className="text-zinc-600 text-xs mt-4">—</span>
          <div className="flex-1">
            <label className="text-xs text-zinc-600 mb-1 block">Max</label>
            <input
              type="number"
              min={priceRange[0]}
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], Number(e.target.value)])
              }
              className="w-full h-8 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs text-white
                         placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#2563EB]
                         focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </section>

      {/* ── Reset ── */}
      {hasActiveFilters && (
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-1.5 w-full h-9 rounded-lg border border-white/10
                     text-xs text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all duration-200"
        >
          <X size={13} strokeWidth={1.75} />
          Azzera filtri
        </button>
      )}
    </aside>
  );
}
