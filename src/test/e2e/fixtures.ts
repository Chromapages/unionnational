import { test as base } from "@playwright/test";

// Every browser test is read-only unless a test installs a local mock afterward.
export const test = base.extend<{ safeNetwork: void }>({
    safeNetwork: [async ({ context, baseURL }, use) => {
        if (!baseURL || !["localhost", "127.0.0.1", "[::1]"].includes(new URL(baseURL).hostname)) {
            throw new Error("Browser regression tests require a local preview URL.");
        }
        const origin = new URL(baseURL).origin;
        await context.route("**/*", (route) => {
            const request = route.request();
            return new URL(request.url()).origin === origin && ["GET", "HEAD"].includes(request.method())
                ? route.continue()
                : route.abort("blockedbyclient");
        });
        await use();
    }, { auto: true }],
});

export { expect, type Page, type Locator } from "@playwright/test";
