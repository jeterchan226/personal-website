// React island: light/dark switch. The initial theme is set by the inline script in BaseLayout;
// this button flips it and remembers the choice in localStorage.
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked (private mode); the switch still works for this page.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {/* Before hydration `theme` is null; render a fixed-size placeholder to avoid layout shift. */}
      <span aria-hidden="true" className="block size-5 text-center leading-5">
        {theme === null ? '' : theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  );
}
