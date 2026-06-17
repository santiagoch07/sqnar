import { redirect } from "next/navigation";
import Link from "next/link";
import { Clock, FileText, Settings, ChevronDown } from "lucide-react";
import SqnarLogo from "@/components/SqnarLogo";
import AppCard from "@/components/AppCard";
import UserMenuDropdown from "@/components/UserMenuDropdown";
import TimeGreeting from "@/components/TimeGreeting";
import { getUsuarioActual } from "@/lib/auth-server";
import { getAppsActivasEmpresa } from "@/lib/empresa-apps";

export const dynamic = "force-dynamic";

export default async function AppsPage() {
  const usuario = await getUsuarioActual();
  if (!usuario) redirect("/login");

  const esDueno = usuario.rol === "dueno";
  const nombre = usuario.nombre ?? "Usuario";
  const empresa = usuario.empresa as unknown as { id: string; nombre: string } | null;

  const appsActivas = await getAppsActivasEmpresa();

  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Sección 1 — Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between py-4 px-6 border-b border-surface-2 bg-bg">
        <SqnarLogo size="md" />
        <UserMenuDropdown nombre={nombre} email={usuario.email} />
      </header>

      {/* Sección 2 — Saludo */}
      <div className="pt-12 px-6">
        <TimeGreeting nombre={nombre} />
        {empresa?.nombre && (
          <p className="text-base text-muted mt-1">{empresa.nombre}</p>
        )}
      </div>

      {/* Sección 3 — Badge de rol */}
      <div className="mt-6 px-6">
        {esDueno ? (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-accent bg-accent/10 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Dueño
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-muted bg-surface-2 text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-muted" />
            Cajero
          </span>
        )}
      </div>

      {/* Sección 4 — Header "TUS APPS" */}
      <div className="mt-12 px-6 mb-4">
        <p className="text-xs tracking-wider text-muted font-medium uppercase">Tus apps</p>
      </div>

      {/* Sección 5 — Grid de apps */}
      <div className="grid grid-cols-2 gap-4 px-6">
        <AppCard
          href="/pos"
          icon="cash-register"
          iconColor="#22C55E"
          title="POS"
          description="Caja, turnos y cobros"
          activa={appsActivas.includes("pos")}
        />
        {esDueno && (
          <AppCard
            href="/finanzas"
            icon="bar-chart"
            iconColor="#A855F7"
            title="Finanzas"
            description="KPIs, gastos y rentabilidad"
            activa={appsActivas.includes("finanzas")}
          />
        )}
        {esDueno && (
          <AppCard
            href="/equipo"
            icon="users"
            iconColor="#EF4444"
            title="Equipo"
            description="Miembros y roles"
            activa={appsActivas.includes("equipo")}
          />
        )}
        {esDueno && (
          <AppCard
            href="/productos"
            icon="package"
            iconColor="#3B82F6"
            title="Productos"
            description="Catálogo y precios"
            activa={appsActivas.includes("productos")}
          />
        )}
      </div>

      {/* Sección 6 — Separador + Header "ACCESO RÁPIDO" */}
      <div className="mt-12 mx-6 border-t border-surface-2" />
      <div className="mt-8 px-6 mb-4">
        <p className="text-xs tracking-wider text-muted font-medium uppercase">Acceso rápido</p>
      </div>

      {/* Sección 7 — Acceso rápido */}
      {/* TODO: Fase 2 - implementar lógica de accesos rápidos */}
      <div className="grid grid-cols-3 gap-3 px-6">
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-3 bg-surface border border-surface-2 rounded-xl hover:bg-surface-2 transition-colors duration-150"
        >
          <Clock size={16} className="text-muted shrink-0" />
          <span className="text-sm text-text-strong">Abrir turno</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-3 bg-surface border border-surface-2 rounded-xl hover:bg-surface-2 transition-colors duration-150"
        >
          <FileText size={16} className="text-muted shrink-0" />
          <span className="text-sm text-text-strong">Último corte</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 px-4 py-3 bg-surface border border-surface-2 rounded-xl hover:bg-surface-2 transition-colors duration-150"
        >
          <Settings size={16} className="text-muted shrink-0" />
          <span className="text-sm text-text-strong">Ajustes</span>
        </Link>
      </div>

      {/* Sección 8 — Indicador de scroll */}
      <div className="mt-8 pb-12 flex justify-center">
        <ChevronDown size={24} className="text-muted" />
      </div>

    </div>
  );
}
