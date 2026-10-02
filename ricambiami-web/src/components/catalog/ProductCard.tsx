'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { type Product } from '@/lib/products';
import { useCart } from '@/components/cart/CartProvider';

// ── Props ─────────────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
}

// ── Discount Helper ───────────────────────────────────────────────────────────

function discountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const {
    slug,
    category,
    title,
    brand,
    price,
    originalPrice,
    images,
    isNew,
    isBestseller,
    stock,
  } = product;

  const href = `/catalogo/${category}/${slug}`;
  const discount = originalPrice ? discountPercent(originalPrice, price) : null;

  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5
                 transition-all duration-300 overflow-hidden cursor-pointer
                 hover:border-[#2563EB]/40 hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Vedi ${title}`}
    >

      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <div className="relative aspect-square w-full overflow-hidden bg-white/5">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />

        {/* ── Badges (top-left) ────────────────────────────────────────────── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && (
            <span
              className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5
                         text-[11px] font-semibold uppercase tracking-wide text-emerald-400
                         border border-emerald-500/30"
            >
              Nuovo
            </span>
          )}
          {isBestseller && (
            <span
              className="inline-flex items-center gap-1 rounded-full bg-[#2563EB]/20 px-2.5 py-0.5
                         text-[11px] font-semibold uppercase tracking-wide text-[#60A5FA]
                         border border-[#2563EB]/30"
            >
              <Star size={10} strokeWidth={1.75} className="fill-[#60A5FA]" />
              Bestseller
            </span>
          )}
          {discount !== null && (
            <span
              className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5
                         text-[11px] font-semibold tracking-wide text-red-400
                         border border-red-500/30"
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* ── Stock warning (bottom-right) ──────────────────────────────────── */}
        {stock > 0 && stock <= 10 && (
          <span
            className="absolute bottom-3 right-3 rounded-full bg-amber-500/20 px-2.5 py-0.5
                       text-[11px] font-medium text-amber-400 border border-amber-500/30"
          >
            Solo {stock} rimasti
          </span>
        )}

        {/* ── Out of stock overlay ──────────────────────────────────────────── */}
        {stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full border border-white/20 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-400">
              Esaurito
            </span>
          </div>
        )}

        {/* ── Add-to-cart overlay (on hover) ───────────────────────────────── */}
        <div
          className={`absolute inset-x-3 bottom-3 flex justify-center transition-all duration-200
                      ${hovered && stock > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
          aria-hidden={!hovered}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2
                       text-sm font-semibold text-white shadow-lg cursor-pointer
                       transition-colors duration-200 hover:bg-[#1D4ED8] active:scale-95"
          >
            <ShoppingCart size={15} strokeWidth={1.75} />
            Aggiungi al carrello
          </button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2 p-4">

        {/* Brand */}
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          {brand}
        </p>

        {/* Title */}
        <h3
          className="text-sm font-semibold leading-snug text-white line-clamp-2
                     transition-colors duration-200 group-hover:text-[#60A5FA]"
        >
          {title}
        </h3>

        {/* ── Price ──────────────────────────────────────────────────────── */}
        <div className="mt-auto flex items-end gap-2 pt-2">
          <span className="text-lg font-bold text-white">
            {price.toFixed(2).replace('.', ',')} €
          </span>
          {originalPrice && (
            <span className="mb-0.5 text-sm text-zinc-500 line-through">
              {originalPrice.toFixed(2).replace('.', ',')} €
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
