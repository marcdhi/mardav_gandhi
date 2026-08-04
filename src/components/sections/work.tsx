import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { work, education } from "@/content/work";

export function Work() {
  return (
    <Section
      id="work"
      index="01"
      title="Work"
      aside={<p>Full time, part time, and a company I started with a friend.</p>}
    >
      <ol className="border-t border-line">
        {work.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.04}>
            <li className="group grid grid-cols-1 gap-x-8 gap-y-4 border-b border-line py-8 sm:grid-cols-12">
              <div className="sm:col-span-3">
                <p className="mono text-[0.72rem] text-ink-faint">{job.period}</p>
              </div>

              <div className="sm:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {job.href ? (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link display text-2xl sm:text-[1.75rem]"
                    >
                      {job.company}
                    </a>
                  ) : (
                    <h3 className="display text-2xl sm:text-[1.75rem]">{job.company}</h3>
                  )}

                  {job.current ? (
                    <span className="mono rounded-full bg-accent-soft px-2 py-0.5 text-[0.62rem] uppercase tracking-widest text-accent">
                      now
                    </span>
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-ink-muted">
                  {job.kind}
                  <span className="text-ink-faint"> · {job.location}</span>
                </p>

                <div className="mt-5 space-y-5">
                  {job.roles.map((role) => (
                    <div key={role.title} className="border-l border-line pl-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                        <p className="text-[0.95rem] font-medium">{role.title}</p>
                        <p className="mono text-[0.7rem] text-ink-faint">
                          {role.period}
                          {role.mode ? ` · ${role.mode}` : ""}
                        </p>
                      </div>

                      {role.points ? (
                        <ul className="mt-2.5 space-y-2">
                          {role.points.map((point) => (
                            <li
                              key={point}
                              className="relative pl-4 text-sm leading-relaxed text-ink-muted"
                            >
                              <span className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className="mt-12">
          <p className="label">Education</p>
          <ul className="mt-4 border-t border-line">
            {education.map((item) => (
              <li
                key={item.school}
                className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-5 sm:grid-cols-12"
              >
                <p className="mono text-[0.72rem] text-ink-faint sm:col-span-3">
                  {item.period}
                </p>
                <div className="sm:col-span-9">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link text-[0.95rem] font-medium"
                    >
                      {item.school}
                    </a>
                  ) : (
                    <p className="text-[0.95rem] font-medium">{item.school}</p>
                  )}
                  <p className="mt-1 text-sm text-ink-muted">
                    {item.detail}
                    <span className="text-ink-faint"> · {item.location}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
