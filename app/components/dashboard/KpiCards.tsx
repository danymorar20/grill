import {
  DollarSign,
  Users,
  Drumstick,
  ChefHat,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { formatCurrency, formatKg } from '@/app/lib/formatters';

// ─── Sub-component: single KPI card ──────────────────────────────────────────

interface KpiCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}

function KpiCard({
  icon,
  label,
  value,
  sub,
  accent = 'text-amber-400',
}: KpiCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-slate-700">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-400">{label}</p>
        <p className={`mt-1 text-2xl font-bold tracking-tight ${accent}`}>
          {value}
        </p>
        {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface KpiCardsProps {
  presupuestoTotal: number;
  costoPorPersona: number;
  totalKgCrudos: number;
  totalKgCocidos: number;
}

export function KpiCards({
  presupuestoTotal,
  costoPorPersona,
  totalKgCrudos,
  totalKgCocidos,
}: KpiCardsProps) {
  const mermaKg = totalKgCrudos - totalKgCocidos;
  const mermaPct =
    totalKgCrudos > 0
      ? ((mermaKg / totalKgCrudos) * 100).toFixed(0)
      : '0';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={<DollarSign className="h-5 w-5" />}
        label="Presupuesto Total Estimado"
        value={formatCurrency(presupuestoTotal)}
        sub="suma de todos los insumos"
      />
      <KpiCard
        icon={<Users className="h-5 w-5" />}
        label="Costo por Persona"
        value={formatCurrency(costoPorPersona)}
        sub="incluyendo bebidas y extras"
        accent="text-sky-400"
      />
      <KpiCard
        icon={<Drumstick className="h-5 w-5" />}
        label="Carne Cruda Total"
        value={formatKg(totalKgCrudos)}
        sub="antes de poner en la parrilla"
        accent="text-rose-400"
      />
      <KpiCard
        icon={<ChefHat className="h-5 w-5" />}
        label="Carne Cocida Total"
        value={formatKg(totalKgCocidos)}
        sub={`−${formatKg(mermaKg)} de merma (${mermaPct}%)`}
        accent="text-orange-400"
      />
    </div>
  );
}
