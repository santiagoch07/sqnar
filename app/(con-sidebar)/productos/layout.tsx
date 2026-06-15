import AppHeader from "@/components/AppHeader";

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader title="Productos" subtitle="Catálogo y precios" />
      <div className="px-8 py-6">
        {children}
      </div>
    </>
  );
}
