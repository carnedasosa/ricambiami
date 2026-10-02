import Link from "next/link";
import {
  ArrowRight,
  Car,
  Truck,
  Bike,
  Shield,
  Zap,
  RotateCcw,
  BadgePercent,
  Search,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TiltCard from "@/components/home/TiltCard";
import Reveal from "@/components/home/Reveal";
import ParticleFieldLazy from "@/components/home/ParticleFieldLazy";


// ─── Dati ─────────────────────────────────────────────────────────────────────

const categories = [
  {
    label: "Auto",
    description:
      "Filtri, freni, ammortizzatori, cinghie di distribuzione e migliaia di componenti per ogni vettura.",
    href: "/catalogo/auto",
    icon: <Car size={26} strokeWidth={1.5} />,
    stat: "12.000+",
    statLabel: "riferimenti disponibili",
  },
  {
    label: "Moto",
    description:
      "Componenti originali e aftermarket per ogni tipo di moto, scooter e enduro.",
    href: "/catalogo/moto",
    icon: <Bike size={26} strokeWidth={1.5} />,
    stat: "4.800+",
    statLabel: "codici in magazzino",
  },
  {
    label: "Camion",
    description:
      "Ricambi per veicoli commerciali leggeri e pesanti, omologati e pronti per il cantiere.",
    href: "/catalogo/camion",
    icon: <Truck size={26} strokeWidth={1.5} />,
    stat: "7.200+",
    statLabel: "pezzi per mezzi pesanti",
  },
];

const benefits = [
  {
    Icon: Shield,
    title: "Qualità Certificata",
    description:
      "Ogni ricambio proviene da fornitori verificati. Nessun compromesso sulla sicurezza del veicolo.",
  },
  {
    Icon: Zap,
    title: "Spedizione 24/48h",
    description:
      "Ordini elaborati in meno di 24 ore. Consegna espressa in 2–4 giorni lavorativi.",
  },
  {
    Icon: BadgePercent,
    title: "Sconto 10% Registrati",
    description:
      "Crea un account gratuito e ottieni il 10% di sconto su tutti gli ordini superiori a 100 €.",
  },
  {
    Icon: RotateCcw,
    title: "Resi Senza Stress",
    description:
      "30 giorni per restituire il prodotto. Nessuna domanda, rimborso garantito.",
  },
];

const popularSearches = [
  "Filtro olio",
  "Pastiglie freno",
  "Ammortizzatori",
  "Cinghia distribuzione",
  "Kit frizione",
  "Candele",
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════════════════════════════════
            HERO — sfondo dark con campo particelle 3D
        ══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#020817]">
          {/* Campo particelle (canvas assoluto) */}
          <ParticleFieldLazy />

          {/* Vignette radiale al centro per far "emergere" il testo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(2,8,23,0) 0%, rgba(2,8,23,0.85) 100%)",
            }}
          />

          {/* Barra luminosa orizzontale in basso */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(37,99,235,0.5) 50%, transparent)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-1.5 text-sm text-[#60A5FA] mb-10 backdrop-blur-sm">
              <BadgePercent size={14} />
              Sconto 10% per utenti registrati su ordini &gt; 100 €
            </div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-8">
              Il ricambio giusto,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #2563EB 0%, #60A5FA 50%, #38BDF8 100%)",
                }}
              >
                al primo colpo.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12">
              Migliaia di ricambi originali per auto, moto e camion. Catalogo
              sincronizzato in tempo reale, prezzi trasparenti, consegna in
              tutta Europa.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
                <input
                  type="search"
                  placeholder="Cerca modello, codice OEM, nome pezzo…"
                  className="w-full h-14 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm pl-11 pr-5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                />
              </div>
              <button className="h-14 px-8 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] active:scale-95 cursor-pointer transition-all duration-200 whitespace-nowrap shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                Cerca ricambio
              </button>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-xs text-zinc-600 self-center">Più cercati:</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/catalogo?q=${encodeURIComponent(term)}`}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:border-[#2563EB]/50 hover:text-[#60A5FA] cursor-pointer transition-all duration-200 backdrop-blur-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          {/* Freccia scroll */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-600" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CATEGORIE — card con tilt 3D su sfondo scuro
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#030D1A] py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mb-16 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
                  Catalogo
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                  Scegli la tua categoria
                </h2>
                <p className="text-zinc-400 text-base">
                  Oltre 24.000 riferimenti sincronizzati quotidianamente con i
                  nostri fornitori.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <Reveal key={cat.label} delay={i * 120} direction="up">
                  <TiltCard {...cat} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            NUMERI — statistiche in evidenza
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#020817] border-y border-white/5 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "24.000+", label: "Ricambi in catalogo" },
                { value: "98%", label: "Ordini spediti entro 24h" },
                { value: "4.9 ★", label: "Valutazione media clienti" },
                { value: "30 giorni", label: "Politica di reso garantita" },
              ].map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 80} direction="up">
                  <div className="text-center">
                    <p
                      className="text-4xl sm:text-5xl font-bold mb-2"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #fff 0%, #60A5FA 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {value}
                    </p>
                    <p className="text-sm text-zinc-500">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            VANTAGGI — 4 pilastri con icone
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#030D1A] py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-20 max-w-xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
                  Perché noi
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  Non uno shop qualunque.
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {benefits.map(({ Icon, title, description }, i) => (
                <Reveal key={title} delay={i * 100} direction="up">
                  <div className="group flex flex-col gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#60A5FA] group-hover:border-[#2563EB]/40 group-hover:bg-[#2563EB]/10 transition-all duration-300">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA B2B — banner full-bleed con glow
        ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-28 bg-[#020817]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Glow blu al centro */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB] mb-6">
                Area Professionale
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                Sei un'officina{" "}
                <span className="text-zinc-400">o un rivenditore?</span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
                Accedi alla nostra area B2B. Ordini professionali, fatturazione
                automatica e condizioni dedicate per i tuoi volumi.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/registrati"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] cursor-pointer transition-colors duration-200 shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                >
                  Crea account gratuito
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/b2b"
                  className="inline-flex items-center justify-center h-14 px-10 rounded-xl border border-white/15 text-white text-sm font-medium hover:bg-white/5 cursor-pointer transition-all duration-200"
                >
                  Scopri l'area B2B
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA FINALE — invito al catalogo
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#030D1A] py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6">
                Inizia a cercare.
              </h2>
              <p className="text-zinc-400 text-lg max-w-lg mx-auto mb-10">
                Oltre 24.000 ricambi pronti. Registrati e ottieni il 10% su ogni
                ordine superiore a 100 €.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-white text-[#09090B] text-sm font-bold hover:bg-zinc-100 cursor-pointer transition-colors duration-200"
                >
                  Vai al catalogo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/registrati"
                  className="inline-flex items-center justify-center h-14 px-10 rounded-xl border border-white/15 text-white text-sm font-medium hover:bg-white/5 cursor-pointer transition-all duration-200"
                >
                  Registrati gratis
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
