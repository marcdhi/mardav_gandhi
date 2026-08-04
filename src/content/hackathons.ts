export type Hackathon = {
  name: string;
  host?: string;
  date: string;
  year: number;
  location: string;
  project: string;
  blurb: string;
  awards: string[];
};

export const hackathons: Hackathon[] = [
  {
    name: "Sarvam Epoch Buildathon",
    host: "GrowthX",
    date: "Jul 2026",
    year: 2026,
    location: "Bengaluru",
    project: "Sadak",
    blurb:
      "A 3D open world where you learn an Indian language by talking your way through a city.",
    awards: [],
  },
  {
    name: "ETHIndia'24",
    date: "Dec 2024",
    year: 2024,
    location: "Bangalore",
    project: "Khoj",
    blurb: "A geo-location treasure hunt that settles rewards on chain.",
    awards: [
      "Top 10 Finalist",
      "True Network: Winner",
      "Polkadot: 2nd Runner Up",
      "Coinbase Developer Platform: Pool Prize",
      "Base: Pool Prize",
      "Lit Protocol: Pool Prize",
    ],
  },
  {
    name: "Unfold'24",
    date: "Dec 2024",
    year: 2024,
    location: "Bangalore",
    project: "JusticeChain",
    blurb: "Courtroom simulation with AI agents, verdicts recorded on chain.",
    awards: [],
  },
  {
    name: "ETHOnline'24",
    date: "Aug 2024",
    year: 2024,
    location: "Online",
    project: "HashMind",
    blurb: "A crowd-sourced marketplace of AI agents for finance.",
    awards: ["Hedera: Native Services Starter Bounty", "Galadriel: AI x Creator"],
  },
  {
    name: "Hackbangalore",
    host: "AngelHack",
    date: "May 2024",
    year: 2024,
    location: "Bangalore",
    project: "SocialRoots",
    blurb: "A recommender that connects investors to sustainability initiatives.",
    awards: [],
  },
  {
    name: "DevRev Forge",
    date: "Feb 2024",
    year: 2024,
    location: "Online",
    project: "Voice To Help",
    blurb:
      "A DevRev snap-in that turns customer chatter across platforms into tickets.",
    awards: ["2nd Place"],
  },
  {
    name: "LFGHO",
    date: "Jan 2024",
    year: 2024,
    location: "Online",
    project: "Quadrivo",
    blurb: "Permissionless credit delegation and project funding.",
    awards: [],
  },
  {
    name: "ETHIndia'23",
    date: "Dec 2023",
    year: 2023,
    location: "Bangalore",
    project: "Harveeco",
    blurb: "Blockchain, ML and IoT for a fairer agricultural supply chain.",
    awards: [
      "Filecoin and IPFS: Unique Projects in the Filecoin Ecosystem",
      "Lighthouse.storage: Best overall use of the Lighthouse SDK",
    ],
  },
  {
    name: "Soonami Venturethon 2",
    date: "Dec 2023",
    year: 2023,
    location: "Online",
    project: "RedocsAI",
    blurb: "Rebranded DoxifyAI and pushed the ML pipeline further.",
    awards: [],
  },
  {
    name: "ETHOnline'23",
    date: "Oct 2023",
    year: 2023,
    location: "Online",
    project: "Deano",
    blurb: "A decentralised, Kaggle-like platform for data annotation.",
    awards: [
      "Sismo: Most Creative",
      "Tableland: Best Use of Studio",
      "XMTP: Best Use",
    ],
  },
  {
    name: "Peerlist x Replit Generative AI Hackathon",
    date: "Sep 2023",
    year: 2023,
    location: "Online",
    project: "DoxifyAI",
    blurb: "Added code testing, refactoring and optimisation to the pipeline.",
    awards: [],
  },
  {
    name: "NivHack",
    host: "Niveus",
    date: "Aug 2023",
    year: 2023,
    location: "Mangalore",
    project: "IPOWiseAI",
    blurb: "Predicts IPO pricing from financials and market signals.",
    awards: ["Winner"],
  },
  {
    name: "Nexus Gen AI Rush",
    host: "The Product Folks",
    date: "Jul 2023",
    year: 2023,
    location: "Bangalore",
    project: "DoxifyAI",
    blurb: "Where DoxifyAI started: docs for a whole codebase in a few clicks.",
    awards: [],
  },
  {
    name: "Global AI Hackfest",
    host: "Planet AI",
    date: "Jun 2023",
    year: 2023,
    location: "Online",
    project: "Comicify",
    blurb: "Custom characters and captions on top of the comic generator.",
    awards: ["Winner"],
  },
  {
    name: "Warpspeed",
    host: "Lightspeed",
    date: "May 2023",
    year: 2023,
    location: "Bengaluru",
    project: "Comicify",
    blurb: "Paste in fuzzy text, get back a comic strip.",
    awards: ["First Runner Up", "Replit Track: Winner"],
  },
  {
    name: "HackToFuture",
    date: "Apr 2023",
    year: 2023,
    location: "Mangalore",
    project: "Notimiser",
    blurb: "Summarise a PDF and ask it questions.",
    awards: ["Winner"],
  },
];

export const hackathonStats = {
  total: hackathons.length,
  wins: hackathons.filter((h) => h.awards.length > 0).length,
  awards: hackathons.reduce((n, h) => n + h.awards.length, 0),
};
