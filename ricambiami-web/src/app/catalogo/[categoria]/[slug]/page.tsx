import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/catalog/ProductDetail";
import { getProductBySlug, getProductsByCategory, PRODUCTS } from "@/lib/products";

interface PageProps {
  params: Promise<{ categoria: string; slug: string }>;
}

// ── Metadata dinamici ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Prodotto non trovato — Ricambiami.it" };
  return {
    title: `${product.title} — Ricambiami.it`,
    description: product.description.slice(0, 160),
  };
}

// ── Pagine statiche (opzionale, per SSG) ──────────────────────────────────────
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    categoria: p.category,
    slug: p.slug,
  }));
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ProductPage({ params }: PageProps) {
  const { categoria, slug } = await params;
  const product = getProductBySlug(slug);

  // Prodotto non trovato o categoria non corrispondente → 404
  if (!product || product.category !== categoria) {
    notFound();
  }

  // Prodotti correlati: stessa categoria, escludi il corrente
  const related = getProductsByCategory(product.category as "auto" | "moto" | "camion")
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main>
        <ProductDetail product={product} relatedProducts={related} />
      </main>
      <Footer />
    </>
  );
}
