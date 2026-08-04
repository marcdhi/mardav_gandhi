"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Mark } from "@/components/mark";
import { Section } from "@/components/site/section";
import { hackathons, hackathonStats } from "@/content/hackathons";
import { cn } from "@/lib/utils";

export function Hackathons() {
  const [winsOnly, setWinsOnly] = useState(false);
  const reduce = useReducedMotion();

  const shown = useMemo(
    () => (winsOnly ? hackathons.filter((h) => h.awards.length > 0) : hackathons),
    [winsOnly],
  );

  return (
    <Section
      id="hackathons"
      index="03"
      title="Hackathons"
      aside={
        <p>
          The part of the resume I actually like. {hackathonStats.total} of them,{" "}
          {hackathonStats.wins} with something to take home.
        </p>
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
        <dl className="flex gap-9">
          {[
            { value: hackathonStats.total, label: "entered" },
            { value: hackathonStats.wins, label: "placed" },
            { value: hackathonStats.awards, label: "prizes" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="mono text-3xl">{stat.value}</dt>
              <dd className="label mt-1 normal-case tracking-normal">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => setWinsOnly((v) => !v)}
          aria-pressed={winsOnly}
          className={cn(
            "mono rounded-sm border px-3 py-1.5 text-[0.72rem] transition-colors",
            winsOnly
              ? "border-accent bg-accent-soft text-accent"
              : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
          )}
        >
          {winsOnly ? "showing wins" : "wins only"}
        </button>
      </div>

      <motion.ul layout className="mt-8 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((event) => {
            const won = event.awards.length > 0;

            return (
              <motion.li
                key={event.name}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-paper p-6 transition-colors hover:bg-paper-raised"
              >
                {won ? (
                  <Mark className="absolute right-5 top-5 h-3.5 w-3.5 text-accent opacity-70 transition-transform duration-700 ease-out group-hover:rotate-90" />
                ) : null}

                <p className="mono text-[0.7rem] text-ink-faint">
                  {event.date} / {event.location}
                </p>

                <h3 className="display mt-2 pr-8 text-xl">{event.name}</h3>
                {event.host ? (
                  <p className="mono mt-1 text-[0.7rem] text-ink-faint">by {event.host}</p>
                ) : null}

                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  <span className="text-ink">{event.project}.</span> {event.blurb}
                </p>

                {won ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {event.awards.map((award) => (
                      <li
                        key={award}
                        className="mono rounded-sm bg-accent-soft px-2 py-1 text-[0.65rem] leading-tight text-accent"
                      >
                        {award}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
