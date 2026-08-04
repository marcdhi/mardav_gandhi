import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";

const site = "https://gandhimardav.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().map((post) => ({
    url: `${site}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  return [
    { url: site, lastModified: new Date(), priority: 1 },
    { url: `${site}/writing`, lastModified: new Date(), priority: 0.8 },
    ...posts,
  ];
}
