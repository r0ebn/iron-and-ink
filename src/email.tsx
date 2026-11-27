/**
 * Iron & Ink — booking confirmation email (600px).
 *
 * The centre of this email is the design itself. An Email cannot hold
 * an Svg (the writer has no inline SVG, and `validate()` says so), so
 * the flash engine's drawing of Silas's chosen design is rendered once
 * at build time — by the `DesignCard` Canvas below, through the same
 * `renderImage()` the promo card uses — and the email carries that PNG
 * as its picture of the piece. The drawing is still the catalogue's
 * own; only its delivery format changes. See scripts/build.tsx.
 *
 * Around the design: a letterhead strip with the booking code, the
 * booking slip, the deposit panel, the run-up checklist Vera sends
 * every client, and her sign-off.
 */
import {
  Button,
  Canvas,
  Column,
  Divider,
  Email,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Row,
  Section,
  Span,
  Text,
  token,
} from "@hyper-elements/react";
import { artist, beforeYouCome, booking, chosenDesign, client, deposit, studio, usd } from "./data";
import { palette, ironTheme, webFonts } from "./theme";
import { MotifDrawing } from "./flash";
import { BookingSlip, StudioLine, StudioMark } from "./studio";

/**
 * The chosen design as a small printed card — rendered to PNG by the
 * build and embedded in the email below. Bone card, the drawing, the
 * design's name and number.
 */
