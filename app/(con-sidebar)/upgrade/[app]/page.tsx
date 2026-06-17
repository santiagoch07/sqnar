import Link from "next/link";
import { ShoppingCart, BarChart3, Users, Package } from "lucide-react";

const APP_CONFIG: Record<string, { name: string; Icon: typeof ShoppingCart; color: string }> = {
  pos:       { name: "POS",              Icon: ShoppingCart, color: "#22C55E" },
  finanzas:  { name: "Salud Financiera", Icon: BarChart3,    color: "#A855F7" },
  equipo:    { name: "Equipo",           Icon: Users,        color: "#EF4444" },
  productos: { name: "Productos",        Icon: Package,      color: "#3B82F6" },
};

export default function UpgradePage({ params }: { params: { app: string } }) {
  const config = APP_CONFIG[params.app] ?? { name: params.app, Icon: ShoppingCart, color: "#A3A3A3" };
  const { name, Icon, color } = config;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-sm gap-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center opacity-40"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Icon size={40} style={{ color }} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-text-strong">
            {name} no está disponible en tu plan
          </h1>
          <p className="text-sm text-muted">
            Esta aplicación es parte del plan SQNAR Pro. Contáctanos para activarla.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <a
            href="mailto:ventas@sqnar.mx"
            className="flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-accent text-black font-semibold text-sm transition-colors duration-150 hover:bg-accent-2"
          >
            Hablar con SQNAR
          </a>
          <Link
            href="/apps"
            className="flex items-center justify-center min-h-[48px] px-6 rounded-xl border border-surface-2 text-text-strong font-medium text-sm transition-colors duration-150 hover:bg-surface-2"
          >
            Regresar al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
