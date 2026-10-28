import { getKayoGridSpec, kayoSpace } from '../../foundations/tokens';

/** Height of the logo/bell row's own content (both are 38px tall). */
const HEADER_ROW_CONTENT_HEIGHT = 38;
/** Attendance triangle band: 12dp gap above the 24dp Triangles row. */
const ATTENDANCE_TRIANGLES_BAND = 12 + 24;
/** Attendance: red under the triangle band that the day-progress card overlaps (Figma bottom padding). */
const ATTENDANCE_BOTTOM_RED = 64;
/** Attendance: gap between the triangle band and the day-progress card's top edge. */
const ATTENDANCE_BAND_TO_CARD = 12;
/** Students waves band: the 24dp waves row with 8dp of red above and below. */
const STUDENTS_WAVES_BAND = 40;
/** Half the 52dp clay class track, so it straddles the canopy edge. */
const STUDENTS_TRACK_OVERLAP = 26;

export type BackdropPatternVariant = 'dashboard' | 'students' | 'attendance' | 'payments';

export interface BrandedScreenBackdropSpec {
  edgeBleed: number;
  contentInset: number;
  canopyHeight: number;
  canopyRadius: number;
  headerHeight: number;
  headerIncludedInCanopy: boolean;
  heroMinHeight: number;
  /** Space between the hero (title) and the overlapping content card. */
  titleToContentGap: number;
  contentOverlap: number;
  afterOverlapGap: number;
  minimumFlowHeight: number;
  topPull: number;
}

export function getBrandedScreenBackdropSpec(
  width: number,
  variant: BackdropPatternVariant = 'dashboard'
): BrandedScreenBackdropSpec {
  const grid = getKayoGridSpec(width);
  const compact = width < 640;
  const headerHeight = compact ? 64 : 68;
  const afterOverlapGap = compact ? 16 : 20;

  // Dashboard (Figma "Home · v3 canopy + notifiers", 2026-10-03): the hero is just the name, so it
  // sizes to the title instead of a fixed 132 min (which left ~100dp of empty red above the card);
  // the next-class card sits 24dp under the name and the red runs 152dp down behind it.
  // Students (Figma "Students · v2", 2026-10-04): status line + search, a 40dp waves band, then the
  // clay class track overlapping by half its height. Content-sized like the dashboard.
  // Attendance (Figma "Attendance v4 / Overview canopy", 2026-10-08): title, week strip (actionSlot,
  // not counted - it grows the canopy), the triangle band, then 64dp of red the day card overlaps.
  // Payments (Figma "Payments v2 · FINAL", 2026-10-09) reuses the attendance canopy: title, month row
  // (actionSlot), its own sprout band in the same 24dp row, then red the Gullak hero overlaps.
  const triangleCanopy = variant === 'attendance' || variant === 'payments';
  const heroMinHeight = 0;
  const titleToContentGap =
    triangleCanopy ? ATTENDANCE_BAND_TO_CARD : variant === 'students' ? STUDENTS_WAVES_BAND : kayoSpace[6];
  const contentOverlap =
    triangleCanopy
      ? ATTENDANCE_BOTTOM_RED - ATTENDANCE_BAND_TO_CARD
      : variant === 'students' ? STUDENTS_TRACK_OVERLAP : compact ? 152 : 140;
  const canopyHeight =
    variant === 'students'
      ? headerHeight + titleToContentGap + contentOverlap
      : headerHeight + (triangleCanopy ? ATTENDANCE_TRIANGLES_BAND : 0) + titleToContentGap + contentOverlap;

  return {
    edgeBleed: 0,
    contentInset: grid.margin,
    canopyHeight,
    canopyRadius: compact ? 16 : 24,
    headerHeight,
    headerIncludedInCanopy: true,
    heroMinHeight,
    titleToContentGap,
    contentOverlap,
    afterOverlapGap,
    minimumFlowHeight: canopyHeight + afterOverlapGap,
    topPull: 0,
  };
}

/** Canopy band tiles (Figma `Header / Canopy pattern`): each tab repeats one Warli motif every
 * `period` units of its `h`-tall art. Zigzag and wave lines spill `padX` into each neighbour so the
 * joins stay seamless; the art itself is drawn in `CanopyBand`. */
export const CANOPY_TILES: Record<BackdropPatternVariant, { period: number; h: number; padX: number }> = {
  dashboard: { period: 50.71, h: 24, padX: 12.68 },
  students: { period: 261.82, h: 72, padX: 130.91 },
  attendance: { period: 42, h: 24, padX: 0 },
  payments: { period: 34, h: 24, padX: 0 },
};

/** Tile boxes for a band `width` wide and `height` tall, centred so the canopy clips both sides evenly. */
export function getCanopyTiles(variant: BackdropPatternVariant, width: number, height: number) {
  const { period, h, padX } = CANOPY_TILES[variant];
  const scale = height / h;
  const step = period * scale;
  const count = Math.ceil(width / step) + 1;
  const first = (width - count * step) / 2;
  return Array.from({ length: count }, (_, i) => ({
    left: first + i * step - padX * scale,
    width: (period + padX * 2) * scale,
  }));
}

/** Total rendered height of the fixed logo+bell header bar, including the safe-area top inset.
 * Shared by `BrandedHeaderBar` (the fixed overlay) and `BrandedScreenBackdrop` (which reserves the
 * same height at the top of its scrolling canopy) so the two never show a seam or a jump. */
export function getBrandedHeaderBarHeight(insetsTop: number, width: number): number {
  const spec = getBrandedScreenBackdropSpec(width);
  const contentDrivenHeight = insetsTop + kayoSpace[3] + HEADER_ROW_CONTENT_HEIGHT;
  return Math.max(contentDrivenHeight, spec.headerHeight);
}