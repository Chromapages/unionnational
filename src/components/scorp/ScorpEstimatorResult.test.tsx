import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScorpEstimatorResult } from "./ScorpEstimatorResult";

describe("estimator delivery language", () => {
    it("does not claim an email was sent when rendering results", () => {
        const html = renderToStaticMarkup(<ScorpEstimatorResult fitLevel="POSSIBLE_FIT" savingsRange="$3,000 - $7,000" />);
        expect(html).not.toContain("has been sent");
        expect(html).not.toContain("emailed");
    });
});
