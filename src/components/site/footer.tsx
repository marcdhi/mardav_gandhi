import Link from "next/link";
import { Mark } from "@/components/mark";
import { Shell } from "@/components/site/section";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Shell>
        <div className="flex flex-col gap-10 py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="label">Get in touch</p>
              <a
                href={`mailto:${profile.email}`}
                className="link display mt-3 block text-3xl sm:text-5xl"
              >
                {profile.email}
              </a>
            </div>

            <Mark className="h-10 w-10 shrink-0 text-line-strong" />
          </div>

          <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link mono text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
              <Link
                href={profile.resume}
                className="link mono text-[0.78rem] text-ink-muted transition-colors hover:text-ink"
              >
                Resume
              </Link>
            </div>

            <p className="mono text-[0.7rem] text-ink-faint">
              {profile.name}, {new Date().getFullYear()}. Built in Next.js.
            </p>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
