import { redirect } from "next/navigation";
import { isAppActiva } from "@/lib/empresa-apps";
import AppHeader from "@/components/AppHeader";

export default async function PosLayout({ children }: { children: React.ReactNode }) {
  const activa = await isAppActiva("pos");
  if (!activa) redirect("/upgrade/pos");

  return (
    <>
      <AppHeader title="POS" subtitle="Caja, turnos y cobros" />
      <div className="px-8 py-6">{children}</div>
    </>
  );
}
