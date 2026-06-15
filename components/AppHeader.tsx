"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
};

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  tabs?: Tab[];
};

export default function AppHeader({ title, subtitle, tabs }: AppHeaderProps) {
  const pathname = usePathname();

  // El tab activo es el que tiene el href más específico (más largo) que coincide
  const activeHref = tabs
    ?.filter((tab) => pathname === tab.href || pathname.startsWith(tab.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <div>
      <div className="pt-8 pb-4 px-8">
        <h1 className="text-3xl font-semibold text-text-strong">{title}</h1>
        {subtitle && <p className="text-base text-muted mt-1">{subtitle}</p>}
      </div>

      {tabs && tabs.length > 0 && (
        <div className="border-b border-surface-2 px-8 flex gap-1">
          {tabs.map((tab) => {
            const isActive = tab.href === activeHref;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  isActive
                    ? "border-accent text-text-strong"
                    : "border-transparent text-muted hover:text-text-strong"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
