import { describe, expect, it } from "vitest";
import { localizedAlternates } from "./localizedAlternates";

describe("localizedAlternates", () => {
    it("uses the prefixed page URL as canonical in each locale", () => {
        expect(localizedAlternates("en", "/blog/example")).toEqual({
            canonical: "https://unionnationaltax.com/en/blog/example",
            languages: {
                en: "https://unionnationaltax.com/en/blog/example",
                es: "https://unionnationaltax.com/es/blog/example",
            },
        });
        expect(localizedAlternates("es", "/blog/example")?.canonical).toBe(
            "https://unionnationaltax.com/es/blog/example",
        );
    });
});
