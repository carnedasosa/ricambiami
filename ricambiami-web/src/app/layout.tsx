import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ricambiami.it — Ricambi Auto, Moto e Camion",
  description:
    "Il tuo store online di ricambi originali e compatibili per auto, moto e camion. Qualità garantita, spedizione rapida. Sconto 10% per utenti registrati su ordini superiori a 100€.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#020817] text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
