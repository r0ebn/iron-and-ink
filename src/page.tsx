/**
 * Iron & Ink — the studio page (960px).
 *
 * This page is the flash wall, hung on the web. It opens on the wall
 * itself — Vera's six catalogue designs as tiles, generated from the
 * catalogue by the flash-sheet engine — because that is what the
 * studio sells: you pick a drawing, you book the chair, you wear it.
 * Silas's pick is ringed in red on the wall, and his booking slip sits
 * directly underneath it. The artist, the deposit and flash day follow
 * the wall, not the other way round.
 */
import {
  Button,
  Column,
  Divider,
  Heading,
  List,
  ListItem,
  Page,
  Row,
  Section,
  Text,
  token,
} from "@hyper-elements/react";
import { artist, booking, chosenDesign, deposit, flashDay, studio, usd } from "./data";
import { palette, ironTheme, webFonts } from "./theme";
import { FlashSheet } from "./flash";
import { BookingSlip, StudioLine, StudioMark } from "./studio";

const howItRuns = [
  "Pick a design off the wall — every tile is drawn at the size Vera tattoos it.",
  "Pay the $80 deposit to hold a chair; it comes off the design's price.",
  "Sit for the session. Stencil first, always — you see the placement before any ink.",
  "Leave with the printed aftercare guide and Vera's number written on it.",
];

export default function StudioPage() {
  return (
    <Page
      width={960}
      theme={ironTheme}
      title={`The Flash Wall — ${studio.fullName}`}
      description={`Six traditional flash designs by ${artist.name} at ${studio.fullName}, Portland. Pick one off the wall and book the chair.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* The wall's header: name-plate over a black band, then the pitch. */}
      <Section
        tokens={{ colors: { background: palette.ink, foreground: palette.bone } }}
        style={{ backgroundColor: palette.ink, padding: [34, 40, 44], gap: 30, mobile: { padding: [28, 24, 36] } }}
      >
        <Row style={{ alignItems: "start" }}>
          <StudioMark light />
          <Text style={{ apply: ["eyebrow"], color: palette.boneDim, textAlign: "right", mobile: { textAlign: "left" } }}>
            {studio.hours}
          </Text>
        </Row>
        <Column style={{ gap: 16 }}>
          <Heading level={1} style={{ fontSize: 58, color: palette.bone, mobile: { fontSize: 40 } }}>
            Pick it off the wall.
          </Heading>
          <Text style={{ fontSize: 19, lineHeight: 1.55, color: palette.boneDim, mobile: { fontSize: 17 } }}>
            No portfolios-by-request, no endless custom queues. {artist.name} draws a wall of traditional flash, keeps
            it at six designs, and tattoos them exactly as drawn — bold lines, three colours, built to outlast the
            trends. {studio.line}
          </Text>
          <Row style={{ gap: 14 }}>
            <Button href={booking.manageHref} style={{ flex: "none" }}>
              Book the chair — {usd(deposit.amountCents)} deposit
            </Button>
            <Button href={flashDay.href} variant="bone" style={{ flex: "none" }}>
              Flash day — {flashDay.dateLabel}
            </Button>
          </Row>
        </Column>
      </Section>

      {/* The wall itself: the catalogue, generated tile by tile. */}
      <Section style={{ padding: [42, 40, 0], mobile: { padding: [32, 24, 0] } }}>
        <Column style={{ gap: 18 }}>
          <Row style={{ alignItems: "end" }}>
            <Column style={{ gap: 6 }}>
              <Text style={{ apply: ["eyebrow"], color: palette.blood }}>The catalogue · drawn by {artist.name}</Text>
              <Heading level={2}>Six designs, ready to wear</Heading>
            </Column>
            <Text style={{ fontSize: 14, lineHeight: 1.55, color: token("colors.muted"), textAlign: "right", mobile: { textAlign: "left" } }}>
              Prices include the session, the stencil fitting and the printed aftercare guide.
            </Text>
          </Row>
          <FlashSheet pickedKey={booking.designKey} />
        </Column>
      </Section>

      {/* The next booking: Silas's slip, with the deposit beside it. */}
      <Section style={{ padding: [36, 40, 0], mobile: { padding: [28, 24, 0] } }}>
        <Row style={{ gap: 24, alignItems: "start" }}>
          <Column style={{ apply: ["sheet"], gap: 14 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.blood }}>Next on the chair · {booking.code}</Text>
            <BookingSlip />
          </Column>
          <Column style={{ apply: ["blackPanel"], gap: 12, flex: 0.55 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.boneDim }}>The deposit</Text>
            <Text
              style={{
                fontFamily: token("fonts.heading"),
                fontSize: 44,
                fontWeight: 700,
                lineHeight: 1,
                color: palette.bone,
              }}
            >
              {usd(deposit.amountCents)}
            </Text>
            <Text style={{ fontSize: 14.5, lineHeight: 1.6, color: palette.boneDim }}>{deposit.policy}</Text>
            <Text style={{ fontSize: 14.5, lineHeight: 1.6, color: palette.boneDim }}>
              Silas's balance on the day: {usd(chosenDesign.priceCents - deposit.amountCents)}.
            </Text>
          </Column>
        </Row>
      </Section>

      {/* The artist, and how a flash appointment runs. */}
      <Section style={{ padding: [36, 40, 0], mobile: { padding: [28, 24, 0] } }}>
        <Row style={{ gap: 24, alignItems: "start" }}>
          <Column style={{ gap: 12 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.blood }}>The hand behind the wall</Text>
            <Heading level={2}>{artist.name}</Heading>
            <Text style={{ fontSize: 15.5, lineHeight: 1.65 }}>{artist.bio}</Text>
            <Text style={{ fontSize: 15.5, lineHeight: 1.65, color: token("colors.muted") }}>{artist.role}. Consultations are free, take twenty minutes, and happen at the counter — bring references, or just an idea.</Text>
          </Column>
          <Column style={{ apply: ["sheet"], gap: 12, flex: 0.85 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.blood }}>How a flash appointment runs</Text>
            <List type="number" style={{ gap: 10, fontSize: 14.5, lineHeight: 1.55, indent: 22 }}>
              {howItRuns.map((step) => (
                <ListItem key={step}>{step}</ListItem>
              ))}
            </List>
          </Column>
        </Row>
      </Section>

      {/* Flash day strip + sign-off. */}
      <Section style={{ padding: [36, 40, 44], gap: 24, mobile: { padding: [28, 24, 36] } }}>
        <Column
          style={{
            apply: ["blackPanel"],
            alignItems: "center",
            textAlign: "center",
            padding: [30, 28],
            gap: 10,
            border: { top: `3px solid ${palette.blood}` },
          }}
        >
          <Text style={{ apply: ["eyebrow"], color: palette.blood }}>Once a season</Text>
          <Heading level={2} style={{ color: palette.bone }}>Flash Day — {flashDay.dateLabel}</Heading>
          <Text style={{ fontSize: 15.5, lineHeight: 1.6, color: palette.boneDim }}>
            {flashDay.doors}. {flashDay.detail} {flashDay.prices}.
          </Text>
          <Button href={flashDay.href} variant="bone" style={{ alignSelf: "center" }}>
            See the flash day wall
          </Button>
        </Column>

        <Divider />
        <StudioLine />
        <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
          {studio.fullName} is a fictional studio and every design, price and booking on this page is sample data.
        </Text>
      </Section>
    </Page>
  );
}
