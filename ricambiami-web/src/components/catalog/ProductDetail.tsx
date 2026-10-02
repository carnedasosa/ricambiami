"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  Info,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";

// ── Galeria immagini ──────────────────────────────────────────────────────────
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Immagine principale */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image
          src={images[active]}
          alt={title}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnail */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border cursor-pointer transition-all duration-200 ${
                i === active
                  ? "border-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image src={img} alt={`${title} ${i + 1}`} fill className="object-contain p-2" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quantità selector ─────────────────────────────────────────────────────────
function QuantitySelector({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
}) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 w-fit">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="p-3 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
        aria-label="Diminuisci"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="w-10 text-center text-sm font-semibold text-white tabular-nums">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="p-3 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
        aria-label="Aumenta"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ── Componente principale ─────────────────────────────────────────────────────
interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="bg-[#020817] min-h-screen">
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-white transition-colors duration-200">Catalogo</Link>
          <span>/</span>
          <Link href={`/catalogo/${product.category}`} className="hover:text-white transition-colors duration-200 capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      {/* ── Layout principale ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Colonna immagini */}
          <ImageGallery images={product.images} title={product.title} />

          {/* Colonna info */}
          <div className="flex flex-col gap-8">
            {/* Header prodotto */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {product.isNew && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    Nuovo
                  </span>
                )}
                {product.isBestseller && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/20">
                    Bestseller
                  </span>
                )}
                {discountPct && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                    -{discountPct}%
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-[#60A5FA] mb-2 uppercase tracking-widest">
                {product.brand}
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                {product.title}
              </h1>
              <p className="text-xs font-mono text-zinc-500">SKU: {product.sku}</p>
            </div>

            {/* Prezzo */}
            <div className="flex items-end gap-4">
              <p className="text-5xl font-bold text-white">
                {product.price.toFixed(2).replace(".", ",")} €
              </p>
              {product.originalPrice && (
                <p className="text-xl text-zinc-500 line-through mb-1">
                  {product.originalPrice.toFixed(2).replace(".", ",")} €
                </p>
              )}
            </div>

            {/* Disponibilità */}
            <div className="flex items-center gap-2 text-sm">
              {product.stock > 0 ? (
                <>
                  <CheckCircle size={16} className="text-emerald-400" strokeWidth={2} />
                  <span className="text-emerald-400 font-medium">
                    Disponibile ({product.stock} pezzi)
                  </span>
                </>
              ) : (
                <>
                  <Info size={16} className="text-amber-400" strokeWidth={2} />
                  <span className="text-amber-400 font-medium">Esaurito — richiedi disponibilità</span>
                </>
              )}
            </div>

            {/* Compatibilità */}
            {product.compatibility.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                  Compatibile con
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((car) => (
                    <span
                      key={car}
                      className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-zinc-300"
                    >
                      {car}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="flex items-center gap-4">
              <QuantitySelector value={qty} onChange={setQty} max={product.stock || 99} />

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 h-14 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                  addedToCart
                    ? "bg-emerald-500 text-white"
                    : "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_0_30px_rgba(37,99,235,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle size={18} />
                    Aggiunto!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Aggiungi al carrello
                  </>
                )}
              </button>

              <button
                onClick={() => setIsWishlisted((p) => !p)}
                aria-label="Salva nei preferiti"
                className={`h-14 w-14 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-center ${
                  isWishlisted
                    ? "border-red-500/40 bg-red-500/10 text-red-400"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                <Heart size={20} strokeWidth={1.75} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Garanzie */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { Icon: Shield, label: "Qualità garantita" },
                { Icon: Truck, label: "Spedizione 24/48h" },
                { Icon: RotateCcw, label: "Reso 30 giorni" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center rounded-xl border border-white/8 bg-white/3 p-4">
                  <Icon size={18} strokeWidth={1.5} className="text-[#60A5FA]" />
                  <p className="text-xs text-zinc-500 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Descrizione */}
            <div className="border-t border-white/8 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                Descrizione
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
