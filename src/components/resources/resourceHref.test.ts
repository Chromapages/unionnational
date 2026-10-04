import { describe, expect, it } from "vitest";
import { resourceHref } from "./resourceHref";

describe("resourceHref", () => {
    it.each([
        ["playbook", "s-corp-playbook", "/hub/s-corp-playbook"],
        ["playbook", "contractor-tax", "/hub/playbooks/contractor-tax"],
        ["playbook", "restaurant-margin", "/hub/playbooks/restaurant-margin"],
        ["blogPost", "restaurant-margin", "/blog/restaurant-margin"],
    ])("routes %s %s to %s", (type, slug, expected) => {
        expect(resourceHref(type, slug)).toBe(expected);
    });
});
