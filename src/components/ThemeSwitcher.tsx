import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { ThemeMode } from './ThemeProvider';

const options: Array<{
  value: ThemeMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const current =
    options.find((option) => option.value === theme) ?? options[2];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () =>
      document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const CurrentIcon = current.icon;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}`}
        className="flex h-10 items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-3 text-sm font-semibold text-[var(--app-text)] transition hover:border-[var(--app-brand)]"
      >
        <CurrentIcon className="h-4 w-4 text-[var(--app-brand)]" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[var(--app-muted)] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-40 overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-1.5 shadow-xl"
        >
          {options.map((option) => {
            const Icon = option.icon;
            const selected = option.value === theme;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  selected
                    ? 'bg-[var(--app-brand-soft)] text-[var(--app-brand)]'
                    : 'text-[var(--app-text)] hover:bg-[var(--app-surface-2)]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {option.label}
                </span>

                {selected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
