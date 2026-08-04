import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  index,
  title,
  aside,
  children,
  className,
}: {
  id: string;
  index: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-line", className)}>
      <Shell>
        <div className="grid grid-cols-1 gap-y-8 py-16 sm:py-20 lg:grid-cols-12 lg:gap-x-10 lg:py-28">
          <header className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-baseline gap-3 lg:block">
                <span className="label">{index}</span>
                <h2 className="display mt-0 text-2xl lg:mt-3 lg:text-[2rem]">{title}</h2>
              </div>
              {aside ? (
                <div className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                  {aside}
                </div>
              ) : null}
            </div>
          </header>

          <div className="lg:col-span-9">{children}</div>
        </div>
      </Shell>
    </section>
  );
}
