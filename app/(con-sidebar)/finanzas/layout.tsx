import AppHeader from "@/components/AppHeader";

export default function FinanzasLayout({ children }: { children: React.ReactNode }) {
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
      <div className="px-8 py-6">
        {children}
      </div>
    </>
  );
}
