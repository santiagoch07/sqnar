import { redirect } from "next/navigation";
import { isAppActiva } from "@/lib/empresa-apps";
import AppHeader from "@/components/AppHeader";

export default async function ProductosLayout({ children }: { children: React.ReactNode }) {
  const activa = await isAppActiva("productos");
  if (!activa) redirect("/upgrade/productos");

  return (
    <>
      <AppHeader title="Productos" subtitle="Catálogo y precios" />
      <div className="px-8 py-6">{children}</div>
    </>
  );
}
