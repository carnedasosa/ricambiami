import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { loginAction } from '@/app/(auth)/actions';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Accedi — Ricambiami.it',
  description: 'Accedi al tuo account Ricambiami.it e ottieni il 10% di sconto su ordini superiori a 100€.',
};

interface PageProps {
  searchParams: Promise<{ error?: string; redirect?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const error = params.error;
  const redirectTo = params.redirect ?? '/account';

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#020817] min-h-[80svh] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8">
              <span className="text-2xl font-bold text-white">
                ricambiami<span className="text-[#2563EB]">.it</span>
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Bentornato
            </h1>
            <p className="text-zinc-400 text-sm">
              Accedi per sbloccare il{' '}
              <span className="text-[#60A5FA] font-medium">10% di sconto</span>{' '}
              su ordini superiori a 100&nbsp;€.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8">

            {/* Errore */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/8 p-4 mb-6">
                <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" strokeWidth={1.75} />
                <p className="text-sm text-red-300">{decodeURIComponent(error)}</p>
              </div>
            )}

            <form action={loginAction}>
              {/* Hidden redirect field */}
              <input type="hidden" name="redirect" value={redirectTo} />

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="tua@email.it"
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Password
                    </label>
                    <Link href="/recupera-password" className="text-xs text-[#60A5FA] hover:text-white transition-colors duration-200">
                      Hai dimenticato la password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#2563EB] text-white text-sm font-bold hover:bg-[#1D4ED8] active:scale-[0.98] cursor-pointer transition-all duration-200 shadow-[0_0_24px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2"
                >
                  Accedi
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-zinc-600">oppure</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Link registrazione */}
            <p className="text-center text-sm text-zinc-500">
              Non hai ancora un account?{' '}
              <Link href="/registrati" className="text-[#60A5FA] font-medium hover:text-white transition-colors duration-200">
                Registrati gratis
              </Link>
            </p>
          </div>

          {/* Trust badge */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-zinc-600">
            <ShieldCheck size={14} strokeWidth={1.75} />
            <span>Connessione sicura • Nessuna carta richiesta</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
