/**
 * Iron & Ink — the studio's working data.
 *
 * Two engines run on this file. The flash catalogue (`flashCatalogue`)
 * is the studio's wall of designs: every entry carries its own drawing
 * key, its working size, where it sits well on the body, and its price —
 * and the flash-sheet components in `src/flash.tsx` turn the list into
 * tiles wherever a design needs to appear. The care phases
 * (`carePhases`) drive the aftercare timeline in `src/care.tsx`: add a
 * phase here and the printed guide grows a step.
 *
 * The booking joins the two: Silas Meyer has picked one design off the
 * wall for his forearm, and the deposit against it is already paid.
 *
 * Everything here is fictional sample data — the studio, the artist,
 * the client, the designs and the prices.
 */

export const studio = {
  name: "Iron & Ink",
  fullName: "Iron & Ink Tattoo Studio",
  established: 2011,
  line: "Traditional tattooing, drawn once and worn for life.",
  address: "418 Foundry Row, Portland, Oregon 97209",
  phone: "+1 (503) 555-0164",
  phoneHref: "tel:+15035550164",
  email: "studio@ironandink.example",
  site: "ironandink.example",
  hours: "Tuesday–Saturday, 10 AM – 7 PM",
} as const;

export const artist = {
  name: "Vera Kade",
  firstName: "Vera",
  role: "Resident artist — traditional & neo-traditional",
  bio: "Fourteen years at the machine, nine of them at Iron & Ink. Vera draws the studio's flash wall and tattoos almost exclusively from it: bold outlines, a three-colour palette, and motifs built to still read clearly in thirty years.",
} as const;

export const client = {
  firstName: "Silas",
  fullName: "Silas Meyer",
} as const;

/* ------------------------------------------------------------------ */
/* The flash catalogue                                                 */
/* ------------------------------------------------------------------ */

export type MotifKey = "dagger-rose" | "swallow" | "dagger" | "rose" | "horseshoe" | "moth";

export interface FlashDesign {
  /** Key into the drawing registry in src/flash.tsx. */
  key: MotifKey;
  /** Catalogue number on the wall, e.g. "No. 04". */
  no: string;
  name: string;
  /** Working size Vera tattoos it at, e.g. "5 × 3 in". */
  size: string;
  /** Where it sits well. */
  placement: string;
  /** Session length, e.g. "≈ 3 hours". */
  session: string;
  priceCents: number;
  blurb: string;
}

export const flashCatalogue: FlashDesign[] = [
  {
    key: "dagger-rose",
    no: "No. 04",
    name: "Dagger & Rose",
    size: "5 × 3 in",
    placement: "Forearm, calf, upper arm",
    session: "≈ 3 hours",
    priceCents: 42000,
    blurb: "The wall's centrepiece: a straight blade through a five-petal rose. Drawn to wrap a forearm without breaking the line.",
  },
  {
    key: "swallow",
    no: "No. 01",
    name: "Homeward Swallow",
    size: "4 × 2.5 in",
    placement: "Forearm, chest, ankle",
    session: "≈ 2 hours",
    priceCents: 26000,
    blurb: "The sailor's bird, mid-swoop with a forked tail and a red throat — one for the miles out, one for coming home.",
  },
  {
    key: "dagger",
    no: "No. 02",
    name: "Straight Dagger",
    size: "5 × 1.5 in",
    placement: "Forearm, spine, shin",
    session: "≈ 1.5 hours",
    priceCents: 22000,
    blurb: "A clipped point and a wrapped grip. The narrowest design on the wall, and the one that ages the best.",
  },
  {
    key: "rose",
    no: "No. 03",
    name: "Five-Petal Rose",
    size: "3.5 × 3.5 in",
    placement: "Shoulder, elbow ditch, knee",
    session: "≈ 2 hours",
    priceCents: 24000,
    blurb: "The traditional rose reduced to five petals and two leaves. Pairs with anything — a dagger, a date, a name.",
  },
  {
    key: "horseshoe",
    no: "No. 05",
    name: "Lucky Horseshoe",
    size: "3.5 × 3 in",
    placement: "Upper arm, calf, chest",
    session: "≈ 2 hours",
    priceCents: 23000,
    blurb: "Seven nails, points up, luck kept in. A first-tattoo classic that sits well almost anywhere.",
  },
  {
    key: "moth",
    no: "No. 06",
    name: "Death's-Head Moth",
    size: "4.5 × 4 in",
    placement: "Sternum, upper back, thigh",
    session: "≈ 3 hours",
    priceCents: 38000,
    blurb: "The wall's darkest piece: spread wings, a skull at the thorax, and antennae like two small horns.",
  },
];

/** Look a design up by its drawing key. */
export function designByKey(key: MotifKey): FlashDesign {
  const found = flashCatalogue.find((d) => d.key === key);
  if (!found) throw new Error(`Unknown flash design: ${key}`);
  return found;
}

