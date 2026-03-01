'use client';

/**
 * GrillDashboard — top-level client component.
 *
 * Owns the hook instance and distributes calculated data to the
 * presentational sub-components. page.tsx stays a server component,
 * keeping the boundary clean.
 */

import { useGrillCalculator } from '@/app/hooks/useGrillCalculator';
import { ControlRoom } from '@/app/components/dashboard/ControlRoom';
import { KpiCards } from '@/app/components/dashboard/KpiCards';
import { BudgetDonutChart } from '@/app/components/dashboard/BudgetDonutChart';
import { ShoppingTable } from '@/app/components/dashboard/ShoppingTable';
import { MenuCarneAsada } from '@/app/components/dashboard/MenuCarneAsada';

export function GrillDashboard() {
  const {
    numberOfPeople,
    isHungryMode,
    isTacoMode,
    setNumberOfPeople,
    setIsHungryMode,
    setIsTacoMode,
    presupuestoTotal,
    costoPorPersona,
    totalKgCrudos,
    totalKgCocidos,
    distribucionPorCategoria,
    items,
  } = useGrillCalculator();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ControlRoom
        numberOfPeople={numberOfPeople}
        isHungryMode={isHungryMode}
        isTacoMode={isTacoMode}
        onPeopleChange={setNumberOfPeople}
        onHungryModeChange={setIsHungryMode}
        onTacoModeChange={setIsTacoMode}
      />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <KpiCards
          presupuestoTotal={presupuestoTotal}
          costoPorPersona={costoPorPersona}
          totalKgCrudos={totalKgCrudos}
          totalKgCocidos={totalKgCocidos}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Donut chart — 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <BudgetDonutChart distribucion={distribucionPorCategoria} />
          </div>

          {/* Shopping table — 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <ShoppingTable items={items} />
          </div>
        </div>
      </main>

      {/* ── Festive menu section — visually breaks from the dark dashboard ── */}
      <div className="mt-8 overflow-hidden rounded-t-3xl">
        <MenuCarneAsada />
      </div>

      <footer className="bg-stone-50 border-t border-stone-200 py-4 text-center text-xs text-stone-400">
        Grill Dashboard · calculadora de insumos para carne asada 🔥
      </footer>
    </div>
  );
}
