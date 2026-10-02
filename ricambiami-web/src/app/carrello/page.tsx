'use client';

import { useCart } from '@/components/cart/CartProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Controllo se l'utente è loggato per calcolare lo sconto B2C/B2B
    const checkAuth = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    checkAuth();
  }, []);

  if (!isMounted) return null; // Previene mismatch HTML

  const hasDiscount = isLoggedIn && subtotal >= 100;
  const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
  const finalTotal = subtotal - discountAmount;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#020817] min-h-[80svh] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-8">
            Il tuo Carrello
          </h1>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Il carrello è vuoto</h2>
              <p className="text-zinc-400 mb-6">Non hai ancora aggiunto prodotti al carrello.</p>
              <Link
                href="/catalogo"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2563EB] px-8 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] shadow-[0_0_24px_rgba(37,99,235,0.35)]"
              >
                Vai al catalogo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lista prodotti */}
              <div className="lg:col-span-8 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    {/* Immagine */}
                    <Link
                      href={`/catalogo/${item.category}/${item.slug}`}
                      className="relative h-24 w-24 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </Link>

                    {/* Dettagli */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#60A5FA] uppercase tracking-widest mb-1">
                        {item.brand}
                      </p>
                      <Link href={`/catalogo/${item.category}/${item.slug}`} className="hover:underline">
                        <h3 className="text-base font-medium text-white truncate">{item.title}</h3>
                      </Link>
                      <p className="text-sm text-zinc-500 font-mono mt-1">SKU: {item.sku}</p>
                    </div>

                    {/* Controlli prezzo e quantità */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto gap-4">
                      <p className="text-lg font-bold text-white">
                        €{(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-white/10 bg-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-white">
                            {item.cartQuantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
                          aria-label="Rimuovi prodotto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Box riepilogo */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h2 className="text-lg font-bold text-white mb-6">Riepilogo ordine</h2>
                  
                  <div className="space-y-3 text-sm text-zinc-400 border-b border-white/10 pb-4 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotale ({totalItems} articoli)</span>
                      <span className="text-white">€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spedizione</span>
                      <span className="text-emerald-400">Gratis</span>
                    </div>
                    
                    {/* Logica sconto */}
                    {!isLoggedIn ? (
                      <div className="rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-3 mt-4">
                        <p className="text-xs">
                          <Link href="/login?redirect=/carrello" className="text-[#60A5FA] font-bold hover:underline">Accedi</Link> o{' '}
                          <Link href="/registrati" className="text-[#60A5FA] font-bold hover:underline">Registrati</Link>{' '}
                          per ottenere il <strong>10% di sconto</strong> su ordini &gt; 100€.
                        </p>
                      </div>
                    ) : hasDiscount ? (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Sconto cliente (10%)</span>
                        <span>-€{discountAmount.toFixed(2)}</span>
                      </div>
                    ) : (
                      <div className="text-xs text-zinc-500 mt-2">
                        Aggiungi €{(100 - subtotal).toFixed(2)} per sbloccare il 10% di sconto.
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-end mb-6">
                    <span className="text-base text-zinc-300">Totale</span>
                    <div className="text-right">
                      {hasDiscount && (
                        <p className="text-sm text-zinc-500 line-through mb-1">
                          €{subtotal.toFixed(2)}
                        </p>
                      )}
                      <span className="text-3xl font-bold text-white">
                        €{finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full h-12 rounded-xl bg-[#2563EB] text-white text-sm font-bold hover:bg-[#1D4ED8] active:scale-[0.98] transition-all duration-200 shadow-[0_0_24px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2"
                  >
                    Procedi al pagamento
                    <ArrowRight size={16} strokeWidth={2} />
                  </Link>

                  <div className="flex items-center justify-center gap-2 mt-6 text-xs text-zinc-500">
                    <ShieldCheck size={14} />
                    <span>Pagamento sicuro con Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
