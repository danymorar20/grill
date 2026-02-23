import { ShoppingCart } from 'lucide-react';

import { Card, CardHeader } from '@/app/components/ui/Card';
import { formatCantidad, formatCurrency } from '@/app/lib/formatters';
import type { CategoriaInsumo, InsumoCalculado } from '@/app/types/grill';

// ─── Category badge ───────────────────────────────────────────────────────────

const BADGE_STYLES: Record<CategoriaInsumo, string> = {
  Carne: 'bg-red-500/10 text-red-400 ring-red-500/20',
  Embutido: 'bg-orange-500/10 text-orange-400 ring-orange-500/20',
  Verdura: 'bg-green-500/10 text-green-400 ring-green-500/20',
  Bebida: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  Complemento: 'bg-purple-500/10 text-purple-400 ring-purple-500/20',
  Fruta: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
  Lacteo: 'bg-pink-500/10 text-pink-400 ring-pink-500/20',
};

function CategoriaBadge({ categoria }: { categoria: CategoriaInsumo }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${BADGE_STYLES[categoria]}`}
    >
      {categoria}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ShoppingTableProps {
  items: InsumoCalculado[];
}

export function ShoppingTable({ items }: ShoppingTableProps) {
  const sorted = [...items].sort((a, b) => b.costoTotal - a.costoTotal);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader
        title="Lista de Compras"
        description={`${items.length} insumos · ordenados por costo`}
        icon={<ShoppingCart className="h-4 w-4" />}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-left">
              <th className="whitespace-nowrap px-6 py-3 text-xs font-medium text-slate-400">
                Insumo
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-medium text-slate-400">
                Categoría
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-medium text-slate-400">
                Cantidad necesaria
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-medium text-slate-400">
                Unidades a comprar
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium text-slate-400">
                Costo estimado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {sorted.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-slate-800/30"
              >
                {/* Nombre */}
                <td className="whitespace-nowrap px-6 py-3.5 font-medium text-slate-100">
                  {item.nombre}
                </td>

                {/* Categoría */}
                <td className="whitespace-nowrap px-4 py-3.5">
                  <CategoriaBadge categoria={item.categoria} />
                </td>

                {/* Cantidad total */}
                <td className="whitespace-nowrap px-4 py-3.5 text-right font-mono text-xs text-slate-300">
                  {formatCantidad(item.cantidadTotal, item.unidad)}
                  {item.cantidadCocida !== null && (
                    <span className="ml-1.5 text-slate-500">
                      → {formatCantidad(item.cantidadCocida, item.unidad)} cocida
                    </span>
                  )}
                </td>

                {/* Unidades a comprar */}
                <td className="whitespace-nowrap px-4 py-3.5 text-right font-mono text-xs text-slate-300">
                  {item.unidadesAComprar}{' '}
                  {item.unidad === 'pza'
                    ? `paq. (${item.unidadesAComprar * item.unidadCompra} pzas)`
                    : item.unidad === 'g'
                      ? `kg`
                      : item.unidad === 'ml'
                        ? `u.`
                        : ''}
                </td>

                {/* Costo */}
                <td className="whitespace-nowrap px-6 py-3.5 text-right font-semibold text-amber-400">
                  {formatCurrency(item.costoTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
