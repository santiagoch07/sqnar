"use client";

import Link from "next/link";
import { ShoppingCart, BarChart3, Users, Package, ArrowRight } from "lucide-react";

const ICON_MAP = {
  "cash-register": ShoppingCart,
  "bar-chart": BarChart3,
  "users": Users,
  "package": Package,
};

type AppCardProps = {
  href: string;
  icon: keyof typeof ICON_MAP;
  iconColor: string;
  title: string;
  description: string;
};

export default function AppCard({ href, icon, iconColor, title, description }: AppCardProps) {
  const Icon = ICON_MAP[icon];

  return (
    <Link
      href={href}
      className="flex flex-col bg-surface border border-surface-2 rounded-2xl p-5 min-h-[140px] hover:bg-surface-2 transition-colors duration-150"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconColor}1A` }}
        >
          <Icon size={24} style={{ color: iconColor }} />
        </div>
        <ArrowRight size={20} className="text-muted" />
      </div>
      <div className="mt-12">
        <p className="text-xl font-semibold text-text-strong">{title}</p>
        <p className="text-sm text-muted mt-1">{description}</p>
      </div>
    </Link>
  );
}
