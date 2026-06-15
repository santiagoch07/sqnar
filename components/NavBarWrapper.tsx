"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import type { Rol } from "@/lib/types";

export default function NavBarWrapper({ rol }: { rol?: Rol | null }) {
  const pathname = usePathname();
  if (pathname === "/apps") return null;
  return <NavBar rol={rol} />;
}
