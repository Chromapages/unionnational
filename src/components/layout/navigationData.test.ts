import { describe, expect, it } from "vitest";
import {
  desktopPrimaryNavigation,
  desktopSecondaryNavigation,
  isNavigationPathActive,
  mergeServiceNavigationData,
  mobileNavigationSections,
  siteNavigationItems,
} from "./navigationData";

describe("navigationData", () => {
  it("derives desktop and drawer navigation from one inventory", () => {
    const desktopIds = [...desktopPrimaryNavigation, ...desktopSecondaryNavigation].map((item) => item.id);
    const mobileIds = mobileNavigationSections.flatMap((section) => section.items.map((item) => item.id));

    expect(desktopPrimaryNavigation.map((item) => item.id)).toEqual(["industries"]);
    expect(desktopSecondaryNavigation.map((item) => item.id)).toEqual(["resources", "about", "shop"]);
    expect(desktopIds).toEqual(["industries", "resources", "about", "shop"]);
    expect(mobileNavigationSections.map((section) => ({
      id: section.id,
      items: section.items.map((item) => item.id),
    }))).toEqual([
      { id: "main", items: ["home", "services", "industries", "about"] },
      { id: "support", items: ["contact", "faq"] },
      { id: "more", items: ["resources", "shop"] },
    ]);
    expect([...mobileIds].sort()).toEqual(siteNavigationItems.map((item) => item.id).sort());
  });

  it("matches route boundaries without highlighting similarly prefixed pages", () => {
    expect(isNavigationPathActive("/about", "/about")).toBe(true);
    expect(isNavigationPathActive("/about/team", "/about")).toBe(true);
    expect(isNavigationPathActive("/about-us", "/about")).toBe(false);
    expect(isNavigationPathActive("/shopify", "/shop")).toBe(false);
  });

  it("fills missing canonical services when CMS navigation data is partial", () => {
    const services = mergeServiceNavigationData([
      {
        _id: "cms-cfo",
        title: "CFO Leadership",
        slug: { current: "fractional-cfo" },
      },
    ]);

    expect(services.find((service) => service.slug?.current === "fractional-cfo")).toMatchObject({
      _id: "cms-cfo",
      title: "CFO Leadership",
    });
    expect(services.some((service) => service.slug?.current === "s-corp-tax-advantage")).toBe(true);
    expect(services.some((service) => service.slug?.current === "tax-planning")).toBe(true);
  });
});
