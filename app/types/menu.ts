// ─── Menu accent palette ──────────────────────────────────────────────────────

/**
 * Each category picks one accent color.
 * Add new colors here and update ACCENT_VARIANTS in MenuCarneAsada.tsx to extend.
 */
export type AccentColor = 'orange' | 'pink' | 'lime' | 'amber';

// ─── Menu entities ────────────────────────────────────────────────────────────

export interface PlatilloMenu {
  /** Unique id — used as React key and for future edits */
  id: string;
  nombre: string;
  /** Optional one-liner shown beneath the name */
  descripcion?: string;
}

export interface SeccionMenu {
  /** Unique id — used as React key */
  id: string;
  /** Decorative emoji shown in the card header */
  emoji: string;
  /** Category title rendered in the handwritten font */
  titulo: string;
  platillos: PlatilloMenu[];
  accentColor: AccentColor;
}
