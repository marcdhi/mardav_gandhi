import Link from "next/link";
import { MarkFace } from "@/components/mark-face";
import { Shell } from "@/components/site/section";

export default function NotFound() {
  return (
    <Shell>
      <div className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
        <MarkFace className="h-16 w-16 text-accent" />
        <p className="label mt-8">Error 404</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,8vw,5rem)]">
          Nothing at this address
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
          The page either moved or never existed. Both happen.
        </p>
        <Link
          href="/"
          className="link mono mt-8 text-[0.78rem] text-ink-muted hover:text-ink"
        >
          Back home
        </Link>
      </div>
    </Shell>
  );
}
