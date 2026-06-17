import { redirect } from "next/navigation";
import { isAppActiva } from "@/lib/empresa-apps";
import AppHeader from "@/components/AppHeader";

export default async function EquipoLayout({ children }: { children: React.ReactNode }) {
  const activa = await isAppActiva("equipo");
  if (!activa) redirect("/upgrade/equipo");

  return (
    <>
      <AppHeader title="Equipo" subtitle="Miembros y roles" />
      <div className="px-8 py-6">{children}</div>
    </>
  );
}
