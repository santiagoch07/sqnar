import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SqnarLogo from "@/components/SqnarLogo";
import { getUsuarioActual } from "@/lib/auth-server";

export default async function Home() {
  const usuario = await getUsuarioActual();
  if (usuario) redirect("/apps");

  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-10">
        <SqnarLogo size="lg" />

        <div className="border-l-4 border-accent pl-6 space-y-4">
          <h1 className="text-6xl font-semibold text-text-strong leading-[1.05] text-balance">
            Tu cafetería,<br />en orden.
          </h1>
          <p className="text-lg text-muted max-w-md text-balance">
            Punto de venta y control financiero para negocios que les gusta saber cómo van.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/login">
            <Button variant="primary" size="xl">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/registro">
            <Button variant="ghost" size="lg">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
