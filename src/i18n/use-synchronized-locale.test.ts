import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildLocaleNavigationHref, useSynchronizedLocale } from "./use-synchronized-locale";

const fixture = vi.hoisted(() => ({ locale: "en", pathname: "/shop", router: { replace: vi.fn() }, documentReplace: vi.fn(), getPathname: vi.fn(({ href, locale }: { href: string; locale: string }) => `/${locale}${href === '/' ? '' : href}`), channels: [] as Array<{ onmessage: ((event: MessageEvent<{ locale?: unknown }>) => void) | null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }> }));
vi.mock("next-intl", () => ({ useLocale: () => fixture.locale }));
vi.mock("@/i18n/navigation", () => ({ getPathname: fixture.getPathname, usePathname: () => fixture.pathname, useRouter: () => fixture.router }));
const realWindow = window;

class LanguageChannel {
  onmessage: ((event: MessageEvent<{ locale?: unknown }>) => void) | null = null;
  postMessage = vi.fn();
  close = vi.fn();
  constructor() { fixture.channels.push(this); }
}

function withoutChannel() {
  vi.stubGlobal("BroadcastChannel", undefined);
  Reflect.deleteProperty(window, "BroadcastChannel");
}

beforeEach(() => {
  fixture.locale = "en";
  fixture.pathname = "/shop";
  fixture.router.replace.mockReset();
  fixture.documentReplace.mockReset(); fixture.getPathname.mockClear();
  fixture.channels.length = 0;
  localStorage.clear();
  document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
  window.history.replaceState({}, "", "/en/shop?category=books#results");
  // Browser Location navigation is unforgeable in jsdom; preserve real events,
  // cookies/history/storage while recording the new-document replacement.
  vi.stubGlobal('window', new Proxy(realWindow, {
    get(target, property) {
      if (property === 'location') return { get search() { return realWindow.location.search; }, get hash() { return realWindow.location.hash; }, replace: fixture.documentReplace };
      const value = Reflect.get(target, property, target);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  }));
  vi.stubGlobal("BroadcastChannel", LanguageChannel);
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("buildLocaleNavigationHref", () => {
  it("preserves query parameters and hashes during a locale change", () => {
    expect(buildLocaleNavigationHref("/shop", "?category=books&q=scorp", "#results")).toBe(
      "/shop?category=books&q=scorp#results",
    );
  });

  it("normalizes query and hash fragments supplied without prefixes", () => {
    expect(buildLocaleNavigationHref("/scorp-estimator", "utm_source=email", "estimate")).toBe(
      "/scorp-estimator?utm_source=email#estimate",
    );
  });
});

describe("synchronized language selection", () => {
  it("updates cookie and document language while preserving query/hash navigation and notifying other tabs", () => {
    const { result } = renderHook(() => useSynchronizedLocale());
    act(() => result.current.syncLocale("es"));
    expect(document.cookie).toContain("NEXT_LOCALE=es");
    expect(document.documentElement.lang).toBe("es");
    expect(fixture.getPathname).toHaveBeenCalledWith({ href: '/shop', locale: 'es' });
    expect(fixture.documentReplace).toHaveBeenCalledWith("/es/shop?category=books#results");
    expect(fixture.router.replace).not.toHaveBeenCalled();
    expect(fixture.channels[0].postMessage).toHaveBeenCalledWith({ locale: "es" });
    expect(JSON.parse(localStorage.getItem("union-national-locale")!)).toMatchObject({ locale: "es" });
  });

  it("accepts a supported cross-tab language and ignores invalid messages", () => {
    renderHook(() => useSynchronizedLocale());
    const channel = fixture.channels[0];
    for (const data of [{ locale: "fr" }, { locale: ["es"] }, {}, null]) {
      act(() => channel.onmessage?.({ data } as MessageEvent<{ locale?: unknown }>));
    }
    expect(fixture.documentReplace).not.toHaveBeenCalled();
    act(() => channel.onmessage?.({ data: { locale: "es" } } as MessageEvent<{ locale?: unknown }>));
    expect(fixture.documentReplace).toHaveBeenCalledWith("/es/shop?category=books#results");
    expect(document.cookie).toContain("NEXT_LOCALE=es");
  });

  it("does not navigate again when a broadcast matches the currently displayed language", () => {
    fixture.locale = "es";
    renderHook(() => useSynchronizedLocale());
    act(() => fixture.channels[0].onmessage?.({ data: { locale: "es" } } as MessageEvent<{ locale?: unknown }>));
    expect(fixture.documentReplace).not.toHaveBeenCalled();
    expect(document.documentElement.lang).toBe("es");
    expect(document.cookie).toContain("NEXT_LOCALE=es");
  });

  it("closes the broadcast subscription on unmount", () => {
    const { unmount } = renderHook(() => useSynchronizedLocale());
    const channel = fixture.channels[0];
    unmount();
    expect(channel.close).toHaveBeenCalledOnce();
  });

  it("uses storage events when BroadcastChannel is unavailable and rejects malformed values", () => {
    withoutChannel();
    renderHook(() => useSynchronizedLocale());
    for (const [key, newValue] of [["unrelated", '{"locale":"es"}'], ["union-national-locale", null], ["union-national-locale", "not-json"], ["union-national-locale", '{"locale":"fr"}'], ["union-national-locale", '{"locale":1}']]) {
      act(() => window.dispatchEvent(new StorageEvent("storage", { key, newValue })));
    }
    expect(fixture.documentReplace).not.toHaveBeenCalled();
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "union-national-locale", newValue: '{"locale":"es"}' })));
    expect(fixture.documentReplace).toHaveBeenCalledWith("/es/shop?category=books#results");
  });

  it("removes the storage subscription after unmount", () => {
    withoutChannel();
    const { unmount } = renderHook(() => useSynchronizedLocale());
    unmount();
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "union-national-locale", newValue: '{"locale":"es"}' })));
    expect(fixture.documentReplace).not.toHaveBeenCalled();
  });

  it("keeps in-tab navigation working when preference storage rejects writes", () => {
    withoutChannel();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage unavailable"); });
    const { result } = renderHook(() => useSynchronizedLocale());
    act(() => result.current.syncLocale("es"));
    expect(fixture.documentReplace).toHaveBeenCalledWith("/es/shop?category=books#results");
    expect(document.cookie).toContain("NEXT_LOCALE=es");
  });

  it("follows the locale supplied after navigation without changing the current route", () => {
    const { rerender } = renderHook(() => useSynchronizedLocale());
    fixture.locale = "es";
    fixture.pathname = "/about";
    rerender();
    expect(document.documentElement.lang).toBe("es");
    expect(fixture.documentReplace).not.toHaveBeenCalled();
  });
  it('replaces the document for a root-locale round trip while retaining the query and anchor', () => {
    fixture.pathname = '/';
    realWindow.history.replaceState({}, '', '/en?utm_source=fixture#how-it-works');
    const { result, rerender } = renderHook(() => useSynchronizedLocale());
    act(() => result.current.syncLocale('es'));
    expect(fixture.documentReplace).toHaveBeenLastCalledWith('/es?utm_source=fixture#how-it-works');
    // Simulate the completed next document rather than retaining its old CSP.
    fixture.locale = 'es'; realWindow.history.replaceState({}, '', '/es?utm_source=fixture#how-it-works'); rerender();
    act(() => result.current.syncLocale('en'));
    expect(fixture.documentReplace).toHaveBeenLastCalledWith('/en?utm_source=fixture#how-it-works');
    expect(fixture.router.replace).not.toHaveBeenCalled();
    expect(document.cookie).toContain('NEXT_LOCALE=en');
  });
});
