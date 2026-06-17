"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { formatMXN } from "@/lib/format";

type WFBar = { name: string; valor: number; color: string };
type WFBarProcessed = WFBar & { valorAbs: number; etiqueta: string };

function CustomTooltip({ active, payload, label }: {
  active?: boolean; payload?: { payload: WFBarProcessed }[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  const entry = payload[0]?.payload;
  if (!entry) return null;
  return (
    <div className="bg-surface border border-border-hi rounded-lg px-3 py-2 text-sm">
      <p className="font-medium text-muted">{label}</p>
      <p className="font-semibold text-text-strong">{entry.etiqueta}</p>
    </div>
  );
}

export default function WaterfallChart({ data }: { data: WFBar[] }) {
  const processedData: WFBarProcessed[] = data.map((item) => ({
    ...item,
    valorAbs: Math.abs(item.valor),
    etiqueta: (item.valor >= 0 ? "+" : "-") + formatMXN(Math.abs(item.valor)),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={processedData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }} barCategoryGap="25%">
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#A3A3A3" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis hide domain={[0, "auto"]} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Bar dataKey="valorAbs" radius={[4, 4, 0, 0]}>
          {processedData.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