/* ------------------------------------------------------------------ */
/* The booking                                                         */
/* ------------------------------------------------------------------ */

export const booking = {
  code: "II-2027-0314",
  designKey: "dagger-rose" as MotifKey,
  placement: "Right forearm",
  dateShort: "Sat 14 Mar 2027",
  dateLabel: "Saturday, 14 March 2027",
  time: "11:00 AM",
  manageHref: "https://ironandink.example/bookings/II-2027-0314",
} as const;

/** The design Silas picked off the wall. */
export const chosenDesign = designByKey(booking.designKey);

export const deposit = {
  amountCents: 8000,
  policy:
    "The deposit holds your slot and comes off the price of the finished piece. It is non-refundable, but it moves with you: reschedule once, free, with at least 48 hours' notice.",
} as const;

/** Balance still owed on the day: the design's price minus the deposit. */
export const balanceDueCents = chosenDesign.priceCents - deposit.amountCents;

export const beforeYouCome: string[] = [
  "Sleep properly the night before — a rested body sits better and heals better.",
  "Eat a real meal within two hours of 11:00 AM, and bring a sugary drink for the session.",
  "No alcohol for 24 hours beforehand, and no aspirin unless it is prescribed: both thin the blood.",
  "Moisturise your right forearm lightly each day this week; arrive with clean, unbroken skin.",
  "Wear a loose short sleeve you do not mind ink on, and bring photo ID — we check, every time.",
];

/* ------------------------------------------------------------------ */
/* Aftercare phases — the timeline's input                             */
/* ------------------------------------------------------------------ */

export interface CarePhase {
  /** Short label for the timeline rail, e.g. "Day 1". */
  label: string;
  /** The day range this phase covers, e.g. "Days 2–3". */
  range: string;
  title: string;
  instructions: string[];
}

export const carePhases: CarePhase[] = [
  {
    label: "Day 1",
    range: "Day 1",
    title: "Wrap off, first wash",
    instructions: [
      "Leave the studio wrap on for 2–4 hours, then remove it with clean hands.",
      "Wash gently with lukewarm water and mild, fragrance-free soap; pat dry with a clean paper towel.",
      "Let it air for ten minutes. Tonight, sleep on clean sheets with the forearm uncovered.",
    ],
  },
  {
    label: "Days 2–3",
    range: "Days 2–3",
    title: "Wash, dry, a whisper of ointment",
    instructions: [
      "Wash twice a day — morning and night — the same gentle way as day one.",
      "After each wash, apply a rice-grain amount of the studio ointment: a thin film, never a thick layer.",
      "Wear loose sleeves. The tattoo should look moisturised, not greasy, and never wrapped again.",
    ],
  },
  {
    label: "Days 4–7",
    range: "Days 4–7",
    title: "The peel — hands off",
    instructions: [
      "Flaking like a mild sunburn is expected, and so is itching. Let flakes fall on their own.",
      "Never pick, scratch or peel. Slap an itch, don't scratch it.",
      "Swap the ointment for plain unscented lotion, two or three times a day.",
    ],
  },
  {
    label: "Week 2",
    range: "Days 8–14",
    title: "Settling under new skin",
    instructions: [
      "Most flaking is done; a slight shine or milkiness over the design is normal while it settles.",
      "Moisturise once or twice a day. Showers short and lukewarm — still no baths, swimming or saunas.",
      "Keep the forearm out of direct sun; loose cotton over it outdoors.",
    ],
  },
  {
    label: "Weeks 3–4",
    range: "Weeks 3–4",
    title: "Healed on the surface",
    instructions: [
      "The surface is healed and the colours sit at their true depth by the end of week four.",
      "Note any small light or patchy spot — touch-ups within six months are free at Iron & Ink.",
      "From here on: SPF 50 on the piece in the sun, for life. UV fades black faster than anything.",
    ],
  },
];

export const warningSigns: string[] = [
  "Redness, warmth or swelling that spreads after day three",
  "Yellow or green discharge, or a bad smell from the tattoo",
  "Red streaks running away from the design",
  "Fever, or pain that worsens instead of easing",
];

export const guideFinePrint = [
  "This guide is general information, not medical advice. If you are worried about a healing tattoo, call the studio or see a medical professional.",
  "Iron & Ink Tattoo Studio is fictional; no real studio, artist, client or appointment exists behind this guide.",
];

export const flashDay = {
  dateLabel: "Saturday, 21 March 2027",
  doors: "Walk-ins from 10 AM",
  detail: "The whole wall at flash-day prices — first come, first served, no appointments.",
  prices: "$60–$120 · arms & legs only · 18+ with ID",
  href: "https://ironandink.example/flash",
} as const;

/** Format integer cents as dollars, e.g. 4800 -> "$48.00", -8000 -> "-$80.00". */
export function usd(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  return `${sign}$${(Math.abs(cents) / 100).toFixed(2)}`;
}
