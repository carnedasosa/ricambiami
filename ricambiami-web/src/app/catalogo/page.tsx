import { Suspense } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, ChevronRight, PackageSearch } from 'lucide-react';
import type { Metadata } from 'next';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/home/Reveal';
import ProductCard from '@/components/catalog/ProductCard';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import SortSelect from '@/components/catalog/SortSelect';
import { filterProducts } from '@/lib/products';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Catalogo ricambi | ricambiami.it',
  description:
    'Esplora il catalogo completo di ricambi auto, moto e camion. Filtra per brand, categoria e prezzo.',
};

// ─── Tipi searchParams ────────────────────────────────────────────────────────

interface CatalogoPageProps {
  searchParams: Promise<{
    categoria?: string;
    brands?: string;
    priceMin?: string;
    priceMax?: string;
    q?: string;
    sort?: string;
  }>;
}

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;

  // ── Parsing dei filtri ────────────────────────────────────────────────────

  const categoria = params.categoria ?? 'Tutti';
  const brands = params.brands ? params.brands.split(',').filter(Boolean) : [];
  const priceMin = params.priceMin ? Number(params.priceMin) : undefined;
  const priceMax = params.priceMax ? Number(params.priceMax) : undefined;
  const q = params.q ?? '';
  const sort = params.sort ?? 'rilevanza';

  // ── Filtraggio lato server ────────────────────────────────────────────────

  let products = filterProducts({ categoria, brands, priceMin, priceMax, q });

  // Ordinamento
  if (sort === 'prezzo-asc') {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === 'prezzo-desc') {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (sort === 'valutazione') {
    products = [...products].sort((a, b) => b.rating - a.rating);
  }

  const count = products.length;

  // ── Label breadcrumb ──────────────────────────────────────────────────────
  const breadcrumbCategory =
    categoria && categoria !== 'Tutti' ? categoria : null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#020817]">
        {/* ── Hero banner compatto ──────────────────────────────────────── */}
        <section className="relative h-48 flex flex-col justify-end overflow-hidden bg-[#030D1A] border-b border-white/8">
          {/* Linea blu in basso */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(37,99,235,0.5) 50%, transparent)',
            }}
          />

          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-600 mb-3">
              <Link href="/" className="hover:text-zinc-400 transition-colors duration-200">
                Home
              </Link>
              <ChevronRight size={12} strokeWidth={1.75} />
              <Link
                href="/catalogo"
                className="hover:text-zinc-400 transition-colors duration-200"
              >
                Catalogo
              </Link>
              {breadcrumbCategory && (
                <>
                  <ChevronRight size={12} strokeWidth={1.75} />
                  <span className="text-zinc-400">{breadcrumbCategory}</span>
                </>
              )}
              {q && (
                <>
                  <ChevronRight size={12} strokeWidth={1.75} />
                  <span className="text-zinc-400">"{q}"</span>
                </>
              )}
            </nav>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              {q
                ? `Risultati per "${q}"`
                : breadcrumbCategory
                  ? breadcrumbCategory
                  : 'Tutto il catalogo'}
            </h1>
          </div>
        </section>

        {/* ── Layout principale ──────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-10 items-start">
            {/* ── Sidebar filtri (sticky) ──────────────────────────────── */}
            <div className="sticky top-24">
              {/*
                CatalogFilters è client: usa useSearchParams per leggere i
                parametri correnti e router.push per aggiornarli.
                Suspense necessario perché useSearchParams richiede un boundary.
              */}
              <Suspense
                fallback={
                  <div className="hidden md:block w-60 animate-pulse">
                    <div className="h-4 w-24 rounded bg-white/5 mb-6" />
                    <div className="space-y-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-3 w-full rounded bg-white/5" />
                      ))}
                    </div>
                  </div>
                }
              >
                <CatalogFilters productCount={count} />
              </Suspense>
            </div>

            {/* ── Griglia prodotti ─────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Barra superiore: count + ordinamento */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <SlidersHorizontal size={14} strokeWidth={1.75} />
                  <span>
                    <span className="text-white font-medium">{count}</span>{' '}
                    {count === 1 ? 'prodotto trovato' : 'prodotti trovati'}
                  </span>
                </div>

                {/* Sort select */}
                <form>
                  {/* Preserva gli altri searchParams nel form */}
                  {params.categoria && (
                    <input type="hidden" name="categoria" value={params.categoria} />
                  )}
                  {params.brands && (
                    <input type="hidden" name="brands" value={params.brands} />
                  )}
                  {params.priceMin && (
                    <input type="hidden" name="priceMin" value={params.priceMin} />
                  )}
                  {params.priceMax && (
                    <input type="hidden" name="priceMax" value={params.priceMax} />
                  )}
                  {params.q && (
                    <input type="hidden" name="q" value={params.q} />
                  )}

                  <SortSelect defaultValue={sort} />
                </form>
              </div>

              {/* Grid o stato vuoto */}
              {count === 0 ? (
                <Reveal>
                  <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                    <PackageSearch
                      size={48}
                      strokeWidth={1.5}
                      className="text-zinc-700"
                    />
                    <p className="text-lg font-medium text-white">
                      Nessun prodotto trovato
                    </p>
                    <p className="text-sm text-zinc-500 max-w-xs">
                      Prova a modificare i filtri o a usare termini di ricerca
                      più generici.
                    </p>
                    <Link
                      href="/catalogo"
                      className="mt-2 inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-[#2563EB] text-white text-sm font-medium
                                 hover:bg-[#1D4ED8] cursor-pointer transition-colors duration-200"
                    >
                      Azzera filtri
                    </Link>
                  </div>
                </Reveal>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product, i) => (
                    <Reveal key={product.id} delay={i * 40} direction="up">
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
