import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Mark } from "@/components/mark";
import { Shell } from "@/components/site/section";
import { formatDate, getPost, getPosts } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Shell>
      <article className="py-28 sm:py-36">
        <Link
          href="/writing"
          className="link mono text-[0.72rem] text-ink-faint hover:text-ink"
        >
          <span aria-hidden>←</span> Writing
        </Link>

        <header className="mt-8 max-w-3xl border-b border-line pb-10">
          <h1 className="display text-[clamp(2.2rem,6vw,4rem)]">{post.title}</h1>
          {post.summary ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {post.summary}
            </p>
          ) : null}
          <p className="mono mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] text-ink-faint">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime}</span>
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        </header>

        <div className="prose mt-12 max-w-2xl">
          <MDXRemote
            source={post.body}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-line pt-8">
          <Link href="/writing" className="link mono text-[0.75rem] text-ink-muted">
            <span aria-hidden>←</span> All writing
          </Link>
          <Mark className="h-4 w-4 text-line-strong" />
        </div>
      </article>
    </Shell>
  );
}
