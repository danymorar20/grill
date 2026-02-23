'use client';

import { Flame, Users, Zap, Beef } from 'lucide-react';
import { Toggle } from '@/app/components/ui/Toggle';

interface ControlRoomProps {
  numberOfPeople: number;
  isHungryMode: boolean;
  isTacoMode: boolean;
  onPeopleChange: (n: number) => void;
  onHungryModeChange: (v: boolean) => void;
  onTacoModeChange: (v: boolean) => void;
}

export function ControlRoom({
  numberOfPeople,
  isHungryMode,
  isTacoMode,
  onPeopleChange,
  onHungryModeChange,
  onTacoModeChange,
}: ControlRoomProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Brand row */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/30">
            <Flame className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-white tracking-tight">
              Grill Dashboard
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">
              Calculadora de insumos para carne asada
            </p>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8">
          {/* Guests slider */}
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Users className="h-3.5 w-3.5" />
                Número de invitados
              </label>
              <span className="rounded-md bg-amber-500/10 px-2.5 py-0.5 text-lg font-bold text-amber-400 ring-1 ring-amber-500/30">
                {numberOfPeople}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={numberOfPeople}
              onChange={(e) => onPeopleChange(Number(e.target.value))}
              aria-label="Número de invitados"
              className="
                h-2 w-full cursor-pointer appearance-none rounded-full
                bg-slate-700 accent-amber-500
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-amber-400
                [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none
                [&::-moz-range-thumb]:bg-amber-400
              "
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-600 select-none">
              <span>1</span>
              <span>30</span>
            </div>
          </div>

          {/* Mode toggles */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <label className="flex cursor-pointer items-center gap-3">
              <div>
                <p className="flex items-center gap-1 text-xs font-medium text-slate-300">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  Modo Hambriento
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  ×1.3 en todas las porciones
                </p>
              </div>
              <Toggle
                checked={isHungryMode}
                onCheckedChange={onHungryModeChange}
                aria-label="Activar modo hambriento"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <div>
                <p className="flex items-center gap-1 text-xs font-medium text-slate-300">
                  <Beef className="h-3.5 w-3.5 text-amber-400" />
                  Modo Taco
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  +40% tortillas · −15% carne directa
                </p>
              </div>
              <Toggle
                checked={isTacoMode}
                onCheckedChange={onTacoModeChange}
                aria-label="Activar modo taco"
              />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}
