"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart, BarChart3, Users, Package,
  PanelLeftClose, MoreHorizontal,
} from "lucide-react";

type AppSidebarProps = {
  rol: "dueno" | "cajero";
  userInitials: string;
  userName: string;
};

const APP_ITEMS = [
  {
    id: "pos" as const,
    label: "POS",
    href: "/pos",
    Icon: ShoppingCart,
    color: "#22C55E",
    roles: ["dueno", "cajero"] as const,
  },
  {
    id: "finanzas" as const,
    label: "Finanzas",
    href: "/finanzas",
    Icon: BarChart3,
    color: "#A855F7",
    roles: ["dueno"] as const,
  },
  {
    id: "equipo" as const,
    label: "Equipo",
    href: "/equipo",
    Icon: Users,
    color: "#EF4444",
    roles: ["dueno"] as const,
  },
  {
    id: "productos" as const,
    label: "Productos",
    href: "/productos",
    Icon: Package,
    color: "#3B82F6",
    roles: ["dueno"] as const,
  },
];

export default function AppSidebar({ rol, userInitials, userName }: AppSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentApp =
    pathname.startsWith("/pos")       ? "pos"      :
    pathname.startsWith("/finanzas")  ? "finanzas" :
    pathname.startsWith("/equipo")    ? "equipo"   :
    pathname.startsWith("/productos") ? "productos":
    null;

  // Leer estado guardado de localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem("sqnar-sidebar-collapsed");
    const isCollapsed = saved === "true";
    if (isCollapsed) setCollapsed(true);
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isCollapsed ? "64px" : "240px"
    );
  }, []);

  // Sincronizar CSS var cuando cambia el estado
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "64px" : "240px"
    );
  }, [collapsed]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  function toggleSidebar() {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sqnar-sidebar-collapsed", String(newState));
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const visibleItems = APP_ITEMS.filter((item) =>
    (item.roles as readonly string[]).includes(rol)
  );

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 bg-surface border-r border-surface-2 flex flex-col transition-all duration-200 overflow-hidden"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo + toggle */}
      <div
        className={`flex items-center py-4 pb-6 ${
          collapsed ? "justify-center px-0" : "justify-between px-4"
        }`}
      >
        {collapsed ? (
          <button
            onClick={toggleSidebar}
            aria-label="Expandir sidebar"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-surface-2 transition-colors duration-150"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="2" fill="#FFD944" />
              <path d="M12 6C15.314 6 18 8.686 18 12C18 15.314 15.314 18 12 18" stroke="#FFD944" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22" stroke="#FFD944" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            </svg>
          </button>
        ) : (
          <>
            <Link href="/apps" className="shrink-0">
              <svg width="80" height="20" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="15" r="3" fill="#FFD944" />
                <path d="M10 7C14.418 7 18 10.582 18 15C18 19.418 14.418 23 10 23" stroke="#FFD944" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
                <path d="M10 2C17.18 2 23 7.82 23 15C23 22.18 17.18 28 10 28" stroke="#FFD944" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
                <text x="30" y="20" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="14" fill="#FAFAFA" letterSpacing="0.05em">SQNAR</text>
              </svg>
            </Link>
            <button
              onClick={toggleSidebar}
              aria-label="Colapsar sidebar"
              className="text-muted hover:text-text transition-colors duration-150 p-1 rounded-lg hover:bg-surface-2"
            >
              <PanelLeftClose size={18} />
            </button>
          </>
        )}
      </div>

      {/* Separador */}
      <div className="border-t border-surface-2 mx-3" />

      {/* Sección APPS */}
      <div className="pt-4 flex-1">
        {!collapsed && (
          <p className="text-xs uppercase tracking-wider text-muted font-medium px-4 mb-2">
            Apps
          </p>
        )}

        <nav className="flex flex-col gap-0.5">
          {visibleItems.map(({ id, label, href, Icon, color }) => {
            const isActive = currentApp === id;
            return (
              <Link
                key={id}
                href={href}
                title={label}
                className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg transition-colors duration-150 ${
                  isActive ? "bg-surface-2" : "hover:bg-surface-2"
                }`}
              >
                <Icon
                  size={20}
                  style={{ color: isActive ? color : "#A3A3A3" }}
                  className="shrink-0"
                />
                {!collapsed && (
                  <span
                    className={`text-sm truncate ${
                      isActive ? "text-text-strong font-medium" : "text-muted"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer con usuario */}
      <div
        ref={dropdownRef}
        className={`relative border-t border-surface-2 pt-3 pb-4 mx-3 ${
          collapsed ? "flex justify-center" : "px-1"
        }`}
      >
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className={`flex items-center gap-2 rounded-lg hover:bg-surface-2 transition-colors duration-150 w-full ${
            collapsed ? "justify-center p-2" : "p-2"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center text-sm text-accent font-medium shrink-0 select-none">
            {userInitials}
          </div>
          {!collapsed && (
            <>
              <span className="text-sm text-text-strong truncate flex-1 text-left">
                {userName}
              </span>
              <MoreHorizontal size={16} className="text-muted shrink-0" />
            </>
          )}
        </button>

        {dropdownOpen && (
          <div
            className={`absolute bottom-14 w-44 bg-surface border border-border rounded-xl z-50 overflow-hidden ${
              collapsed ? "left-12" : "left-2"
            }`}
          >
            <div className="p-1">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-error hover:bg-surface-2 rounded-lg transition-colors duration-150"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
