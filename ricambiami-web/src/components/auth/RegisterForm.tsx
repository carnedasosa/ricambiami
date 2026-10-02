'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, AlertCircle, Building2, User } from 'lucide-react';
import { registerAction } from '@/app/(auth)/actions';

// ─── Tipo di account ──────────────────────────────────────────────────────────

type AccountType = 'b2c' | 'b2b';

// ─── Componente ───────────────────────────────────────────────────────────────

export default function RegisterForm({ error }: { error?: string }) {
  const [accountType, setAccountType] = useState<AccountType>('b2c');

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-8">
          <span className="text-2xl font-bold text-white">
            ricambiami<span className="text-[#2563EB]">.it</span>
          </span>
        </Link>
        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Crea il tuo account
        </h1>
        <p className="text-zinc-400 text-sm">
          Gratuito. Ottieni subito il{' '}
          <span className="text-[#60A5FA] font-medium">10% di sconto</span>{' '}
          su tutti gli ordini &gt; 100&nbsp;€.
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

        {/* Tipo account */}
        <div className="mb-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">
            Tipo di account
          </p>
          <div className="grid grid-cols-2 gap-3">
            {([
              { type: 'b2c' as AccountType, Icon: User, label: 'Privato', desc: 'Acquisto personale' },
              { type: 'b2b' as AccountType, Icon: Building2, label: 'Azienda / Officina', desc: 'Fatturazione B2B' },
            ] as const).map(({ type, Icon, label, desc }) => (
              <button
                key={type}
                type="button"
                onClick={() => setAccountType(type)}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                  accountType === type
                    ? 'border-[#2563EB]/60 bg-[#2563EB]/10 text-white'
                    : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                }`}
              >
                <Icon size={18} strokeWidth={1.75} className={accountType === type ? 'text-[#60A5FA]' : ''} />
                <div>
                  <p className="text-sm font-semibold leading-none">{label}</p>
                  <p className="text-xs mt-0.5 opacity-60">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <form action={registerAction} className="space-y-5">
          <input type="hidden" name="accountType" value={accountType} />

          {/* Nome + Cognome */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
                Nome
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Mario"
                className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
                Cognome
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Rossi"
                className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

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
            <label htmlFor="password" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Minimo 8 caratteri"
              className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Campi B2B (condizionali) */}
          {accountType === 'b2b' && (
            <div className="space-y-4 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 p-4">
              <p className="text-xs font-semibold text-[#60A5FA] uppercase tracking-widest">
                Dati aziendali
              </p>
              <div>
                <label htmlFor="companyName" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
                  Ragione Sociale
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required={accountType === 'b2b'}
                  placeholder="Officina Rossi S.r.l."
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="vatNumber" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-widest">
                  Partita IVA
                </label>
                <input
                  id="vatNumber"
                  name="vatNumber"
                  type="text"
                  placeholder="IT12345678901"
                  className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Privacy */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-white/5 accent-[#2563EB] cursor-pointer"
            />
            <span className="text-xs text-zinc-500 leading-relaxed">
              Accetto la{' '}
              <Link href="/privacy" className="text-[#60A5FA] hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>{' '}
              e i{' '}
              <Link href="/termini" className="text-[#60A5FA] hover:text-white transition-colors duration-200">
                Termini e Condizioni
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#2563EB] text-white text-sm font-bold hover:bg-[#1D4ED8] active:scale-[0.98] cursor-pointer transition-all duration-200 shadow-[0_0_24px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2"
          >
            Crea account
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </form>

        {/* Link login */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Hai già un account?{' '}
          <Link href="/login" className="text-[#60A5FA] font-medium hover:text-white transition-colors duration-200">
            Accedi
          </Link>
        </p>
      </div>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-2 mt-8 text-xs text-zinc-600">
        <ShieldCheck size={14} strokeWidth={1.75} />
        <span>Registrazione gratuita • Dati protetti • Nessun abbonamento</span>
      </div>
    </div>
  );
}
