/**
 * Iron & Ink — the flash-day promo card (1080 × 1080).
 *
 * A poster for the studio window and the feed: the date in Oswald as
 * tall as it goes, and underneath it three drawings lifted straight
 * off the flash wall — the same registry entries the page's tiles use,
 * in their bone-on-black tone. Rendered to PNG and SVG by
 * `renderImage()` in the build.
 */
import { Canvas, Column, Heading, Row, Text, token } from "@hyper-elements/react";
import { designByKey, flashDay, studio } from "./data";
import { palette, ironTheme } from "./theme";
import { MotifDrawing } from "./flash";

export default function FlashDayCard() {
  return (
    <Canvas
      width={1080}
      height={1080}
      theme={ironTheme}
      title={`Flash Day — ${flashDay.dateLabel}, ${studio.fullName}`}
      lang="en"
      style={{
        backgroundColor: palette.ink,
        color: palette.bone,
        padding: [64, 72],
        gap: 28,
        justifyContent: "space-between",
      }}
    >
      <Column style={{ gap: 16, alignItems: "center", textAlign: "center" }}>
        <Text style={{ apply: ["eyebrow"], color: palette.blood, fontSize: 15 }}>
          {studio.fullName} · Portland
        </Text>
        <Heading level={1} style={{ fontSize: 118, lineHeight: 1, color: palette.bone }}>
          Flash Day
        </Heading>
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontSize: 31,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            lineHeight: 1.3,
            color: palette.bone,
          }}
        >
          {flashDay.dateLabel} · {flashDay.doors}
        </Text>
        <Text style={{ fontSize: 20, lineHeight: 1.5, color: palette.boneDim }}>{flashDay.detail}</Text>
      </Column>

      {/* Three drawings off the wall, in their dark tone, with the
          rest of the wall named underneath. */}
      <Column style={{ gap: 22, alignItems: "center" }}>
        <Row style={{ gap: 28, alignItems: "center", justifyContent: "center" }}>
          <MotifDrawing design={designByKey("swallow")} height={196} onDark />
          <MotifDrawing design={designByKey("dagger-rose")} height={308} onDark />
          <MotifDrawing design={designByKey("rose")} height={272} onDark />
        </Row>
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 3,
            textTransform: "uppercase",
            lineHeight: 1.4,
            color: palette.boneDim,
            textAlign: "center",
          }}
        >
          Swallow · Dagger · Rose · Horseshoe · Moth · Dagger &amp; Rose
        </Text>
      </Column>

      <Column style={{ gap: 14, alignItems: "center", textAlign: "center" }}>
        <Text style={{ apply: ["priceTag"], fontSize: 19, padding: [10, 22] }}>{flashDay.prices}</Text>
        <Text style={{ fontSize: 18, color: palette.boneDim }}>
          {studio.site}/flash · {studio.address}
        </Text>
      </Column>
    </Canvas>
  );
}
