import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.LOCALIZATION_BASE_URL || "http://localhost:3523";
const browser = await chromium.launch({ channel: "chrome" });

async function check(path, width, present, absent = [], canonical) {
  const page = await browser.newPage({ viewport: { width, height: 850 } });
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === baseUrl || url.protocol === "data:") return route.continue();
    if (url.hostname === "link.agent-crm.com" && url.pathname.includes("/widget/booking/")) {
      return route.fulfill({ status: 200, contentType: "text/html", body: "<html><body>Mock calendar</body></html>" });
    }
    return route.abort();
  });
  try {
    const response = await page.goto(baseUrl + path, { waitUntil: "domcontentloaded", timeout: 45_000 });
    assert.equal(response?.status(), 200, `${path} status`);
    const text = await page.locator("main").innerText();
    const normalizedText = text.toLocaleLowerCase("es");
    for (const phrase of present) assert.ok(normalizedText.includes(phrase.toLocaleLowerCase("es")), `${path} missing ${phrase}; visible: ${text.slice(0, 300)}`);
    for (const phrase of absent) assert.ok(!normalizedText.includes(phrase.toLocaleLowerCase("es")), `${path} unexpectedly contains ${phrase}`);
    if (canonical) assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical);
    console.log(`${path} ${width}px: passed`);
  } finally {
    await page.close();
  }
}

try {
  await check("/es/industries", 390, ["Experiencia especializada", "¿No ve su industria?"], ["Specialized Expertise", "Don't see your industry?"]);
  await check("/en/industries", 390, ["Specialized Expertise", "Don't see your industry?"]);
  await check("/es/industries", 1280, ["Soluciones por industria"]);
  await check("/es/shop", 390, ["Centro de Recursos"], ["Featured Release", "2,400+", "4.9/5"]);
  await check("/es/shop", 1280, ["Centro de Recursos"]);
  await check("/es/shop/cart?checkout=cancelled", 390, ["Revise su carrito", "El pago se canceló", "Su carrito está vacío"]);
  await check("/es/book", 390, ["Elija una hora"]);
  await check("/es/construction/profit-blueprint", 390, ["Deje de trabajar sin ganancias", "Formato PDF digital"], ["Stop Working for Free", "30-Day Guarantee"], "https://unionnationaltax.com/es/construction/profit-blueprint");
  const scorp = await browser.newPage({ viewport: { width: 390, height: 850 } });
  await scorp.route("**/*", (route) => new URL(route.request().url()).origin === baseUrl ? route.continue() : route.abort());
  try {
    const response = await scorp.goto(baseUrl + "/es/scorp-estimator", { waitUntil: "domcontentloaded", timeout: 45_000 });
    assert.equal(response?.status(), 200, "Spanish S-Corp redirect status");
    await scorp.waitForURL("**/es/s-corp-tax-advantage", { timeout: 20_000 });
    assert.equal(new URL(scorp.url()).pathname, "/es/s-corp-tax-advantage");
    const bookingLinks = await scorp.locator("main a").filter({ hasText: /book|reserve|reservar|agendar/i }).evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    assert.ok(bookingLinks.length > 0, "Spanish S-Corp booking link missing");
    assert.ok(bookingLinks.every((href) => href === "/es/book"), `Spanish S-Corp booking destination: ${bookingLinks}`);
    assert.equal(await scorp.locator('link[rel="canonical"]').getAttribute("href"), "https://unionnationaltax.com/es/s-corp-tax-advantage");
    assert.equal(await scorp.locator('link[rel="alternate"][hreflang="en"]').getAttribute("href"), "https://unionnationaltax.com/en/s-corp-tax-advantage");
    assert.equal(await scorp.locator('link[rel="alternate"][hreflang="es"]').getAttribute("href"), "https://unionnationaltax.com/es/s-corp-tax-advantage");
    console.log("/es/scorp-estimator: localized redirect and booking destination passed; CMS body requires approved Spanish copy");
  } finally {
    await scorp.close();
  }
} finally {
  await browser.close();
}
