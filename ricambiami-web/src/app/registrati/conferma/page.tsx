import Link from 'next/link';
import type { Metadata } from 'next';
import { MailCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conferma la tua email — Ricambiami.it',
};

export default function ConfermaPage() {
  return (
    <main className="flex-1 bg-[#020817] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/10 mx-auto mb-8">
          <MailCheck size={36} strokeWidth={1.5} className="text-[#60A5FA]" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Controlla la tua email
        </h1>
        <p className="text-zinc-400 leading-relaxed mb-8">
          Abbiamo inviato un link di conferma a{' '}
          <span className="text-zinc-300">tuo indirizzo email</span>.
          Clicca sul link per attivare il tuo account e iniziare a comprare.
        </p>
        <p className="text-sm text-zinc-500 mb-6">
          Non hai ricevuto l'email? Controlla la cartella spam o{' '}
          <button className="text-[#60A5FA] hover:text-white transition-colors duration-200 cursor-pointer">
            inviala di nuovo
          </button>.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-white/15 text-white text-sm font-medium hover:bg-white/5 cursor-pointer transition-all duration-200"
        >
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
