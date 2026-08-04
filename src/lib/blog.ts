import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
  readingTime: string;
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "writing");

function listFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .filter((file) => !file.startsWith("_"));
}

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = String(data.slug ?? file.replace(/\.mdx?$/, ""));

  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingTime: readingTime(content).text,
    body: content,
  };
}

/** Newest first. Drafts are hidden in production, visible while developing. */
export function getPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV === "development";

  return listFiles()
    .map(parse)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  return getPosts().find((post) => post.slug === slug) ?? null;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
