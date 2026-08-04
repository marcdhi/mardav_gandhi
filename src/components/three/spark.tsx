"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Mark } from "@/components/mark";

const SparkScene = dynamic(() => import("@/components/three/spark-scene"), {
  ssr: false,
});

/**
 * The 3D mark only loads on a pointer-capable screen wide enough to enjoy it,
 * and never when the visitor has asked for reduced motion. Everywhere else
 * gets the flat mark, which is the same shape anyway.
 */
export function Spark({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(wide.matches && fine.matches && !calm.matches);

    update();
    wide.addEventListener("change", update);
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);

    return () => {
      wide.removeEventListener("change", update);
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) {
    return (
      <div className={className}>
        <div className="grid h-full w-full place-items-center">
          <Mark className="h-20 w-20 text-accent sm:h-32 sm:w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <SparkScene />
    </div>
  );
}