export function DesignCard() {
  return (
    <Canvas
      width={440}
      height={540}
      theme={ironTheme}
      title={`${chosenDesign.name} — flash design ${chosenDesign.no}, Iron & Ink`}
      lang="en"
      style={{
        backgroundColor: palette.card,
        color: palette.ink,
        padding: [30, 30],
        gap: 14,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MotifDrawing design={chosenDesign} height={392} />
      <Text
        style={{
          fontFamily: token("fonts.heading"),
          fontSize: 25,
          fontWeight: 600,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          lineHeight: 1.2,
          color: palette.ink,
        }}
      >
        {chosenDesign.name}
      </Text>
      <Text
        style={{
          fontFamily: token("fonts.heading"),
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: 2.4,
          textTransform: "uppercase",
          lineHeight: 1.2,
          color: palette.blood,
        }}
      >
        {chosenDesign.no} · Iron &amp; Ink flash wall
      </Text>
    </Canvas>
  );
}

export default function BookingEmail({ designPng }: { designPng: string }) {
  return (
    <Email
      width={600}
      theme={ironTheme}
      title={`Booked in — ${chosenDesign.name} with ${artist.name}, ${booking.dateShort}`}
      previewText={`${client.firstName}, your ${chosenDesign.name} appointment with ${artist.name} is confirmed for ${booking.dateLabel} at ${booking.time}. Deposit of ${usd(deposit.amountCents)} received.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* Letterhead: name-plate, booking code, and a red rule. */}
      <Section style={{ padding: [30, 40, 0], gap: 18, mobile: { padding: [24, 24, 0] } }}>
        <Row style={{ alignItems: "start" }}>
          <StudioMark />
          <Column style={{ gap: 2, alignItems: "end" }}>
            <Text style={{ apply: ["eyebrow"], color: palette.blood, textAlign: "right" }}>Booking confirmed</Text>
            <Text
              style={{
                fontFamily: token("fonts.heading"),
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: 1.6,
                lineHeight: 1.3,
                textAlign: "right",
              }}
            >
              {booking.code}
            </Text>
          </Column>
        </Row>
        <Divider style={{ borderTop: { width: 3, style: "solid", color: palette.blood } }} />
        <Column style={{ gap: 12, padding: [6, 0, 0] }}>
          <Heading level={1}>Booked in, {client.firstName}.</Heading>
          <Text style={{ fontSize: 16.5, lineHeight: 1.6 }}>
            Your chair is held for{" "}
            <Span style={{ fontWeight: 700 }}>
              {booking.dateLabel} at {booking.time}
            </Span>{" "}
            — {artist.name} will tattoo
            the design you picked off the flash wall onto your {booking.placement.toLowerCase()}. Your{" "}
            {usd(deposit.amountCents)} deposit is in. Everything about the appointment is on the slip below; the
            design itself is right here, exactly as it hangs in the studio.
          </Text>
        </Column>
      </Section>

      <Section style={{ padding: [26, 40, 34], gap: 26, mobile: { padding: [22, 24, 28] } }}>
        {/* The design, drawn by the flash engine and carried as a PNG. */}
        <Column style={{ apply: ["sheet"], padding: 24, gap: 18 }}>
          <Row style={{ gap: 24, alignItems: "center" }}>
            <Image
              src={{ src: designPng, width: 440, height: 540 }}
              alt={`The ${chosenDesign.name} flash design: a dagger through a rose, drawn in black and red.`}
              style={{ width: 176, flex: "none" }}
            />
            <Column style={{ gap: 8 }}>
              <Text style={{ apply: ["eyebrow"], color: palette.blood }}>Your flash pick · {chosenDesign.no}</Text>
              <Heading level={2} style={{ fontSize: 25 }}>{chosenDesign.name}</Heading>
              <Text style={{ fontSize: 14.5, lineHeight: 1.6, color: token("colors.muted") }}>{chosenDesign.blurb}</Text>
              <Text style={{ fontSize: 14, lineHeight: 1.55 }}>
                {chosenDesign.size} · {booking.placement} · {chosenDesign.session} · {usd(chosenDesign.priceCents)} all-in
              </Text>
            </Column>
          </Row>
        </Column>

        {/* The booking slip. */}
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.blood }}>The booking slip</Text>
          <BookingSlip />
        </Column>

        {/* The deposit. */}
        <Column style={{ apply: ["blackPanel"], padding: 26, gap: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Text style={{ apply: ["eyebrow"], color: palette.boneDim }}>Deposit — received</Text>
            <Text
              style={{
                fontFamily: token("fonts.heading"),
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 1,
                lineHeight: 1,
                color: palette.bone,
                textAlign: "right",
              }}
            >
              {usd(deposit.amountCents)}
            </Text>
          </Row>
          <Text style={{ fontSize: 14.5, lineHeight: 1.6, color: palette.boneDim }}>{deposit.policy}</Text>
          <Button href={booking.manageHref} variant="bone" style={{ alignSelf: "start" }}>
            Manage your booking
          </Button>
        </Column>

        {/* The run-up checklist. */}
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.blood }}>Before Saturday</Text>
          <List style={{ gap: 9, fontSize: 15, lineHeight: 1.55, indent: 20 }}>
            {beforeYouCome.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </Column>

        {/* Vera's sign-off. */}
        <Column style={{ gap: 4, padding: [16, 0, 0], border: { top: `1px solid ${palette.border}` } }}>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>
            Questions, or cold feet about the placement? Reply to this email or call the studio at{" "}
            <Link href={studio.phoneHref}>{studio.phone}</Link> and ask for me.
          </Text>
          <Text
            style={{
              fontFamily: token("fonts.heading"),
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              lineHeight: 1.4,
            }}
          >
            — {artist.name}
          </Text>
          <Text style={{ fontSize: 13, color: token("colors.muted") }}>{artist.role}</Text>
        </Column>

        <Divider />

        <Column style={{ gap: 8 }}>
          <StudioLine />
          <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
            You are receiving this because you booked a tattoo at {studio.fullName}. Manage or reschedule any time at{" "}
            <Link href={booking.manageHref} style={{ color: token("colors.muted") }}>
              {studio.site}/bookings
            </Link>
            . {studio.fullName} is a fictional studio; this booking is sample data.
          </Text>
        </Column>
      </Section>
    </Email>
  );
}
