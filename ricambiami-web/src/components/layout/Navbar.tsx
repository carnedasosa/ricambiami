"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Search, Menu, X } from "lucide-react";
import CartButton from "./CartButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl backdrop-saturate-150 bg-white/5 border-b border-white/10" style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-white">
            ricambiami
            <span className="text-[#2563EB]">.it</span>
          </span>
        </Link>

        {/* Nav Links — desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/catalogo/auto" className="hover:text-white transition-colors duration-200">Auto</Link>
          <Link href="/catalogo/moto" className="hover:text-white transition-colors duration-200">Moto</Link>
          <Link href="/catalogo/camion" className="hover:text-white transition-colors duration-200">Camion</Link>
          <Link href="/catalogo" className="hover:text-white transition-colors duration-200">Tutto il catalogo</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button aria-label="Cerca" className="p-2 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200">
            <Search size={20} strokeWidth={1.75} />
          </button>

          <Link href="/account" aria-label="Il mio account" className="hidden sm:flex p-2 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200">
            <User size={20} strokeWidth={1.75} />
          </Link>

          <CartButton />

          {/* Mobile trigger */}
          <button
            aria-label="Apri menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
          >
            {isOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#020817] px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
            <Link onClick={() => setIsOpen(false)} href="/catalogo/auto" className="hover:text-white transition-colors duration-200">Auto</Link>
            <Link onClick={() => setIsOpen(false)} href="/catalogo/moto" className="hover:text-white transition-colors duration-200">Moto</Link>
            <Link onClick={() => setIsOpen(false)} href="/catalogo/camion" className="hover:text-white transition-colors duration-200">Camion</Link>
            <Link onClick={() => setIsOpen(false)} href="/catalogo" className="hover:text-white transition-colors duration-200">Tutto il catalogo</Link>
            <Link onClick={() => setIsOpen(false)} href="/account" className="hover:text-white transition-colors duration-200 sm:hidden">Il mio account</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
