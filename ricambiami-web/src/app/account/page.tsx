import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LogOut, Package, User } from 'lucide-react';
import { logoutAction } from '@/app/(auth)/actions';

export const metadata: Metadata = {
  title: 'La mia Area Personale — Ricambiami.it',
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Estraiamo i dati salvati durante la registrazione
  const { first_name, last_name, is_b2b, company_name } = user.user_metadata || {};

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#020817] min-h-[80svh] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Ciao, {first_name || 'Utente'}
              </h1>
              <p className="text-zinc-400 mt-2">
                Gestisci i tuoi ordini e i tuoi dati personali.
                {is_b2b && <span className="ml-2 inline-flex items-center rounded-md bg-[#2563EB]/10 px-2 py-1 text-xs font-medium text-[#60A5FA] ring-1 ring-inset ring-[#2563EB]/20">Account B2B: {company_name}</span>}
              </p>
            </div>
            
            <form action={logoutAction}>
              <button 
                type="submit" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20 cursor-pointer"
              >
                <LogOut size={16} />
                Esci
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box Ordini */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
              <div className="h-12 w-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center mb-4">
                <Package className="text-[#60A5FA]" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">I tuoi ordini</h2>
              <p className="text-sm text-zinc-400 mb-4">Non hai ancora effettuato ordini.</p>
              <a href="/catalogo" className="text-[#60A5FA] hover:text-white text-sm font-medium transition-colors">
                Inizia lo shopping &rarr;
              </a>
            </div>

            {/* Box Dati */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <User className="text-emerald-400" size={24} />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Dati account</h2>
              <p className="text-sm text-zinc-400">
                {first_name} {last_name}<br/>
                {user.email}
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
