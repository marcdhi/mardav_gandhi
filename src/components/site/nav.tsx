"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/mark";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

export const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Writing", href: "/writing" },
];

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Deferred so the first paint matches the server, then corrects itself.
    const frame = requestAnimationFrame(() => {
      onScroll();
      setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[76rem] items-center justify-between gap-4 px-5 sm:h-16 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <Mark className="h-4 w-4 text-accent" spin />
          <span className="mono text-[0.8rem] tracking-tight">mardav</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active =
              item.href.startsWith("/writing") && pathname.startsWith("/writing");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link mono text-[0.78rem] text-ink-muted transition-colors hover:text-ink",
                  active && "text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenPalette}
            className="mono flex h-7 items-center gap-1.5 rounded-sm border border-line px-2 text-[0.7rem] text-ink-faint transition-colors hover:border-line-strong hover:text-ink"
            aria-label="Open menu"
          >
            {/* Doubles as the mobile navigation, since the palette is a list */}
            <span className="md:hidden">menu</span>
            <span className="hidden md:inline">{isMac ? "⌘" : "Ctrl"}</span>
            <span className="hidden md:inline">K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
