export type Role = {
  title: string;
  period: string;
  mode?: string;
  points?: string[];
};

export type Job = {
  company: string;
  href?: string;
  kind: string;
  location: string;
  period: string;
  roles: Role[];
  current?: boolean;
};

export const work: Job[] = [
  {
    company: "Wells Fargo",
    href: "https://www.wellsfargo.com",
    kind: "Infrastructure and Observability",
    location: "Bangalore, India",
    period: "2024 - Present",
    current: true,
    roles: [
      {
        title: "Software Engineer",
        period: "Aug 2025 - Present",
        mode: "Onsite",
        points: [
          "Built VizAssist, an AI observability agent embedded in enterprise Grafana so on-call engineers can query dashboards and live metrics in plain language.",
          "Built a Grafana MCP server in Python with FastMCP, sitting on top of the Prometheus and Grafana stack.",
          "Built a self-service logging onboarding portal with Spring Boot, React, Git, Ansible, Cribl and Splunk that cut annual support tickets from 4000+ to under 60, then layered an agentic MCP workflow on top of it.",
        ],
      },
      {
        title: "Analyst Intern",
        period: "May 2024 - Jul 2024",
        mode: "Onsite",
      },
    ],
  },
  {
    company: "Lexify AI",
    kind: "Legal AI for Indian law firms",
    location: "Remote",
    period: "2024 - 2025",
    roles: [
      {
        title: "Co-founder",
        period: "2024 - 2025",
        mode: "Remote",
        points: [
          "Ran it end to end: product, architecture, code and go to market.",
          "Onboarded the first paying clients and shipped drafting, case research and client workflows on a multi-agent runtime.",
        ],
      },
    ],
  },
  {
    company: "Devfolio",
    kind: "NITK x Devfolio partnership program",
    location: "Karnataka, India",
    period: "2023 - Present",
    roles: [
      { title: "UniDAO Lead", period: "Jul 2024 - Present", mode: "Remote" },
      { title: "UniDAO Core Team", period: "Nov 2023 - Mar 2024", mode: "Remote" },
    ],
  },
  {
    company: "NITKRacing",
    kind: "Formula student team, web",
    location: "Mangaluru, Karnataka",
    period: "2023 - Present",
    roles: [
      { title: "Web Team Lead", period: "Mar 2024 - Present", mode: "Remote" },
      { title: "Web Developer", period: "Nov 2023 - Mar 2024", mode: "Hybrid" },
    ],
  },
  {
    company: "Web Enthusiasts' Club NITK",
    kind: "Technical club",
    location: "Mangaluru, Karnataka",
    period: "2022 - Present",
    roles: [
      { title: "GDG Chair", period: "Mar 2024 - Present" },
      { title: "Executive Member", period: "Nov 2022 - Mar 2024" },
      { title: "Student Member", period: "Jun 2022 - Nov 2022" },
    ],
  },
  {
    company: "MACS-G",
    kind: "Project internship",
    location: "Dubai, Remote",
    period: "Jul 2023 - Apr 2024",
    roles: [{ title: "Project Intern", period: "Jul 2023 - Apr 2024", mode: "Remote" }],
  },
];

export const education = [
  {
    school: "National Institute of Technology Karnataka",
    href: "https://www.nitk.ac.in",
    detail: "B.Tech in Mechanical Engineering, Minor in Computer Science",
    location: "Surathkal, Karnataka",
    period: "2021 - 2025",
  },
  {
    school: "Green Valley High School",
    detail: "11th and 12th grade",
    location: "Vadodara, Gujarat",
    period: "2018 - 2020",
  },
];
