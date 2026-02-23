import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Base card container matching the dark dashboard palette. */
export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function CardHeader({ title, description, icon }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
      {icon && (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-amber-400">
          {icon}
        </span>
      )}
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        )}
      </div>
    </div>
  );
}
