import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { type ProductCategory } from '@/lib/products';

// ─── Segmenti validi ──────────────────────────────────────────────────────────

const VALID_CATEGORIES: Record<string, ProductCategory> = {
  auto: 'Auto',
  moto: 'Moto',
  camion: 'Camion',
};

// ─── Metadata dinamico ────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const label = VALID_CATEGORIES[categoria.toLowerCase()] ?? categoria;
  return {
    title: `Ricambi ${label} | ricambiami.it`,
    description: `Scopri tutti i ricambi per ${label} nel catalogo ricambiami.it.`,
  };
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(VALID_CATEGORIES).map((cat) => ({ categoria: cat }));
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
/*
  Approccio scelto: redirect verso /catalogo?categoria=<Categoria>
  ─ Mantiene un'unica fonte di verità (la pagina /catalogo)
  ─ Evita duplicazione di logica di filtraggio
  ─ L'URL canonico con searchParams è condivisibile e bookmarkabile
*/
export default async function CategoriaPage({ params }: PageProps) {
  const { categoria } = await params;
  const slug = categoria.toLowerCase();
  const label = VALID_CATEGORIES[slug];

  if (!label) {
    // Categoria non riconosciuta → catalogo completo
    redirect('/catalogo');
  }

  redirect(`/catalogo?categoria=${label}`);
}
