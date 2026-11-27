/**
 * The flash-sheet engine.
 *
 * Every design on the studio's wall is a drawing function in the
 * registry below, keyed by the `key` in the catalogue (`src/data.ts`).
 * Nothing is an image file: each motif is Svg shapes drawn from the
 * shared palette, in two tones — ink-on-bone for pale sheets, bone-on-
 * black for dark panels.
 *
 * `FlashTile` renders one catalogue entry as a complete tile (drawing,
 * number, name, working notes, price); `FlashSheet` lays the whole
 * catalogue out as a grid. The artist page is built from the sheet, the
 * email pulls the client's single chosen tile apart and shows its
 * drawing, and the promo card borrows three drawings. One registry,
 * every appearance of a design stays the same drawing.
 */
import {
  Circle,
  Column,
  Ellipse,
  Grid,
  Line,
  Path,
  Polygon,
  Rect,
  Row,
  Span,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { flashCatalogue, usd, type FlashDesign, type MotifKey } from "./data";
import { palette } from "./theme";

export interface ArtTone {
  /** The drawing's main fill. */
  main: string;
  /** Lines and details that sit on top of the main fill. */
  contrast: string;
  /** The red accent. */
  accent: string;
}

const inkTone: ArtTone = { main: palette.ink, contrast: palette.bone, accent: palette.blood };
const boneTone: ArtTone = { main: palette.bone, contrast: palette.ink, accent: palette.blood };

export function toneFor(onDark: boolean): ArtTone {
  return onDark ? boneTone : inkTone;
}

interface ArtProps {
  width: number;
  height: number;
  onDark?: boolean;
}

/** No. 04 — a straight blade through a five-petal rose. ViewBox 200 × 240. */
function DaggerRoseArt({ width, height, onDark = false }: ArtProps) {
  const t = toneFor(onDark);
  return (
    <Svg width={width} height={height} viewBox="0 0 200 240" title="Flash design: a dagger through a rose.">
      {/* Grip first (the rose covers most of it), then the guard and
          blade below the bloom, so the dagger reads as a dagger. */}
      <Rect x={92} y={10} width={16} height={52} style={{ fill: t.main }} />
      <Polygon points="100,238 84,152 87,112 100,101 113,112 116,152" style={{ fill: t.contrast, stroke: t.main, strokeWidth: 3 }} />
      <Line x1={100} y1={118} x2={100} y2={222} style={{ stroke: t.main, strokeWidth: 2, opacity: 0.35 }} />
      <Rect x={68} y={97} width={64} height={13} rx={6.5} style={{ fill: t.main }} />
      {/* Leaves flanking the guard */}
      <Polygon points="26,132 66,110 54,146" style={{ fill: t.main }} />
      <Polygon points="174,132 134,110 146,146" style={{ fill: t.main }} />
      {/* Rose */}
      <Circle cx={100} cy={58} r={40} style={{ fill: t.accent, stroke: t.main, strokeWidth: 3 }} />
      <Circle cx={100} cy={58} r={28} style={{ fill: t.accent, stroke: t.contrast, strokeWidth: 3, opacity: 0.85 }} />
      <Path
        d="M100,58 m-16,0 a16,16 0 1,1 16,-16 a11,11 0 1,0 -11,11 a6.5,6.5 0 1,1 6.5,-6.5"
        style={{ fill: t.accent, stroke: t.contrast, strokeWidth: 3.5 }}
      />
      <Circle cx={100} cy={58} r={3.5} style={{ fill: t.contrast }} />
    </Svg>
  );
}

/** No. 01 — a swallow mid-swoop. ViewBox 220 × 150. */
function SwallowArt({ width, height, onDark = false }: ArtProps) {
  const t = toneFor(onDark);
  return (
    <Svg width={width} height={height} viewBox="0 0 220 150" title="Flash design: a swallow in flight.">
      {/* Forked tail */}
      <Polygon points="26,84 4,116 40,104" style={{ fill: t.main }} />
      <Polygon points="34,98 26,128 54,106" style={{ fill: t.main }} />
      {/* Body */}
      <Path
        d="M20,88 Q66,40 124,40 Q172,42 200,22 Q198,56 174,80 Q134,110 76,108 Q42,106 20,88 Z"
        style={{ fill: t.main, stroke: t.main, strokeWidth: 2 }}
      />
      {/* Wing */}
      <Path d="M62,60 Q104,14 172,28 Q130,42 98,72 Q74,72 62,60 Z" style={{ fill: t.main, stroke: t.contrast, strokeWidth: 2.5 }} />
      {/* Belly line and red throat */}
      <Line x1={58} y1={96} x2={110} y2={107} style={{ stroke: t.contrast, strokeWidth: 2, opacity: 0.8 }} />
      <Line x1={110} y1={107} x2={162} y2={84} style={{ stroke: t.contrast, strokeWidth: 2, opacity: 0.8 }} />
      <Circle cx={182} cy={54} r={9} style={{ fill: t.accent }} />
      <Circle cx={186} cy={40} r={3.5} style={{ fill: t.contrast }} />
    </Svg>
  );
}

/** No. 02 — a straight dagger. ViewBox 120 × 240. */
function DaggerArt({ width, height, onDark = false }: ArtProps) {
  const t = toneFor(onDark);
  return (
    <Svg width={width} height={height} viewBox="0 0 120 240" title="Flash design: a straight dagger.">
      <Circle cx={60} cy={18} r={9} style={{ fill: t.main }} />
      <Rect x={51} y={27} width={18} height={46} style={{ fill: t.main }} />
      <Line x1={51} y1={38} x2={69} y2={44} style={{ stroke: t.contrast, strokeWidth: 2.5 }} />
      <Line x1={51} y1={50} x2={69} y2={56} style={{ stroke: t.contrast, strokeWidth: 2.5 }} />
      <Line x1={51} y1={62} x2={69} y2={68} style={{ stroke: t.contrast, strokeWidth: 2.5 }} />
      <Rect x={28} y={74} width={64} height={13} rx={6.5} style={{ fill: t.main }} />
      <Polygon points="60,236 43,142 47,90 60,80 73,90 77,142" style={{ fill: t.contrast, stroke: t.main, strokeWidth: 3 }} />
      <Line x1={60} y1={102} x2={60} y2={216} style={{ stroke: t.accent, strokeWidth: 3 }} />
    </Svg>
  );
}

/** No. 03 — a five-petal rose. ViewBox 180 × 170. */
function RoseArt({ width, height, onDark = false }: ArtProps) {
  const t = toneFor(onDark);
  return (
    <Svg width={width} height={height} viewBox="0 0 180 170" title="Flash design: a traditional rose.">
      {/* Stem and leaves */}
      <Line x1={90} y1={114} x2={89} y2={168} style={{ stroke: t.main, strokeWidth: 4 }} />
      <Polygon points="86,124 44,110 56,140" style={{ fill: t.main }} />
      <Polygon points="94,130 134,114 124,144" style={{ fill: t.main }} />
      {/* Bloom */}
      <Circle cx={90} cy={68} r={50} style={{ fill: t.accent, stroke: t.main, strokeWidth: 3 }} />
      <Circle cx={90} cy={68} r={36} style={{ fill: t.accent, stroke: t.contrast, strokeWidth: 3, opacity: 0.85 }} />
      <Path
        d="M90,68 m-20,0 a20,20 0 1,1 20,-20 a14,14 0 1,0 -14,14 a8,8 0 1,1 8,-8"
        style={{ fill: t.accent, stroke: t.contrast, strokeWidth: 3.5 }}
      />
      <Circle cx={90} cy={68} r={4} style={{ fill: t.contrast }} />
    </Svg>
  );
}

/** No. 05 — a lucky horseshoe, points up. ViewBox 180 × 190. */
function HorseshoeArt({ width, height, onDark = false }: ArtProps) {
  const t = toneFor(onDark);
  const nails: Array<[number, number]> = [
    [41, 52], [45, 96], [63, 128], [90, 140], [117, 128], [135, 96], [139, 52],
  ];
  return (
    <Svg width={width} height={height} viewBox="0 0 180 190" title="Flash design: a lucky horseshoe.">
      <Path
        d="M38,14 L38,92 a52,56 0 0,0 104,0 L142,14 L112,14 L112,92 a22,26 0 0,1 -44,0 L68,14 Z"
        style={{ fill: t.main, stroke: t.main, strokeWidth: 2 }}
      />
      {nails.map(([cx, cy], i) => (
        <Circle key={i} cx={cx} cy={cy} r={4.5} style={{ fill: t.accent }} />
      ))}
    </Svg>
  );
}

/** No. 06 — a death's-head moth. ViewBox 220 × 180. */
function MothArt({ width, height, onDark = false }: ArtProps) {
  const t = toneFor(onDark);
  return (
    <Svg width={width} height={height} viewBox="0 0 220 180" title="Flash design: a death's-head moth.">
      {/* Antennae */}
      <Line x1={102} y1={44} x2={83} y2={25} style={{ stroke: t.main, strokeWidth: 3.5 }} />
      <Line x1={83} y1={25} x2={62} y2={16} style={{ stroke: t.main, strokeWidth: 3.5 }} />
      <Line x1={118} y1={44} x2={137} y2={25} style={{ stroke: t.main, strokeWidth: 3.5 }} />
      <Line x1={137} y1={25} x2={158} y2={16} style={{ stroke: t.main, strokeWidth: 3.5 }} />
      {/* Upper wings */}
      <Path d="M104,68 Q28,16 20,72 Q14,120 66,128 Q96,132 106,102 Z" style={{ fill: t.main }} />
      <Path d="M116,68 Q192,16 200,72 Q206,120 154,128 Q124,132 114,102 Z" style={{ fill: t.main }} />
      {/* Lower wings */}
      <Path d="M104,106 Q58,148 82,168 Q104,178 108,138 Z" style={{ fill: t.main, opacity: 0.82 }} />
      <Path d="M116,106 Q162,148 138,168 Q116,178 112,138 Z" style={{ fill: t.main, opacity: 0.82 }} />
      {/* Wing spots */}
      <Circle cx={56} cy={72} r={7} style={{ fill: t.contrast, opacity: 0.9 }} />
      <Circle cx={164} cy={72} r={7} style={{ fill: t.contrast, opacity: 0.9 }} />
      <Circle cx={76} cy={102} r={4.5} style={{ fill: t.accent }} />
      <Circle cx={144} cy={102} r={4.5} style={{ fill: t.accent }} />
      {/* Body and skull */}
      <Ellipse cx={110} cy={108} rx={11} ry={44} style={{ fill: t.main, stroke: t.contrast, strokeWidth: 1.5 }} />
      <Circle cx={110} cy={56} r={15} style={{ fill: t.contrast }} />
      <Circle cx={104} cy={54} r={3.2} style={{ fill: t.main }} />
      <Circle cx={116} cy={54} r={3.2} style={{ fill: t.main }} />
      <Rect x={103} y={64} width={14} height={8} style={{ fill: t.contrast }} />
    </Svg>
  );
}

/** The drawing registry: catalogue key → artwork, with its native size. */
export const motifArt: Record<MotifKey, { art: (p: ArtProps) => React.ReactNode; viewW: number; viewH: number }> = {
  "dagger-rose": { art: (p) => <DaggerRoseArt {...p} />, viewW: 200, viewH: 240 },
  swallow: { art: (p) => <SwallowArt {...p} />, viewW: 220, viewH: 150 },
  dagger: { art: (p) => <DaggerArt {...p} />, viewW: 120, viewH: 240 },
  rose: { art: (p) => <RoseArt {...p} />, viewW: 180, viewH: 170 },
  horseshoe: { art: (p) => <HorseshoeArt {...p} />, viewW: 180, viewH: 190 },
  moth: { art: (p) => <MothArt {...p} />, viewW: 220, viewH: 180 },
};

/** Draw one design at a target height, keeping its proportions. */
export function MotifDrawing({
  design,
  height,
  onDark = false,
}: {
  design: FlashDesign;
  height: number;
  onDark?: boolean;
}) {
  const entry = motifArt[design.key];
  const width = Math.round((entry.viewW / entry.viewH) * height);
  return <>{entry.art({ width, height, onDark })}</>;
}

/**
 * One catalogue entry as a flash tile: the drawing pinned at the top,
 * then its number and price, its name, its working notes and Vera's
 * blurb. The page's sheet is six of these; a tile is the unit the whole
 * kit thinks in.
 */
export function FlashTile({ design, picked = false }: { design: FlashDesign; picked?: boolean }) {
  return (
    <Column
      style={{
        apply: ["sheet"],
        padding: 22,
        gap: 12,
        border: picked
          ? { width: 2, style: "solid", color: palette.blood }
          : { width: 1, style: "solid", color: token("colors.border") },
      }}
    >
      <Row style={{ alignItems: "start", justifyContent: "space-between" }}>
        <Text style={{ apply: ["metaLabel"], color: palette.blood }}>{design.no}</Text>
        <Text style={{ apply: ["priceTag"], flex: "none" }}>{usd(design.priceCents)}</Text>
      </Row>
      <Column style={{ alignItems: "center", padding: [6, 0] }}>
        <MotifDrawing design={design} height={150} />
      </Column>
      <Text
        style={{
          fontFamily: token("fonts.heading"),
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          lineHeight: 1.2,
        }}
      >
        {design.name}
      </Text>
      <Text style={{ fontSize: 13.5, lineHeight: 1.55, color: token("colors.muted") }}>{design.blurb}</Text>
      <Column style={{ gap: 2, padding: [10, 0, 0], border: { top: `1px solid ${palette.border}` } }}>
        <Text style={{ fontSize: 13, lineHeight: 1.5 }}>
          <Span style={{ apply: ["metaLabel"] }}>Size </Span>
          {design.size} · {design.session}
        </Text>
        <Text style={{ fontSize: 13, lineHeight: 1.5 }}>
          <Span style={{ apply: ["metaLabel"] }}>Sits well </Span>
          {design.placement}
        </Text>
      </Column>
      {picked ? (
        <Text style={{ apply: ["eyebrow"], color: palette.blood, fontSize: 11 }}>★ Picked for Silas — see the booking below</Text>
      ) : null}
    </Column>
  );
}

/** The whole wall: every catalogue entry as a tile, three to a row. */
export function FlashSheet({ pickedKey }: { pickedKey?: MotifKey }) {
  return (
    <Grid columns={3} style={{ gap: 20 }}>
      {flashCatalogue.map((design) => (
        <FlashTile key={design.key} design={design} picked={design.key === pickedKey} />
      ))}
    </Grid>
  );
}
