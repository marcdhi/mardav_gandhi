"use client";

import { motion, useReducedMotion } from "motion/react";
import { Shell } from "@/components/site/section";
import { RevealWords } from "@/components/site/reveal";
import { Spark } from "@/components/three/spark";
import { profile } from "@/content/profile";
import { hackathons, hackathonStats } from "@/content/hackathons";
import { projects } from "@/content/projects";

// Derived, so the numbers can never drift from the lists below them.
const stats = [
  { value: String(hackathonStats.total), label: "hackathons" },
  { value: String(hackathonStats.awards), label: "prizes" },
  { value: String(projects.length), label: "projects" },
  { value: "112", label: "repos" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-16">
      <div className="ruled pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <Shell className="relative">
        <div className="grid min-h-[calc(100svh-4rem)] grid-cols-1 items-center gap-y-10 py-14 lg:grid-cols-12 lg:gap-x-10 lg:py-0">
          <div className="lg:col-span-7">
            <motion.p {...fade(0)} className="label flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.role} at {profile.company}
            </motion.p>

            <h1 className="display mt-6 text-[clamp(2.9rem,10vw,6.5rem)]">
              <RevealWords text="Mardav" delay={0.05} />
              <br />
              <span className="text-ink-faint">
                <RevealWords text="Gandhi" delay={0.15} />
              </span>
            </h1>

            <motion.p
              {...fade(0.42)}
              className="mt-7 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {profile.intro}
            </motion.p>

            <motion.div {...fade(0.52)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="mono rounded-sm bg-ink px-4 py-2.5 text-[0.78rem] text-paper transition-opacity hover:opacity-85"
              >
                Say hello
              </a>
              <a
                href={profile.resume}
                className="mono rounded-sm border border-line-strong px-4 py-2.5 text-[0.78rem] transition-colors hover:border-ink"
              >
                Resume
              </a>
              <span className="mono hidden text-[0.72rem] text-ink-faint sm:inline">
                or press ⌘K
              </span>
            </motion.div>

            <motion.dl
              {...fade(0.62)}
              className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="mono text-2xl">{stat.value}</dt>
                  <dd className="label mt-1 normal-case tracking-normal">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <Spark className="mx-auto h-[9rem] w-full max-w-sm cursor-grab active:cursor-grabbing sm:h-[16rem] lg:h-[30rem] lg:max-w-none" />
            <p className="mono mt-2 text-center text-[0.68rem] text-ink-faint lg:mt-0">
              <span className="hidden lg:inline">it is watching. drag to spin, click to startle</span>
            </p>
          </motion.div>
        </div>
      </Shell>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const names = hackathons.map((h) => h.name);
  const strip = [...names, ...names];

  return (
    <div className="marquee relative border-y border-line bg-paper-raised/40 py-3">
      <div className="marquee-track">
        {strip.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="mono flex shrink-0 items-center gap-8 whitespace-nowrap px-4 text-[0.72rem] text-ink-faint"
          >
            {name}
            <span className="text-accent">+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
