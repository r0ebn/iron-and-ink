/**
 * Build: validate every template, then render all outputs into `out/`.
 *
 *   npm run build
 *
 * The gate is `validate()`: any error fails the build. The email also
 * goes through the `@hyper-elements/email-clients` plugin, and
 * per-client previews are written to `out/clients/`.
 *
 * Order matters here. An Email cannot hold an Svg, so the chosen flash
 * design is first drawn by `renderImage()` (the `DesignCard` Canvas in
 * src/email.tsx), and the resulting PNG is handed to the email as a
 * data URI. Everything else renders straight from its template.
 *
 * Outputs:
 *   out/email.html, out/email.txt          booking confirmation + text twin
 *   out/design.png                         the chosen design, as drawn for the email
 *   out/page.html                          the flash-wall page
 *   out/aftercare.html, out/aftercare.pdf  the printed guide (A4, 1 page)
 *   out/flash-card.png, out/flash-card.svg flash-day promo card
 *   out/clients/*.html                     the email as Outlook, Gmail
 *                                          and Apple Mail draw it
 *
 * Nothing is fetched at build time: the PDF and the cards get their
 * fonts as local WOFF files from the @fontsource packages — see
 * `src/fonts.ts`.
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { ElementsError, formatDiagnostics, render, validate } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import BookingEmail, { DesignCard } from "../src/email";
import StudioPage from "../src/page";
import AftercareGuide from "../src/document";
import FlashDayCard from "../src/canvas";
import { loadFontFiles } from "../src/fonts";

const OUT = new URL("../out/", import.meta.url);

function report(name: string, diagnostics: { severity: string }[] | readonly { severity: string }[], formatted: string) {
  const errors = diagnostics.filter((d) => d.severity === "error").length;
  const warnings = diagnostics.filter((d) => d.severity === "warning").length;
  console.log(`\n== ${name}: ${errors} error(s), ${warnings} warning(s)`);
  if (formatted.trim()) console.log(formatted);
  return errors;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(new URL("clients/", OUT), { recursive: true });

  const fonts = await loadFontFiles();
  console.log(`Loaded ${fonts.length} font files for the PDF and image engines`);

  // --- The chosen design, drawn for the email. ---
  const designCardEl = createElement(DesignCard);
  const designPng = await renderImage(designCardEl, { fonts });
  report("renderImage design card", designPng.diagnostics, formatDiagnostics(designPng.diagnostics));
  await writeFile(new URL("design.png", OUT), designPng.image);
  console.log(`Wrote out/design.png (${designPng.width}x${designPng.height}, ${designPng.image.length} bytes)`);
  const designDataUri = `data:image/png;base64,${Buffer.from(designPng.image).toString("base64")}`;

  const clientsPlugin = await emailClients();

  // --- Build gate: validate all four templates. Errors fail the build. ---
  let errors = 0;
  const emailEl = createElement(BookingEmail, { designPng: designDataUri });
  const pageEl = createElement(StudioPage);
  const documentEl = createElement(AftercareGuide);
  const canvasEl = createElement(FlashDayCard);

  const emailValidation = validate(emailEl, { plugins: [clientsPlugin] });
  errors += report("validate email (+ email-clients)", emailValidation.diagnostics, formatDiagnostics(emailValidation.diagnostics));
  const pageValidation = validate(pageEl);
  errors += report("validate page", pageValidation.diagnostics, formatDiagnostics(pageValidation.diagnostics));
  const documentValidation = validate(documentEl);
  errors += report("validate document", documentValidation.diagnostics, formatDiagnostics(documentValidation.diagnostics));
  const canvasValidation = validate(canvasEl);
  errors += report("validate canvas", canvasValidation.diagnostics, formatDiagnostics(canvasValidation.diagnostics));
  if (errors > 0) {
    console.error(`\nBuild failed: ${errors} validation error(s).`);
    process.exitCode = 1;
    return;
  }

  // --- Email: HTML + plain-text twin. ---
  const email = await render(emailEl, { plugins: [clientsPlugin] });
  report("render email", email.diagnostics, formatDiagnostics(email.diagnostics));
  await writeFile(new URL("email.html", OUT), email.html);
  await writeFile(new URL("email.txt", OUT), email.text);
  console.log("Wrote out/email.html, out/email.txt");

  // --- Per-client previews of the email. ---
  const previews = await renderInEmailClients(emailEl, {
    emailClients: ["outlook", "gmail", "apple-mail"],
    fonts: "inline",
  });
  for (const preview of previews.previews) {
    await writeFile(new URL(`clients/${preview.filename}`, OUT), preview.html);
    console.log(`Wrote out/clients/${preview.filename}`);
  }
  for (const skipped of previews.skipped) {
    console.log(`Skipped client preview: ${skipped.client} — ${skipped.reason}`);
  }
  report("email-clients previews", previews.diagnostics, formatDiagnostics(previews.diagnostics));

  // --- Page. ---
  const page = await render(pageEl);
  report("render page", page.diagnostics, formatDiagnostics(page.diagnostics));
  await writeFile(new URL("page.html", OUT), page.html);
  console.log("Wrote out/page.html");

  // --- Document: print HTML + PDF. ---
  const document = await render(documentEl);
  report("render document", document.diagnostics, formatDiagnostics(document.diagnostics));
  await writeFile(new URL("aftercare.html", OUT), document.html);
  console.log("Wrote out/aftercare.html");

  const pdf = await renderPdf(documentEl, { fonts });
  report("renderPdf aftercare guide", pdf.diagnostics, formatDiagnostics(pdf.diagnostics));
  await writeFile(new URL("aftercare.pdf", OUT), pdf.pdf);
  console.log(`Wrote out/aftercare.pdf (${pdf.pdf.length} bytes)`);

  // --- Canvas: PNG + SVG. ---
  const png = await renderImage(canvasEl, { fonts });
  report("renderImage flash-day card (png)", png.diagnostics, formatDiagnostics(png.diagnostics));
  await writeFile(new URL("flash-card.png", OUT), png.image);
  console.log(`Wrote out/flash-card.png (${png.width}x${png.height}, ${png.image.length} bytes)`);

  const svg = await renderImage(canvasEl, { fonts, format: "svg" });
  report("renderImage flash-day card (svg)", svg.diagnostics, formatDiagnostics(svg.diagnostics));
  await writeFile(new URL("flash-card.svg", OUT), svg.image);
  console.log(`Wrote out/flash-card.svg (${svg.image.length} bytes)`);

  // The README embeds the promo card, and `out/` is gitignored — so
  // copies live in `docs/`, refreshed on every build.
  await mkdir(new URL("../docs/screenshots/", import.meta.url), { recursive: true });
  await copyFile(new URL("flash-card.svg", OUT), new URL("../docs/flash-card.svg", import.meta.url));
  await copyFile(new URL("flash-card.png", OUT), new URL("../docs/screenshots/canvas.png", import.meta.url));
  console.log("Copied promo card to docs/flash-card.svg and docs/screenshots/canvas.png");

  console.log("\nBuild complete. Open out/email.html, out/page.html, out/aftercare.html, out/aftercare.pdf or out/flash-card.png.");
}

main().catch((error) => {
  if (error instanceof ElementsError) {
    console.error(formatDiagnostics(error.diagnostics));
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});
