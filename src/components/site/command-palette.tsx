"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mark } from "@/components/mark";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Elsewhere" | "Display";
  run: (ctx: { go: (href: string) => void }) => void;
};

const commands: Command[] = [
  {
    id: "top",
    label: "Top",
    hint: "home",
    group: "Navigate",
    run: ({ go }) => go("/"),
  },
  { id: "work", label: "Work", hint: "where I have been", group: "Navigate", run: ({ go }) => go("/#work") },
  {
    id: "projects",
    label: "Projects",
    hint: "things I built",
    group: "Navigate",
    run: ({ go }) => go("/#projects"),
  },
  {
    id: "hackathons",
    label: "Hackathons",
    hint: "weekends spent well",
    group: "Navigate",
    run: ({ go }) => go("/#hackathons"),
  },
  {
    id: "writing",
    label: "Writing",
    hint: "notes and posts",
    group: "Navigate",
    run: ({ go }) => go("/writing"),
  },
  ...profile.socials.map((s) => ({
    id: s.label.toLowerCase(),
    label: s.label,
    hint: s.handle,
    group: "Elsewhere" as const,
    run: ({ go }: { go: (href: string) => void }) => go(s.href),
  })),
  {
    id: "resume",
    label: "Resume",
    hint: "pdf",
    group: "Elsewhere",
    run: ({ go }) => go(profile.resume),
  },
  {
    id: "theme",
    label: "Toggle theme",
    hint: "light and dark",
    group: "Display",
    run: () => {
      const el = document.documentElement;
      const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
      el.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // no persistence available
      }
    },
  },
];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [query]);

  const go = useCallback(
    (href: string) => {
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
    },
    [router],
  );

  const runCommand = useCallback(
    (command: Command) => {
      command.run({ go });
      onClose();
    },
    [go, onClose],
  );

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => (i + 1) % Math.max(results.length, 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const command = results[active];
        if (command) runCommand(command);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, runCommand]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close command menu"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-paper-sunk/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-md border border-line-strong bg-paper-raised shadow-2xl shadow-black/10"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Mark className="h-3 w-3 shrink-0 text-accent" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Jump to"
                className="mono h-12 w-full bg-transparent text-sm outline-none focus-visible:outline-none placeholder:text-ink-faint"
              />
              <kbd className="mono hidden rounded-sm border border-line px-1.5 py-0.5 text-[0.65rem] text-ink-faint sm:block">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="mono px-4 py-6 text-center text-xs text-ink-faint">
                  Nothing here
                </p>
              ) : (
                results.map((command, i) => {
                  const showGroup = command.group !== lastGroup;
                  lastGroup = command.group;

                  return (
                    <div key={command.id}>
                      {showGroup ? (
                        <p className="label px-4 pb-1.5 pt-3">{command.group}</p>
                      ) : null}
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => runCommand(command)}
                        className={cn(
                          "flex w-full items-baseline justify-between gap-4 px-4 py-2 text-left transition-colors",
                          i === active ? "bg-accent-soft text-ink" : "text-ink-muted",
                        )}
                      >
                        <span className="text-sm">{command.label}</span>
                        <span className="mono truncate text-[0.7rem] text-ink-faint">
                          {command.hint}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
