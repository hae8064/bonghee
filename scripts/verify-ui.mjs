// Usage: pnpm build && pnpm start (port 3000), then: node scripts/verify-ui.mjs [outDir]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.argv[2] ?? `${process.env.HOME}/leo/스크린샷/bonghee`;
const PAGES = ["/", "/cases/qanti", "/cases/sso", "/cases/sectra-grid", "/cases/tile-serving"];
const WIDTHS = [320, 360, 390, 768, 1280];
mkdirSync(OUT, { recursive: true });

const failures = [];
const browser = await chromium.launch();

for (const reduced of [false, true]) {
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: reduced ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    for (const p of PAGES) {
      await page.goto(BASE + p, { waitUntil: "networkidle" });
      // scroll through so in-view animations and lazy parts run
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
      if (sw > iw) failures.push(`overflow ${p} @${w}${reduced ? " reduced" : ""}: ${sw} > ${iw}`);
      if (!reduced && (w === 390 || w === 1280)) {
        const name = (p === "/" ? "home" : p.split("/").pop()) + `-${w}.png`;
        await page.screenshot({ path: `${OUT}/${name}`, fullPage: true });
      }
    }
    if (errors.length) failures.push(`console errors @${w}${reduced ? " reduced" : ""}: ${[...new Set(errors)].join(" | ").slice(0, 400)}`);
    await ctx.close();
  }
}

const res = await (await browser.newContext()).request.get(BASE + "/cases/foo");
if (res.status() !== 404) failures.push(`/cases/foo returned ${res.status()}`);

// reduced motion: diagram text must be visible
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/cases/sso", { waitUntil: "networkidle" });
  const op = await page.locator("[data-step]").first().getAttribute("opacity");
  if (op !== "1") failures.push(`reduced-motion sso first step opacity=${op}`);
  await ctx.close();
}

await browser.close();
if (failures.length) { console.log("FAIL\n" + failures.join("\n")); process.exit(1); }
console.log(`PASS — screenshots in ${OUT}`);
