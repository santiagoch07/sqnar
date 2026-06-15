"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import type { Rol } from "@/lib/types";

const HIDE_NAVBAR_ON = ["/apps", "/pos", "/finanzas", "/equipo", "/productos"];

export default function NavBarWrapper({ rol }: { rol?: Rol | null }) {
  const pathname = usePathname();
  const hidden = HIDE_NAVBAR_ON.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (hidden) return null;
  return <NavBar rol={rol} />;
}
