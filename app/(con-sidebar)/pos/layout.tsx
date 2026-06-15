import AppHeader from "@/components/AppHeader";

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader title="POS" subtitle="Caja, turnos y cobros" />
      <div className="px-8 py-6">
        {children}
      </div>
    </>
  );
}
