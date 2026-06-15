import { redirect } from "next/navigation";
import { getUsuarioActual } from "@/lib/auth-server";
import AppSidebar from "@/components/AppSidebar";

function getIniciales(texto: string): string {
  const parts = texto.split(/[\s@]/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return texto.slice(0, 2).toUpperCase();
}

export default async function ConSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await getUsuarioActual();
  if (!usuario) redirect("/login");

  const userInitials = getIniciales(usuario.nombre ?? usuario.email);
  const userName = usuario.nombre ?? usuario.email.split("@")[0];

  return (
    <div className="min-h-screen bg-bg">
      <AppSidebar
        rol={usuario.rol as "dueno" | "cajero"}
        userInitials={userInitials}
        userName={userName}
      />
      <main
        className="transition-all duration-200"
        style={{ marginLeft: "var(--sidebar-width, 240px)" }}
      >
        {children}
      </main>
    </div>
  );
}
