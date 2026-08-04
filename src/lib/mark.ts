/**
 * The mark.
 *
 * An eight-tip spark with four long arms and four short ones, so it reads as
 * part compass, part sparkle. Same numbers drive the SVG logo and the extruded
 * 3D object in the hero, which is the only way those two ever stay in sync.
 */

const TIPS = 8;
const R_LONG = 50;
const R_SHORT = 32;
const R_INNER = 12;

export type Pt = [number, number];

/** Tips and the control points that pull the edges back toward the centre. */
export function markGeometry(scale = 1) {
  const tips: Pt[] = [];
  const ctrls: Pt[] = [];

  for (let i = 0; i < TIPS; i++) {
    const angle = (-90 + (360 / TIPS) * i) * (Math.PI / 180);
    const radius = (i % 2 === 0 ? R_LONG : R_SHORT) * scale;
    tips.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);

    const bisector = angle + Math.PI / TIPS;
    ctrls.push([
      Math.cos(bisector) * R_INNER * scale,
      Math.sin(bisector) * R_INNER * scale,
    ]);
  }

  return { tips, ctrls };
}

const round = (n: number) => Math.round(n * 100) / 100;

/** SVG path for a 100x100 viewBox. */
export function markPath(cx = 50, cy = 50, scale = 1) {
  const { tips, ctrls } = markGeometry(scale);
  let d = `M ${round(tips[0][0] + cx)} ${round(tips[0][1] + cy)}`;

  for (let i = 0; i < tips.length; i++) {
    const c = ctrls[i];
    const next = tips[(i + 1) % tips.length];
    d += ` Q ${round(c[0] + cx)} ${round(c[1] + cy)} ${round(next[0] + cx)} ${round(
      next[1] + cy,
    )}`;
  }

  return `${d} Z`;
}

export const MARK_PATH = markPath();
