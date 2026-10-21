// React island: Tech filter buttons for the projects list.
// The cards are plain HTML rendered at build time; this only toggles their `hidden` attribute,
// so the full list still shows when JavaScript is off.
import { useEffect, useState } from 'react';

interface Props {
  techs: string[];
  allLabel: string;
}

export default function TechFilter({ techs, allLabel }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    for (const card of document.querySelectorAll<HTMLElement>('[data-project-card]')) {
      const tech: string[] = JSON.parse(card.dataset.tech ?? '[]');
      card.hidden = selected !== null && !tech.includes(selected);
    }
  }, [selected]);

  const button = (label: string, value: string | null) => {
    const active = selected === value;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={active}
        // Clicking the active Tech again clears the filter.
        onClick={() => setSelected(active ? null : value)}
        className={
          'rounded-full border px-3 py-1 text-sm transition ' +
          (active
            ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
            : 'border-zinc-300 text-zinc-600 hover:border-zinc-500 dark:border-zinc-700 dark:text-zinc-400')
        }
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {button(allLabel, null)}
      {techs.map((tech) => button(tech, tech))}
    </div>
  );
}
