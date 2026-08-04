import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { formatDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building things, and on what broke on the way there.",
};

export default function WritingIndex() {
  const posts = getPosts();

  return (
    <Shell>
      <div className="py-28 sm:py-36">
        <header className="max-w-2xl">
          <p className="label">Writing</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,7vw,4.5rem)]">
            Notes, mostly
            <br />
            <span className="text-ink-faint">about building</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            Short pieces on engineering, agents, hackathons, and the things that only
            look obvious afterwards.
          </p>
        </header>

        <div className="mt-16">
          {posts.length === 0 ? (
            <div className="border border-dashed border-line-strong px-6 py-20 text-center">
              <p className="display text-2xl sm:text-3xl">Nothing here yet</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                The first post is on its way. In the meantime, most of what I would
                write about is sitting in the projects section.
              </p>
              <Link
                href="/#projects"
                className="link mono mt-8 inline-flex text-[0.75rem] text-ink-muted hover:text-ink"
              >
                Go look at those instead
              </Link>
            </div>
          ) : (
            <ul className="border-t border-line">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.04}>
                  <li className="border-b border-line">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-2 py-7 sm:grid-cols-12"
                    >
                      <span className="mono text-[0.7rem] text-ink-faint sm:col-span-2">
                        {formatDate(post.date)}
                      </span>

                      <span className="sm:col-span-7">
                        <span className="display block text-2xl transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-[1.75rem]">
                          {post.title}
                          {post.draft ? (
                            <span className="mono ml-2 align-middle text-[0.6rem] uppercase tracking-widest text-accent">
                              draft
                            </span>
                          ) : null}
                        </span>
                        {post.summary ? (
                          <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ink-muted">
                            {post.summary}
                          </span>
                        ) : null}
                      </span>

                      <span className="mono flex flex-wrap gap-2 text-[0.7rem] text-ink-faint sm:col-span-3 sm:justify-end">
                        {post.tags.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                        <span>{post.readingTime}</span>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Shell>
  );
}
