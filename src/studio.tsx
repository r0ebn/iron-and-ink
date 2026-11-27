/**
 * Small shared pieces that are not part of either engine: the studio's
 * name-plate, the booking slip that the email and the page both show,
 * and the studio's sign-off line. Text-only, so they work in every
 * output — including the email, where the flash drawings need the
 * email-safe treatment described in `src/email.tsx`.
 */
import { Column, Row, Span, Table, TableCell, TableRow, Text, token } from "@hyper-elements/react";
import { artist, booking, chosenDesign, client, deposit, balanceDueCents, studio, usd } from "./data";
import { palette } from "./theme";

/** The studio's name-plate: IRON & INK with a red ampersand. */
export function StudioMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Column style={{ gap: 2 }}>
      <Text
        style={{
          fontFamily: token("fonts.heading"),
          fontSize: compact ? 17 : 22,
          fontWeight: 700,
          letterSpacing: 2.4,
          lineHeight: 1,
          color: light ? palette.bone : palette.ink,
        }}
      >
        IRON <Span style={{ color: palette.blood }}>&amp;</Span> INK
      </Text>
      <Text
        style={{
          fontFamily: token("fonts.heading"),
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: 3,
          lineHeight: 1,
          color: light ? palette.boneDim : palette.muted,
        }}
      >
        TATTOO STUDIO · EST. {studio.established}
      </Text>
    </Column>
  );
}

/** One line of the booking slip: a label, a value. */
function SlipRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Column style={{ gap: 2 }}>
      <Text style={{ apply: ["metaLabel"] }}>{label}</Text>
      <Text style={{ fontSize: 15.5, fontWeight: 600, lineHeight: 1.3 }}>{value}</Text>
      {sub ? <Text style={{ fontSize: 13, lineHeight: 1.45, color: token("colors.muted") }}>{sub}</Text> : null}
    </Column>
  );
}

/**
 * The booking slip: who, what design, where on the body, when — and the
 * money, as a small ledger. Shown in the confirmation email and again
 * on the artist page under the flash wall.
 */
export function BookingSlip({ withLedger = true }: { withLedger?: boolean }) {
  return (
    <Column style={{ gap: 18 }}>
      <Row style={{ gap: 20 }}>
        <SlipRow label="Client" value={client.fullName} sub={`with ${artist.name}`} />
        <SlipRow label="Design" value={`${chosenDesign.name} (${chosenDesign.no})`} sub={booking.placement} />
      </Row>
      <Row style={{ gap: 20 }}>
        <SlipRow label="When" value={booking.dateShort} sub={`${booking.time} · ${chosenDesign.session}`} />
        <SlipRow label="Size" value={chosenDesign.size} sub={chosenDesign.placement} />
      </Row>
      {withLedger ? (
        <Table style={{ cellPadding: [7, 0], rowBorder: { width: 1, style: "solid", color: token("colors.border") } }}>
          <TableRow>
            <TableCell>
              {chosenDesign.name} <Span style={{ color: token("colors.muted") }}>· full price</Span>
            </TableCell>
            <TableCell style={{ textAlign: "right", fontWeight: 600 }}>{usd(chosenDesign.priceCents)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Deposit <Span style={{ color: token("colors.muted") }}>· paid today</Span>
            </TableCell>
            <TableCell style={{ textAlign: "right", fontWeight: 600 }}>{usd(-deposit.amountCents)}</TableCell>
          </TableRow>
          <TableRow footer>
            <TableCell style={{ fontWeight: 700 }}>Balance due on the day</TableCell>
            <TableCell style={{ textAlign: "right", fontWeight: 700 }}>{usd(balanceDueCents)}</TableCell>
          </TableRow>
        </Table>
      ) : null}
    </Column>
  );
}

/** The studio's address and contact line, for the bottom of things. */
export function StudioLine({ light = false }: { light?: boolean }) {
  return (
    <Text
      style={{
        fontSize: 12.5,
        lineHeight: 1.6,
        color: light ? palette.boneDim : token("colors.muted"),
      }}
    >
      {studio.fullName} · {studio.address} · {studio.phone} · {studio.email} · {studio.hours}
    </Text>
  );
}
