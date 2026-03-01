import { SECCIONES_MENU } from '@/app/constants/menu';
import type { AccentColor, SeccionMenu, PlatilloMenu } from '@/app/types/menu';

// ─── Accent colour palette ────────────────────────────────────────────────────
// Extend this object when you add a new AccentColor to the type.

const ACCENT: Record<
  AccentColor,
  {
    border: string;
    headerBg: string;
    emojiRing: string;
    dot: string;
    headingColor: string;
    stripe: string;
  }
> = {
  lime: {
    border: 'border-lime-300',
    headerBg: 'bg-lime-50',
    emojiRing: 'ring-lime-300 bg-lime-100',
    dot: 'bg-lime-500',
    headingColor: '#3f6212',  // lime-800
    stripe: 'bg-lime-400',
  },
  orange: {
    border: 'border-orange-300',
    headerBg: 'bg-orange-50',
    emojiRing: 'ring-orange-300 bg-orange-100',
    dot: 'bg-orange-500',
    headingColor: '#9a3412',  // orange-800
    stripe: 'bg-orange-400',
  },
  pink: {
    border: 'border-pink-300',
    headerBg: 'bg-pink-50',
    emojiRing: 'ring-pink-300 bg-pink-100',
    dot: 'bg-pink-500',
    headingColor: '#9d174d',  // pink-800
    stripe: 'bg-pink-500',
  },
  amber: {
    border: 'border-amber-300',
    headerBg: 'bg-amber-50',
    emojiRing: 'ring-amber-300 bg-amber-100',
    dot: 'bg-amber-500',
    headingColor: '#92400e',  // amber-800
    stripe: 'bg-amber-400',
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Platillo({ platillo, dot }: { platillo: PlatilloMenu; dot: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
        aria-hidden="true"
      />
      <div>
        <span className="text-sm text-stone-700 leading-snug">
          {platillo.nombre}
        </span>
        {platillo.descripcion && (
          <p className="text-xs text-stone-400 mt-0.5">{platillo.descripcion}</p>
        )}
      </div>
    </li>
  );
}

function CategoriaCard({ seccion }: { seccion: SeccionMenu }) {
  const a = ACCENT[seccion.accentColor];

  return (
    <article
      className={`
        flex flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-sm
        transition-shadow hover:shadow-md
        ${a.border}
      `}
    >
      {/* Coloured accent stripe at the top */}
      <div className={`h-1.5 w-full ${a.stripe}`} />

      {/* Card header */}
      <header className={`${a.headerBg} px-5 pt-5 pb-4`}>
        <div
          className={`
            mb-3 inline-flex h-14 w-14 items-center justify-center
            rounded-full ring-2 text-3xl select-none
            ${a.emojiRing}
          `}
          aria-hidden="true"
        >
          {seccion.emoji}
        </div>

        <h3
          className="text-xl leading-tight"
          style={{ fontFamily: 'var(--font-pacifico)', color: a.headingColor }}
        >
          {seccion.titulo}
        </h3>
      </header>

      {/* Platillos list */}
      <ul className="flex flex-col gap-3 px-5 py-5">
        {seccion.platillos.map((platillo) => (
          <Platillo key={platillo.id} platillo={platillo} dot={a.dot} />
        ))}
      </ul>
    </article>
  );
}

// ─── Decorative helpers ───────────────────────────────────────────────────────

function MexicanStripe() {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full">
      <div className="flex-1 bg-orange-400" />
      <div className="flex-1 bg-pink-500" />
      <div className="flex-1 bg-lime-400" />
      <div className="flex-1 bg-amber-400" />
      <div className="flex-1 bg-orange-400" />
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-stone-200" />
      <span className="text-base select-none" aria-hidden="true">🔥</span>
      <div className="h-px flex-1 bg-stone-200" />
    </div>
  );
}

// ─── Main component (no client state needed — pure display) ───────────────────

export function MenuCarneAsada() {
  return (
    <section aria-labelledby="menu-heading" className="bg-stone-50 px-4 py-12 sm:px-8 md:px-12">
      {/* ── Decorative header ── */}
      <div className="mx-auto mb-10 flex max-w-sm flex-col items-center gap-4 text-center">
        <MexicanStripe />

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
          ✦ Hoy en la parrilla ✦
        </p>

        <h2
          id="menu-heading"
          className="text-4xl leading-tight md:text-5xl"
          style={{ fontFamily: 'var(--font-pacifico)', color: '#9a3412' }}
        >
          La Carta de la Asada
        </h2>

        <p className="text-sm text-stone-500">
          Todo lo que va a caer en el asador esta tarde
        </p>

        <Divider />
      </div>

      {/* ── Category grid ── */}
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SECCIONES_MENU.map((seccion) => (
          <CategoriaCard key={seccion.id} seccion={seccion} />
        ))}
      </div>

      {/* ── Footer note ── */}
      <p className="mt-10 text-center text-xs text-stone-400">
        🌿 Sujeto a cambios del cocinero principal · Sin garantías de sobras
      </p>
    </section>
  );
}
