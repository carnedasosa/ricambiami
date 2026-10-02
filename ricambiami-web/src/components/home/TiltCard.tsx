"use client";

import { useRef, useState, MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TiltCardProps {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
}

export default function TiltCard({
  label,
  description,
  href,
  icon,
  stat,
  statLabel,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`
    );
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setIsHovered(false);
  };

  return (
    <Link href={href} className="block group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer transition-shadow duration-300"
        style={{
          transform,
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s ease-out",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(37,99,235,0.3), 0 0 0 1px rgba(37,99,235,0.2)"
            : "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Glow dinamico che segue il mouse */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, #2563EB 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Bordo superiore luminoso */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative p-8 flex flex-col gap-6">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB]/15 text-[#2563EB] border border-[#2563EB]/20">
            {icon}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{label}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
          </div>

          {/* Stat */}
          <div className="border-t border-white/10 pt-5 flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-white">{stat}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{statLabel}</p>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] group-hover:gap-3 transition-all duration-300">
              Esplora
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
