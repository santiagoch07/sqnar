import AppHeader from "@/components/AppHeader";

export default function EquipoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader title="Equipo" subtitle="Miembros y roles" />
      <div className="px-8 py-6">
        {children}
      </div>
    </>
  );
}
