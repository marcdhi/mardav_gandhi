import { MARK_PATH } from "@/lib/mark";
import { cn } from "@/lib/utils";

/**
 * The flat version of the character. Same silhouette as {@link Mark}, but with
 * the face, so mobile and reduced-motion visitors meet the same creature the 3D
 * hero shows on a desktop. It blinks in CSS, which costs nothing.
 */
export function MarkFace({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="The spark, mascot of this site"
      className={cn("block mark-float", className)}
    >
      <path d={MARK_PATH} fill="currentColor" />
      <g className="mark-eyes" fill="#241611">
        <ellipse cx="43.2" cy="47" rx="3.1" ry="4.1" />
        <ellipse cx="56.8" cy="47" rx="3.1" ry="4.1" />
      </g>
    </svg>
  );
}
