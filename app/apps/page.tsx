import { redirect } from "next/navigation";
import AppCard from "@/components/AppCard";
import { getUsuarioActual } from "@/lib/auth-server";

export default async function AppsPage() {
  const usuario = await getUsuarioActual();
  if (!usuario) redirect("/login");

  const esDueno = usuario.rol === "dueno";

  return (
    <div className="min-h-screen bg-bg px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-text-strong">
            Bienvenido, {usuario.nombre}
          </h1>
          <p className="text-base text-muted">¿Qué quieres hacer hoy?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppCard
            href="/pos"
            icon="cart"
            title="SQNAR POS"
            description="Vende, registra pedidos y haz tu corte del día"
          />
          {esDueno && (
            <AppCard
              href="/finanzas"
              icon="trending"
              title="Salud Financiera"
              description="Tu rentabilidad, punto de equilibrio y productos estrella"
            />
          )}
          {esDueno && (
            <AppCard
              href="/equipo"
              icon="settings"
              title="Administración"
              description="Gestiona tu equipo y la configuración de tu cafetería"
            />
          )}
        </div>

        <p className="text-center text-xs text-muted pt-8">
          SQNAR · Plataforma para cafeterías
        </p>
      </div>
    </div>
  );
}
