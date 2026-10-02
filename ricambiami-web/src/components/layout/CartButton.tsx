'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  // Evita l'hydration mismatch tra server (dove il localStorage è vuoto) e client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/carrello"
      aria-label="Carrello"
      className="relative p-2 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
    >
      <ShoppingCart size={20} strokeWidth={1.75} />
      
      {/* Badge quantità (mostrato solo lato client dopo il mount) */}
      {mounted && totalItems > 0 && (
        <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#2563EB] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-[#020817]">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
