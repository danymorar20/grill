'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardHeader } from '@/app/components/ui/Card';
import { formatCurrency } from '@/app/lib/formatters';
import type { CategoriaInsumo } from '@/app/types/grill';
import { PieChart as PieIcon } from 'lucide-react';

// ─── Palette ──────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<CategoriaInsumo, string> = {
  Carne: '#ef4444',
  Embutido: '#f97316',
  Verdura: '#22c55e',
  Bebida: '#3b82f6',
  Complemento: '#a855f7',
  Fruta: '#eab308',
  Lacteo: '#ec4899',
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChartEntry {
  name: CategoriaInsumo;
  value: number;
}

interface BudgetDonutChartProps {
  distribucion: Partial<Record<CategoriaInsumo, number>>;
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

interface TooltipPayloadItem {
  name: CategoriaInsumo;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 shadow-xl">
      <p className="text-xs font-medium text-slate-300">{entry.name}</p>
      <p className="text-sm font-bold text-white">{formatCurrency(entry.value)}</p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BudgetDonutChart({ distribucion }: BudgetDonutChartProps) {
  const data: ChartEntry[] = (
    Object.entries(distribucion) as [CategoriaInsumo, number][]
  )
    .filter(([, value]) => value > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value }));

  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader
        title="Distribución del Presupuesto"
        description="costo agrupado por categoría"
        icon={<PieIcon className="h-4 w-4" />}
      />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Chart + center label */}
        <div className="relative mx-auto w-full max-w-xs">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="80%"
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name]}
                    opacity={0.9}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center overlay — total */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
              Total
            </span>
            <span className="text-xl font-bold text-white">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <ul className="space-y-2">
          {data.map((entry) => {
            const pct = total > 0 ? ((entry.value / total) * 100).toFixed(0) : '0';
            return (
              <li key={entry.name} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[entry.name] }}
                />
                <span className="flex-1 text-xs text-slate-300 truncate">
                  {entry.name}
                </span>
                <span className="text-xs text-slate-500">{pct}%</span>
                <span className="text-xs font-medium text-slate-200">
                  {formatCurrency(entry.value)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
