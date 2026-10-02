import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Settings, Users, Package, ShoppingBag } from "lucide-react";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#020817] min-h-[80svh] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-8">
            Pannello di Controllo Admin
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AdminCard title="Prodotti" value="450" icon={<Package className="text-[#60A5FA]" />} />
            <AdminCard title="Ordini" value="0" icon={<ShoppingBag className="text-emerald-400" />} />
            <AdminCard title="Clienti" value="0" icon={<Users className="text-purple-400" />} />
            <AdminCard title="Impostazioni" value="Sistema" icon={<Settings className="text-zinc-400" />} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Gestione Catalogo</h2>
            <p className="text-zinc-400">
              L'integrazione automatica con il database per la sincronizzazione tramite Cron Job  in fase di sviluppo.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function AdminCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col items-start">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
        {icon}
      </div>
      <h3 className="text-zinc-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
