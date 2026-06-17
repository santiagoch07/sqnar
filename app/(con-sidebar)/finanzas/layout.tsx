import { redirect } from "next/navigation";
import { isAppActiva } from "@/lib/empresa-apps";
import AppHeader from "@/components/AppHeader";

export default async function FinanzasLayout({ children }: { children: React.ReactNode }) {
  const activa = await isAppActiva("finanzas");
  if (!activa) redirect("/upgrade/finanzas");

  return (
    <>
      <AppHeader
        title="Finanzas"
        subtitle="KPIs, gastos y rentabilidad"
        tabs={[
          { label: "Dashboard", href: "/finanzas" },
          { label: "Productos", href: "/finanzas/productos" },
          { label: "Gastos", href: "/finanzas/gastos" },
        ]}
      />
      <div className="px-8 py-6">{children}</div>
    </>
  );
}
