"use client";

import Link from "next/link";
import { ShoppingCart, TrendingUp, Settings } from "lucide-react";

const ICONS = {
  cart: ShoppingCart,
  trending: TrendingUp,
  settings: Settings,
};

type IconKey = keyof typeof ICONS;

type AppCardProps = {
  href: string;
  icon: IconKey;
  title: string;
  description: string;
};

export default function AppCard({ href, icon, title, description }: AppCardProps) {
  const Icon = ICONS[icon];

  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-6 bg-surface hover:bg-surface-2 border border-border rounded-xl transition-colors duration-150"
    >
      <div className="w-12 h-12 bg-surface-2 rounded-lg flex items-center justify-center shrink-0">
        <Icon size={24} className="text-accent" />
      </div>
      <div>
        <p className="text-lg font-medium text-text-strong">{title}</p>
        <p className="text-sm text-muted mt-1">{description}</p>
      </div>
    </Link>
  );
}
