import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Projects } from "@/components/sections/projects";
import { Hackathons } from "@/components/sections/hackathons";
import { WritingTeaser } from "@/components/sections/writing-teaser";
import { getPosts } from "@/lib/blog";

export default function Home() {
  const posts = getPosts();

  return (
    <>
      <Hero />
      <Work />
      <Projects />
      <Hackathons />
      <WritingTeaser posts={posts} />
    </>
  );
}
