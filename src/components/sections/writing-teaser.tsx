import Link from "next/link";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { formatDate, type Post } from "@/lib/blog";

export function WritingTeaser({ posts }: { posts: Post[] }) {
  return (
    <Section
      id="writing"
      index="04"
      title="Writing"
      aside={<p>Notes on what I am building, and what broke on the way there.</p>}
    >
      {posts.length === 0 ? (
        <Reveal>
          <div className="border border-dashed border-line-strong px-6 py-14 text-center">
            <p className="display text-2xl">Nothing published yet</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
              The first post is being written. Until then, the code is the writing.
            </p>
            <Link
              href="/writing"
              className="link mono mt-6 inline-flex text-[0.75rem] text-ink-muted hover:text-ink"
            >
              Check back
            </Link>
          </div>
        </Reveal>
      ) : (
        <>
          <ul className="border-t border-line">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <li className="border-b border-line">
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 py-6 sm:grid-cols-12"
                  >
                    <span className="mono text-[0.7rem] text-ink-faint sm:col-span-3">
                      {formatDate(post.date)}
                    </span>
                    <span className="sm:col-span-6">
                      <span className="display block text-xl transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-2xl">
                        {post.title}
                      </span>
                      {post.summary ? (
                        <span className="mt-1 block text-sm text-ink-muted">
                          {post.summary}
                        </span>
                      ) : null}
                    </span>
                    <span className="mono text-[0.7rem] text-ink-faint sm:col-span-3 sm:text-right">
                      {post.readingTime}
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>

          <Link
            href="/writing"
            className="link mono mt-6 inline-flex text-[0.78rem] text-ink-muted hover:text-ink"
          >
            All writing
          </Link>
        </>
      )}
    </Section>
  );
}
