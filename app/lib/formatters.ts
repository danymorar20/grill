/**
 * Display-formatting helpers.
 * Pure functions — no imports from the domain layer, no side effects.
 */

import type { UnidadMedida } from '@/app/types/grill';

const MXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return MXN.format(amount);
}

export function formatCantidad(cantidad: number, unidad: UnidadMedida): string {
  switch (unidad) {
    case 'g':
      return cantidad >= 1000
        ? `${(cantidad / 1000).toFixed(2)} kg`
        : `${Math.round(cantidad)} g`;
    case 'ml':
      return cantidad >= 1000
        ? `${(cantidad / 1000).toFixed(2)} L`
        : `${Math.round(cantidad)} ml`;
    case 'pza':
      return `${Math.ceil(cantidad)} pzas`;
  }
}

export function formatKg(kg: number): string {
  return `${kg.toFixed(2)} kg`;
}
