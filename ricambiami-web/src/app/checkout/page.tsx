import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#020817] min-h-[80svh] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/carrello" className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Torna al carrello
          </Link>
          
          <h1 className="text-3xl font-bold text-white tracking-tight mb-8">
            Checkout (In Arrivo)
          </h1>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8 text-[#60A5FA]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Integrazione Pagamenti in corso</h2>
            <p className="text-zinc-400 mb-6">
              Stiamo collegando l'integrazione con Stripe per i pagamenti sicuri. Torna a breve!
            </p>
            <Link
              href="/catalogo"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white/10 px-8 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              Continua gli acquisti
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
