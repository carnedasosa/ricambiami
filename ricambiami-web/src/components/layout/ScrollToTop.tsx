"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  /**
   * Distanza di scroll (in pixel) oltre la quale mostrare il pulsante.
   * Default: 300px.
   */
  threshold?: number;
}

export default function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY > threshold);

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = Math.min(
        100,
        Math.max(0, (currentScrollY / totalHeight) * 100)
      );
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  }, [threshold]);

  useEffect(() => {
    // Controllo iniziale se la pagina viene caricata già scrollata
    handleScroll();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // Calcolo circonferenza cerchio di progresso SVG
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out pb-[env(safe-area-inset-bottom,0px)] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      } motion-reduce:transition-none motion-reduce:transform-none`}
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        onClick={scrollToTop}
        tabIndex={isVisible ? 0 : -1}
        aria-label="Torna all'inizio della pagina"
        title="Torna all'inizio della pagina"
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#0A101D]/90 text-zinc-200 backdrop-blur-md border border-white/15 shadow-xl shadow-black/60 transition-all duration-200 ease-out hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020817] cursor-pointer motion-reduce:hover:transform-none"
      >
        {/* Anello di progresso SVG */}
        <svg
          className="absolute inset-0 -rotate-90 pointer-events-none"
          width="100%"
          height="100%"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          {/* Traccia di sfondo sottile */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-white/10 group-hover:text-white/20 transition-colors duration-200"
          />
          {/* Avanzamento scroll */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="group-hover:stroke-white transition-all duration-150"
          />
        </svg>

        {/* Icona Freccia */}
        <ArrowUp
          size={18}
          strokeWidth={2.25}
          className="relative z-10 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 motion-reduce:transform-none"
        />
      </button>
    </div>
  );
}
