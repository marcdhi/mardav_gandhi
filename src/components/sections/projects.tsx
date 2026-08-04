"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Section } from "@/components/site/section";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0]?.name ?? null);
  const reduce = useReducedMotion();

  return (
    <Section
      id="projects"
      index="02"
      title="Projects"
      aside={
        <p>
          Ten worth showing. Most started as a weekend build, a few turned into
          something people pay for.
        </p>
      }
    >
      <ul className="border-t border-line">
        {projects.map((project, i) => {
          const isOpen = open === project.name;

          return (
            <li key={project.name} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : project.name)}
                aria-expanded={isOpen}
                className="group grid w-full grid-cols-1 items-baseline gap-x-6 gap-y-1 py-5 text-left sm:grid-cols-12"
              >
                <span className="mono text-[0.7rem] text-ink-faint sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="sm:col-span-4">
                  <span
                    className={cn(
                      "display block text-2xl transition-transform duration-500 ease-out sm:text-[1.75rem]",
                      "group-hover:translate-x-1",
                      isOpen && "text-accent",
                    )}
                  >
                    {project.name}
                  </span>
                </span>

                <span className="text-sm text-ink-muted sm:col-span-5">
                  {project.summary}
                </span>

                <span className="mono flex items-center justify-between gap-3 text-[0.7rem] text-ink-faint sm:col-span-2 sm:justify-end">
                  {project.period}
                  <span
                    className={cn(
                      "inline-block transition-transform duration-500 ease-out",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 pb-8 sm:grid-cols-12">
                      <div className="sm:col-span-1" />
                      <div className="sm:col-span-9">
                        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
                          {project.description}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="mono rounded-sm border border-line px-2 py-1 text-[0.68rem] text-ink-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                          {project.note ? (
                            <span className="mono text-[0.7rem] text-accent">
                              {project.note}
                            </span>
                          ) : null}
                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="link mono text-[0.72rem]"
                            >
                              Open
                              <span aria-hidden>↗</span>
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <a
        href={profile.socials[0].href}
        target="_blank"
        rel="noreferrer noopener"
        className="link mono mt-6 inline-flex text-[0.78rem] text-ink-muted hover:text-ink"
      >
        Everything else on GitHub
        <span aria-hidden>↗</span>
      </a>
    </Section>
  );
}
