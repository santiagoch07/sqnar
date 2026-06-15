"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

type UserMenuDropdownProps = {
  nombre: string;
  email: string;
};

function getInitials(nombre: string): string {
  const parts = nombre.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getDisplayName(nombre: string): string {
  const parts = nombre.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[1][0]}.`;
}

export default function UserMenuDropdown({ nombre, email }: UserMenuDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const initials = getInitials(nombre);
  const displayName = getDisplayName(nombre);

  return (
    <div ref={ref} className="relative flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-sm text-accent font-medium shrink-0 select-none">
        {initials}
      </div>
      <span className="text-sm text-text-strong">{displayName}</span>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Opciones de usuario"
        className="text-muted hover:text-text transition-colors duration-150 p-1"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-44 bg-surface border border-border rounded-xl z-50 overflow-hidden shadow-none">
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
  );
}
