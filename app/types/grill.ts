// ─── Domain primitives ───────────────────────────────────────────────────────

export type CategoriaInsumo =
  | 'Carne'
  | 'Embutido'
  | 'Verdura'
  | 'Bebida'
  | 'Complemento'
  | 'Fruta'
  | 'Lacteo';

export type UnidadMedida = 'g' | 'ml' | 'pza';

// ─── Core entities ────────────────────────────────────────────────────────────

export interface Insumo {
  id: string;
  categoria: CategoriaInsumo;
  nombre: string;
  /** Base portion per person in `unidad` */
  porcionPorPersona: number;
  unidad: UnidadMedida;
  /** Price per `unidadCompra` in MXN */
  precioCompra: number;
  /** Quantity per commercial unit (e.g. 1000 for a 1-kg bag) */
  unidadCompra: number;
  /** Fraction lost during cooking (0–1). Applies only to Carne / Embutido. */
  mermaCoccion: number;
}

// ─── Derived / calculated entities ───────────────────────────────────────────

export interface InsumoCalculado extends Insumo {
  /** Total quantity needed (raw, in `unidad`) */
  cantidadTotal: number;
  /** Post-cook quantity in `unidad`. null for non-Carne/Embutido items. */
  cantidadCocida: number | null;
  /** Full purchase units required (rounded up) */
  unidadesAComprar: number;
  /** Total cost in MXN (whole purchase units × precioCompra) */
  costoTotal: number;
}

// ─── State / parameters ───────────────────────────────────────────────────────

export interface GrillModes {
  isHungryMode: boolean;
  isTacoMode: boolean;
}

export interface GrillParameters extends GrillModes {
  numberOfPeople: number;
}

// ─── Aggregated outputs ───────────────────────────────────────────────────────

export interface GrillKpis {
  presupuestoTotal: number;
  costoPorPersona: number;
  totalKgCrudos: number;
  totalKgCocidos: number;
}

export interface GrillCalculations extends GrillKpis {
  items: InsumoCalculado[];
  distribucionPorCategoria: Partial<Record<CategoriaInsumo, number>>;
}

// ─── Hook contract ────────────────────────────────────────────────────────────

export interface GrillCalculatorActions {
  setNumberOfPeople: (n: number) => void;
  setIsHungryMode: (v: boolean) => void;
  setIsTacoMode: (v: boolean) => void;
}

export type GrillCalculatorReturn = GrillParameters &
  GrillCalculations &
  GrillCalculatorActions;
