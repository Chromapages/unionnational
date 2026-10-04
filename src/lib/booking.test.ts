import { describe, expect, it } from "vitest";
import { getBookingCtaText, getBookingHref, normalizeBookingReturnTo } from "./booking";

describe("normalizeBookingReturnTo", () => {
  it.each([
    ["/#contact", "/#contact"],
    ["/en/services", "/services"],
    ["/es/services#plans", "/services#plans"],
    ["/industries/construction", "/industries/construction"],
  ])("keeps safe same-site context %s", (input, expected) => {
    expect(normalizeBookingReturnTo(input)).toBe(expected);
  });

  it.each(["//evil.example", "https://evil.example", "javascript:alert(1)", "/services/../book", "/%2f%2fevil.example", "/book", "/es/book"])("rejects unsafe or recursive return %s", (input) => {
    expect(normalizeBookingReturnTo(input)).toBeNull();
  });
});

describe("getBookingCtaText", () => {
  it("uses explicitly localized CMS copy when available", () => {
    expect(getBookingCtaText("Reservar consulta personalizada", "Reservar llamada de estrategia")).toBe(
      "Reservar consulta personalizada",
    );
  });

  it("uses the active locale translation instead of unrelated CMS fallback copy", () => {
    expect(getBookingCtaText(undefined, "Reservar llamada de estrategia")).toBe(
      "Reservar llamada de estrategia",
    );
  });
});

describe("getBookingHref", () => {
  it.each([
    "/contact",
    "/contact/",
    "contact?source=header#form",
    "/en/contact",
    "/es/contact/",
    "https://unionnationaltax.com/contact?source=legacy",
  ])("routes stale contact-page booking destination %s to the owned booking flow", (url) => {
    expect(getBookingHref(url)).toBe("/book");
  });

  it("preserves explicitly configured third-party contact destinations", () => {
    expect(getBookingHref("https://partner.example/contact")).toBe(
      "https://partner.example/contact",
    );
  });
});
