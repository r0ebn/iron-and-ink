/**
 * Iron & Ink — the studio's visual identity, written once as a theme.
 *
 * Bone paper, black ink, one blood-red accent. Oswald — a condensed
 * gothic — does the shouting (headings, labels, prices); Inter does the
 * reading. The same palette object feeds the Svg flash drawings, so a
 * motif printed on the flash wall and a heading on the page can never
 * drift apart in colour.
 */
import { defineTheme } from "@hyper-elements/react";

export const palette = {
  bone: "#F2EDE4",
  boneDeep: "#E5DCC8",
  boneDim: "#CFC6B2",
  card: "#FBF8F0",
  ink: "#111111",
  inkSoft: "#26221C",
  blood: "#A31621",
  bloodDark: "#7E1119",
  muted: "#6F675A",
  border: "#D8CDB6",
  white: "#FFFFFF",
} as const;

export const fontStacks = {
  display: "Oswald, 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif",
  body: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const;

/**
 * Web fonts for the HTML outputs. Inter is served from Google Fonts;
 * Oswald is referenced from the @fontsource package installed with the
 * project, so the kit's display type never depends on a CDN guess. The
 * PDF and the promo card do not fetch either way — `src/fonts.ts` hands
 * those engines the same families as local WOFF files.
 */
export const webFonts = [
  {
    family: "Oswald",
    src: "../node_modules/@fontsource/oswald/files/oswald-latin-400-normal.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Oswald",
    src: "../node_modules/@fontsource/oswald/files/oswald-latin-500-normal.woff2",
    format: "woff2" as const,
    weight: 500,
  },
  {
    family: "Oswald",
    src: "../node_modules/@fontsource/oswald/files/oswald-latin-600-normal.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Oswald",
    src: "../node_modules/@fontsource/oswald/files/oswald-latin-700-normal.woff2",
    format: "woff2" as const,
    weight: 700,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 500,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 700,
  },
];

export const ironTheme = defineTheme({
  colors: {
    background: palette.bone,
    foreground: palette.ink,
    primary: palette.blood,
    primaryForeground: palette.bone,
    muted: palette.muted,
    border: palette.border,
    accent: palette.ink,
    accentForeground: palette.bone,
    bone: palette.bone,
    boneDeep: palette.boneDeep,
    blood: palette.blood,
    card: palette.card,
    ink: palette.ink,
  },
  fonts: {
    body: fontStacks.body,
    heading: fontStacks.display,
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.6 },
  radii: { card: 6, pill: 999 },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 42, lineHeight: 1.05, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", mobile: { fontSize: 32 } },
          2: { fontSize: 28, lineHeight: 1.15, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", mobile: { fontSize: 23 } },
          3: { fontSize: 19, lineHeight: 1.25, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase" },
        },
      },
    },
    Button: {
      backgroundColor: "{colors.primary}",
      color: "{colors.primaryForeground}",
      fontFamily: "{fonts.heading}",
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      padding: [13, 26],
      borderRadius: 4,
      hover: { backgroundColor: "{colors.ink}" },
      variants: {
        ink: {
          backgroundColor: "{colors.ink}",
          color: "{colors.bone}",
          hover: { backgroundColor: "{colors.blood}" },
        },
        bone: {
          backgroundColor: "{colors.bone}",
          color: "{colors.ink}",
          hover: { backgroundColor: "{colors.boneDeep}" },
        },
      },
    },
    Link: {
      color: "{colors.blood}",
      fontWeight: 600,
    },
  },
  styles: {
    /** A pale sheet pinned on the bone ground — the flash-sheet look. */
    sheet: {
      backgroundColor: "{colors.card}",
      border: { width: 1, style: "solid", color: "{colors.border}" },
      borderRadius: 6,
      padding: 28,
      gap: 16,
    },
    /** A black panel: the counter, the deposit slip, the footer strip. */
    blackPanel: {
      backgroundColor: "{colors.ink}",
      color: palette.bone,
      borderRadius: 6,
      padding: 28,
      gap: 16,
    },
    /** Oswald eyebrow label, letterspaced and uppercase. */
    eyebrow: {
      fontFamily: "{fonts.heading}",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 2.6,
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
    /** Small Oswald label over a value. */
    metaLabel: {
      fontFamily: "{fonts.heading}",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: 1.8,
      textTransform: "uppercase",
      color: "{colors.muted}",
    },
    /** A rounded tag, e.g. a motif's price on its flash tile. */
    priceTag: {
      backgroundColor: "{colors.blood}",
      color: palette.bone,
      fontFamily: "{fonts.heading}",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 1.2,
      padding: [6, 14],
      borderRadius: 999,
    },
  },
  formats: {
    email: {
      elements: {
        Heading: {
          by: {
            level: {
              1: { fontSize: 36, mobile: { fontSize: 29 } },
              2: { fontSize: 24, mobile: { fontSize: 20 } },
            },
          },
        },
      },
    },
  },
});

/** Type every token name in templates. */
declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof ironTheme;
  }
}
