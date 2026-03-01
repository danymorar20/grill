import type { SeccionMenu } from '@/app/types/menu';

/**
 * Contenido del menú de la asada.
 *
 * ─── Cómo editar ────────────────────────────────────────────────────────────
 *  • Agregar un platillo: añade un objeto { id, nombre } al array `platillos`
 *    de la sección que corresponda.
 *  • Quitar un platillo: elimina su entrada del array.
 *  • Nueva sección: agrega un objeto SeccionMenu al final del array y elige
 *    un `accentColor` de: 'orange' | 'pink' | 'lime' | 'amber'.
 *  • Cambiar orden: reordena los objetos en el array.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const SECCIONES_MENU: SeccionMenu[] = [
  {
    id: 'aperitivos',
    emoji: '🥑',
    titulo: 'Para abrir el apetito',
    accentColor: 'lime',
    platillos: [
      { id: 'guacamole', nombre: 'Guacamole fresco' },
      { id: 'queso_fundido', nombre: 'Queso fundido' },
      {
        id: 'salsa_roja',
        nombre: 'Salsa roja tatemada en molcajete',
      },
    ],
  },
  {
    id: 'reyes_carbon',
    emoji: '🥩',
    titulo: 'Los Reyes del Carbón',
    accentColor: 'orange',
    platillos: [
      { id: 'arrachera', nombre: 'Arrachera jugosa al carbón' },
      { id: 'bisteces', nombre: 'Bisteces de res' },
    ],
  },
  {
    id: 'asador',
    emoji: '🔥',
    titulo: 'Del Asador a la Tortilla',
    accentColor: 'pink',
    platillos: [
      { id: 'chorizo_arg', nombre: 'Chorizo argentino' },
      { id: 'chistorra', nombre: 'Chistorra' },
      { id: 'salchicha', nombre: 'Salchicha para asar' },
    ],
  },
  {
    id: 'verduras',
    emoji: '🧅',
    titulo: 'El Toque Clandestino',
    accentColor: 'amber',
    platillos: [
      { id: 'cebolla', nombre: 'Cebolla blanca asada' },
      { id: 'cebollitas', nombre: 'Cebollitas cambray asadas' },
    ],
  },
];
