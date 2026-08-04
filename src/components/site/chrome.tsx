"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { CommandPalette } from "@/components/site/command-palette";
import { Nav } from "@/components/site/nav";

export function Chrome() {
  const [open, setOpen] = useState(false);
  // Bumped on every open so the palette mounts fresh, which resets its query
  // and selection without an effect.
  const [session, setSession] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  const openPalette = useCallback(() => {
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((wasOpen) => {
          if (!wasOpen) setSession((n) => n + 1);
          return !wasOpen;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[65] h-px origin-left bg-accent"
        aria-hidden="true"
      />
      <Nav onOpenPalette={openPalette} />
      <CommandPalette key={session} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
