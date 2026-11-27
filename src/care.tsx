/**
 * The aftercare timeline generator.
 *
 * `CareTimeline` takes the care phases from `src/data.ts` and lays them
 * out as a healing timeline: a day-range rail down the left, each phase
 * bolted to it with its title and its instructions as a numbered list.
 * Nothing about the layout is written per-phase — reorder, add or
 * rewrite a phase in the data and the guide re-flows. The printed
 * aftercare guide is this component with a header and a warning panel
 * around it; that is the whole document.
 */
import { Column, List, ListItem, Row, Text, token } from "@hyper-elements/react";
import type { CarePhase } from "./data";
import { palette } from "./theme";

/** One phase on the rail: its range, its title, its instructions. */
function CarePhaseRow({ phase, first }: { phase: CarePhase; first: boolean }) {
  return (
    <Row style={{ gap: 0, alignItems: "stretch" }}>
      {/* The rail cell: the day range, Oswald and red, with the rail
          line running down its right edge. */}
      <Column
        style={{
          width: 102,
          flex: "none",
          padding: [first ? 2 : 12, 12, 12, 0],
          border: { right: `2px solid ${palette.ink}` },
          gap: 2,
        }}
      >
        <Text
          style={{
            fontFamily: token("fonts.heading"),
            fontSize: 13.5,
            fontWeight: 600,
            letterSpacing: 0.8,
            textTransform: "uppercase",
            lineHeight: 1.25,
            color: palette.blood,
          }}
        >
          {phase.range}
        </Text>
      </Column>
      <Column style={{ padding: [first ? 0 : 10, 0, 10, 18], gap: 4 }}>
        <Text style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>{phase.title}</Text>
        <List type="number" style={{ gap: 2, fontSize: 11.5, lineHeight: 1.45, indent: 16 }}>
          {phase.instructions.map((step, i) => (
            <ListItem key={i}>{step}</ListItem>
          ))}
        </List>
      </Column>
    </Row>
  );
}

/** All phases, generated in order. Compact text: this is built for A4. */
export function CareTimeline({ phases }: { phases: CarePhase[] }) {
  return (
    <Column style={{ gap: 0 }}>
      {phases.map((phase, i) => (
        <CarePhaseRow key={phase.range} phase={phase} first={i === 0} />
      ))}
    </Column>
  );
}
