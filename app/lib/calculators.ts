/**
 * Pure calculation functions for the Grill Dashboard.
 * No side effects, no framework dependencies — fully unit-testable.
 *
 * SOLID notes:
 *  S – Each function has exactly one reason to change.
 *  O – New modes (e.g. "veggie mode") can be added by composing new factor
 *      functions without touching existing ones.
 *  D – The hook and components depend on these abstractions, not concrete state.
 */

import type {
  CategoriaInsumo,
  GrillParameters,
  Insumo,
  InsumoCalculado,
} from '@/app/types/grill';

// ─── Constants ────────────────────────────────────────────────────────────────

export const HUNGRY_FACTOR = 1.3;
export const TACO_MEAT_FACTOR = 0.85;
export const TACO_TORTILLA_FACTOR = 1.4;

/** Categories where shrinkage applies */
const MERMA_CATEGORIES = new Set<CategoriaInsumo>(['Carne', 'Embutido']);

/** Categories where taco mode reduces portion (meat goes into tacos) */
const TACO_REDUCED_CATEGORIES = new Set<CategoriaInsumo>(['Carne', 'Embutido']);

/** Inventory IDs boosted by taco mode (need more wrapping) */
const TACO_BOOSTED_IDS = new Set(['tortilla']);

// ─── Factor builders ──────────────────────────────────────────────────────────

export function buildHungryFactor(isHungryMode: boolean): number {
  return isHungryMode ? HUNGRY_FACTOR : 1;
}

export function buildTacoFactor(insumo: Insumo, isTacoMode: boolean): number {
  if (!isTacoMode) return 1;
  if (TACO_BOOSTED_IDS.has(insumo.id)) return TACO_TORTILLA_FACTOR;
  if (TACO_REDUCED_CATEGORIES.has(insumo.categoria)) return TACO_MEAT_FACTOR;
  return 1;
}

// ─── Atomic calculators ───────────────────────────────────────────────────────

export function calcCantidadTotal(
  porcionPorPersona: number,
  numberOfPeople: number,
  hungryFactor: number,
  tacoFactor: number,
): number {
  return porcionPorPersona * numberOfPeople * hungryFactor * tacoFactor;
}

export function calcUnidadesAComprar(
  cantidadTotal: number,
  unidadCompra: number,
): number {
  return Math.ceil(cantidadTotal / unidadCompra);
}

export function calcCostoTotal(
  unidadesAComprar: number,
  precioCompra: number,
): number {
  return unidadesAComprar * precioCompra;
}

export function calcCantidadCocida(
  cantidadTotal: number,
  mermaCoccion: number,
  categoria: CategoriaInsumo,
): number | null {
  return MERMA_CATEGORIES.has(categoria)
    ? cantidadTotal * (1 - mermaCoccion)
    : null;
}

// ─── Composite calculator (single item) ──────────────────────────────────────

export function calcInsumo(
  insumo: Insumo,
  params: GrillParameters,
): InsumoCalculado {
  const hungryFactor = buildHungryFactor(params.isHungryMode);
  const tacoFactor = buildTacoFactor(insumo, params.isTacoMode);

  const cantidadTotal = calcCantidadTotal(
    insumo.porcionPorPersona,
    params.numberOfPeople,
    hungryFactor,
    tacoFactor,
  );

  const unidadesAComprar = calcUnidadesAComprar(cantidadTotal, insumo.unidadCompra);
  const costoTotal = calcCostoTotal(unidadesAComprar, insumo.precioCompra);
  const cantidadCocida = calcCantidadCocida(
    cantidadTotal,
    insumo.mermaCoccion,
    insumo.categoria,
  );

  return {
    ...insumo,
    cantidadTotal,
    cantidadCocida,
    unidadesAComprar,
    costoTotal,
  };
}

// ─── Batch calculators ────────────────────────────────────────────────────────

export function calcAllInsumos(
  inventario: Record<string, Insumo>,
  params: GrillParameters,
): InsumoCalculado[] {
  return Object.values(inventario).map((insumo) => calcInsumo(insumo, params));
}

export function calcKpis(
  items: InsumoCalculado[],
  numberOfPeople: number,
) {
  const presupuestoTotal = items.reduce((acc, item) => acc + item.costoTotal, 0);
  const costoPorPersona = numberOfPeople > 0 ? presupuestoTotal / numberOfPeople : 0;

  const meats = items.filter((item) => MERMA_CATEGORIES.has(item.categoria));
  const totalKgCrudos =
    meats.reduce((acc, item) => acc + item.cantidadTotal, 0) / 1000;
  const totalKgCocidos =
    meats.reduce((acc, item) => acc + (item.cantidadCocida ?? 0), 0) / 1000;

  return { presupuestoTotal, costoPorPersona, totalKgCrudos, totalKgCocidos };
}

export function calcDistribucionPorCategoria(
  items: InsumoCalculado[],
): Partial<Record<CategoriaInsumo, number>> {
  return items.reduce(
    (acc, item) => {
      acc[item.categoria] = (acc[item.categoria] ?? 0) + item.costoTotal;
      return acc;
    },
    {} as Partial<Record<CategoriaInsumo, number>>,
  );
}
