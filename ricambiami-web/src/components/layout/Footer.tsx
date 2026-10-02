import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const categories = [
  { label: "Ricambi Auto", href: "/catalogo/auto" },
  { label: "Ricambi Moto", href: "/catalogo/moto" },
  { label: "Ricambi Camion", href: "/catalogo/camion" },
  { label: "Tutto il catalogo", href: "/catalogo" },
];

const company = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Come funziona", href: "/come-funziona" },
  { label: "Domande frequenti", href: "/faq" },
  { label: "Contatti", href: "/contatti" },
];

const account = [
  { label: "Accedi", href: "/login" },
  { label: "Registrati", href: "/registrati" },
  { label: "I miei ordini", href: "/account/ordini" },
  { label: "Area B2B", href: "/b2b" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#020817] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold tracking-tight text-white">
                ricambiami
                <span className="text-[#2563EB]">.it</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
              Ricambi originali e compatibili per auto, moto e camion. Qualità
              garantita, consegna rapida in tutta Italia e Europa.
            </p>
            <div className="space-y-2 text-sm text-zinc-500">
              <a
                href="tel:+390123456789"
                className="flex items-center gap-2 hover:text-white transition-colors duration-200"
              >
                <Phone size={14} strokeWidth={1.75} />
                +39 012 345 6789
              </a>
              <a
                href="mailto:info@ricambiami.it"
                className="flex items-center gap-2 hover:text-white transition-colors duration-200"
              >
                <Mail size={14} strokeWidth={1.75} />
                info@ricambiami.it
              </a>
            </div>
          </div>

          {/* Categorie */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 mb-4 tracking-widest uppercase">
              Categorie
            </h3>
            <ul className="space-y-3">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 mb-4 tracking-widest uppercase">
              Azienda
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 mb-4 tracking-widest uppercase">
              Account
            </h3>
            <ul className="space-y-3">
              {account.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Ricambiami.it — Tutti i diritti riservati</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/termini" className="hover:text-zinc-300 transition-colors duration-200">
              Termini e Condizioni
            </Link>
            <Link href="/cookie" className="hover:text-zinc-300 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
