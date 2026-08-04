export type Project = {
  name: string;
  period: string;
  summary: string;
  description: string;
  stack: string[];
  href?: string;
  note?: string;
  featured?: boolean;
};

/**
 * Drop a `href` on any project to make its row clickable.
 * Everything else renders fine without one.
 */
export const projects: Project[] = [
  {
    name: "Sadak",
    period: "2026",
    featured: true,
    note: "Sarvam Epoch Buildathon",
    summary: "A 3D open world game for learning Indian languages.",
    description:
      "A GTA style open world where you learn a language by talking your way through a city. Hail the auto and bargain the fare down, order at the kachori stall, buy a bus ticket, all spoken in the target language. Speech runs through Sarvam and LiveKit, the world runs on React Three Fiber.",
    stack: ["Next.js", "Sarvam Speech", "LiveKit", "Three.js", "React Three Fiber"],
  },
  {
    name: "Lawveo",
    period: "2025",
    featured: true,
    summary: "AI platform for Indian law firms.",
    description:
      "Drafting, case research and client work in one place. Lexi Fast and Lexi Research modes run on a LangGraph multi-agent runtime with filesystem-first document editing and block-anchored diffs, over an index of 1.7 crore High Court judgments.",
    stack: [
      "LangGraph",
      "FastAPI",
      "Spring Boot",
      "Qdrant",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "React",
      "Kubernetes",
      "AWS",
    ],
  },
  {
    name: "m2m",
    period: "2025",
    featured: true,
    summary: "Proactive marketing assistant.",
    description:
      "An AI-native workspace for campaign planning, content drafting and automated social posting. Streaming chat on the Vercel AI SDK with Gemini 2.5, an artifact canvas, approval flows, and LinkedIn posting through Composio.",
    stack: ["Next.js", "Vercel AI SDK", "Postgres", "Redis", "Composio"],
  },
  {
    name: "Khoj",
    period: "2024",
    featured: true,
    note: "ETHIndia'24",
    summary: "Geo-location treasure hunt, on chain.",
    description:
      "Khoj means search. A gamified treasure hunt that puts real world exploration on chain: clues drop at coordinates, proofs are verified, and rewards settle without a middleman. Top 10 finalist at ETHIndia'24 with five sponsor prizes.",
    stack: ["React", "Solidity", "Tailwind CSS", "Base", "Lit Protocol"],
  },
  {
    name: "JusticeChain",
    period: "2024",
    note: "Unfold'24",
    summary: "Simulate a courtroom with AI agents.",
    description:
      "A blockchain-based platform where AI agents argue both sides of a case and the verdict is recorded on chain. Built to poke at what dispute resolution could look like when the record is public by default.",
    stack: ["React", "Solidity", "Move", "Tailwind CSS"],
  },
  {
    name: "HashMind",
    period: "2024",
    note: "ETHOnline'24",
    summary: "A marketplace of AI agents for finance.",
    description:
      "Why trust one model when you can run an army of specialists. A decentralised, crowd-sourced marketplace where AI investment advisors compete, get rated, and get paid. Won the Hedera and Galadriel tracks.",
    stack: ["Next.js", "PostgreSQL", "Strapi", "Hedera", "Tailwind CSS"],
  },
  {
    name: "WebClub NITK",
    period: "2024",
    summary: "A full rebuild of the club site.",
    description:
      "Revamped the site for the Web Enthusiasts' Club at NITK: blog, events and a membership system, built to be handed off and maintained by the next batch.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Strapi", "Tailwind CSS"],
  },
  {
    name: "Harveeco",
    period: "2023",
    note: "ETHIndia'23",
    href: "https://github.com/marcdhi/harveeco",
    summary: "Blockchain and IoT for Indian farmers.",
    description:
      "A transparent agricultural supply chain using blockchain, machine learning and IoT so growers keep more of what they earn. Won the Filecoin and Lighthouse tracks at ETHIndia'23.",
    stack: ["Next.js", "FastAPI", "Filecoin", "IPFS", "Tailwind CSS"],
  },
  {
    name: "DoxifyAI",
    period: "2023",
    summary: "Document an entire codebase in a few clicks.",
    description:
      "Point it at a repo and get docs out in PDF, HTML or Markdown. The whole pipeline is model-driven. Started at a hackathon, then kept growing across three more.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    name: "Comicify",
    period: "2023",
    summary: "Fuzzy text in, comic strip out.",
    description:
      "Paste in a messy blob of text and get back a comic strip. First runner up at Warpspeed, then won Planet AI after adding custom characters and captions.",
    stack: ["Next.js", "FastAPI", "Python", "Tailwind CSS"],
  },
];
