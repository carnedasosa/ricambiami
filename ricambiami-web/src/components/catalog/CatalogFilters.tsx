'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import FilterSidebar from '@/components/catalog/FilterSidebar';

// ─── Props ───────────────────────────────────────────────────────────────────

interface CatalogFiltersProps {
  productCount: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CatalogFilters({ productCount }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // ── Lettura dei parametri correnti ─────────────────────────────────────────

  const currentCategory = searchParams.get('categoria') ?? 'Tutti';
  const currentBrands = searchParams.get('brands')
    ? searchParams.get('brands')!.split(',').filter(Boolean)
    : [];
  const priceMin = Number(searchParams.get('priceMin') ?? 0);
  const priceMax = Number(searchParams.get('priceMax') ?? 500);

  // ── Helper: aggiorna URL con i nuovi params ────────────────────────────────

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || value === 'Tutti') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();
      startTransition(() => {
        router.push(`${pathname}${query ? `?${query}` : ''}`);
      });
    },
    [router, pathname, searchParams],
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCategoryChange = useCallback(
    (cat: string) => {
      updateParams({ categoria: cat, brands: null });
    },
    [updateParams],
  );

  const handleBrandToggle = useCallback(
    (brand: string) => {
      const next = currentBrands.includes(brand)
        ? currentBrands.filter((b) => b !== brand)
        : [...currentBrands, brand];
      updateParams({ brands: next.join(',') });
    },
    [currentBrands, updateParams],
  );

  const handlePriceChange = useCallback(
    (range: [number, number]) => {
      updateParams({
        priceMin: range[0] > 0 ? String(range[0]) : null,
        priceMax: range[1] < 500 ? String(range[1]) : null,
      });
    },
    [updateParams],
  );

  return (
    <div className="relative">
      {/* Overlay di caricamento (transizione in corso) */}
      {isPending && (
        <div className="absolute -top-1 -left-1 z-20 flex items-center gap-1.5 text-xs text-[#60A5FA]">
          <Loader2 size={12} strokeWidth={1.75} className="animate-spin" />
          <span>Aggiornamento…</span>
        </div>
      )}

      <FilterSidebar
        currentCategory={currentCategory}
        currentBrands={currentBrands}
        priceRange={[priceMin, priceMax]}
        onCategoryChange={handleCategoryChange}
        onBrandToggle={handleBrandToggle}
        onPriceChange={handlePriceChange}
        productCount={productCount}
      />
    </div>
  );
}
