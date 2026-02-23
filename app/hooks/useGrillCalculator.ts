'use client';

/**
 * useGrillCalculator
 *
 * Orchestrates UI state and delegates all arithmetic to the pure
 * functions in `lib/calculators.ts`.
 *
 * Responsibilities of this hook (Single Responsibility):
 *  – Own the three pieces of UI state (numberOfPeople, isHungryMode, isTacoMode)
 *  – Memoize derived calculations to avoid redundant work
 *  – Expose a stable, typed surface to consumer components
 *
 * It depends on abstractions (the calc functions' signatures), not on
 * concrete implementations — satisfying the Dependency Inversion principle.
 */

import { useMemo, useState } from 'react';

import { INVENTARIO_ASADA } from '@/app/constants/inventario';
import {
  calcAllInsumos,
  calcDistribucionPorCategoria,
  calcKpis,
} from '@/app/lib/calculators';
import type {
  GrillCalculatorReturn,
  GrillParameters,
} from '@/app/types/grill';

const INITIAL_STATE: GrillParameters = {
  numberOfPeople: 3,
  isHungryMode: false,
  isTacoMode: false,
};

export function useGrillCalculator(): GrillCalculatorReturn {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(
    INITIAL_STATE.numberOfPeople,
  );
  const [isHungryMode, setIsHungryMode] = useState<boolean>(
    INITIAL_STATE.isHungryMode,
  );
  const [isTacoMode, setIsTacoMode] = useState<boolean>(
    INITIAL_STATE.isTacoMode,
  );

  // Stable params object — only recreated when a dependency changes
  const params: GrillParameters = useMemo(
    () => ({ numberOfPeople, isHungryMode, isTacoMode }),
    [numberOfPeople, isHungryMode, isTacoMode],
  );

  const items = useMemo(
    () => calcAllInsumos(INVENTARIO_ASADA, params),
    [params],
  );

  const kpis = useMemo(
    () => calcKpis(items, numberOfPeople),
    [items, numberOfPeople],
  );

  const distribucionPorCategoria = useMemo(
    () => calcDistribucionPorCategoria(items),
    [items],
  );

  return {
    // state
    numberOfPeople,
    isHungryMode,
    isTacoMode,
    // actions
    setNumberOfPeople,
    setIsHungryMode,
    setIsTacoMode,
    // calculations
    items,
    distribucionPorCategoria,
    ...kpis,
  };
}
