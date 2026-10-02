"use client";

export default function SortSelect({ defaultValue }: { defaultValue: string }) {
  return (
    <select
      name="sort"
      defaultValue={defaultValue}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      className="h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-[#2563EB] cursor-pointer transition-all duration-200 appearance-none pr-8"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='1.75'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
    >
      <option value="rilevanza">Rilevanza</option>
      <option value="prezzo-asc">Prezzo crescente</option>
      <option value="prezzo-desc">Prezzo decrescente</option>
      <option value="valutazione">Valutazione</option>
    </select>
  );
}
