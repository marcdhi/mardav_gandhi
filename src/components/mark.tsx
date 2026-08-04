import { MARK_PATH } from "@/lib/mark";
import { cn } from "@/lib/utils";

export function Mark({
  className,
  spin = false,
}: {
  className?: string;
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn(
        "block",
        spin && "transition-transform duration-700 ease-out group-hover:rotate-90",
        className,
      )}
    >
      <path d={MARK_PATH} fill="currentColor" />
    </svg>
  );
}
