import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Registrati — Ricambiami.it',
  description: 'Crea il tuo account gratuito su Ricambiami.it e ottieni il 10% di sconto su ordini superiori a 100€.',
};

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function RegisterPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#020817] min-h-[80svh] flex items-center justify-center px-4 py-20">
        <RegisterForm error={params.error} />
      </main>
      <Footer />
    </>
  );
}
