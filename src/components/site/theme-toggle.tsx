"use client";

/**
 * No React state here on purpose. The current theme lives on
 * `document.documentElement[data-theme]`, and the indicator is driven straight
 * off that attribute in CSS, so there is nothing to hydrate and nothing to
 * flash.
 */
export function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
    el.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // private mode, no persistence, no problem
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="group grid h-7 w-7 place-items-center text-ink-muted transition-colors hover:text-ink"
    >
      <span className="relative block h-3.5 w-3.5 overflow-hidden rounded-full border border-current">
        <span className="theme-dot absolute inset-0 bg-current" />
      </span>
    </button>
  );
}

/**
 * Runs before paint so the theme never flashes. Kept as a raw string because it
 * has to be inlined in <head>.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;
