import { describe, expect, it } from "vitest";
import { calculateHealthScores, getHealthAnswersScore, getHealthScoreCategory, HEALTH_ANSWER_CONTRACT_VERSION, HEALTH_QUESTIONS } from "./health-score";

describe("shared health score categories", () => {
    it.each([[40, "critical"], [41, "stable"], [70, "stable"], [73, "stable"], [75, "stable"], [76, "growth"]] as const)(
        "classifies %i as %s", (score, category) => expect(getHealthScoreCategory(score)).toBe(category),
    );
});

const numericAnswers = Object.fromEntries(HEALTH_QUESTIONS.map(question => [question.id, question.options[0].value]));
const optionIds = Object.fromEntries(HEALTH_QUESTIONS.map(question => [question.id, question.options[0].id]));

describe("recovered health answer contract", () => {
    it("retains every recovered question category and option weight", () => {
        // Freeze the recovered business rubric independently of the shared implementation.
        expect(HEALTH_QUESTIONS.map(question => [question.id, question.category, question.options.map(option => option.value)]))
            .toEqual([
                [1, "entity", [15, 10, 8, 3, 0]],
                [2, "compliance", [20, 10, 0, -10, 0]],
                [3, "compliance", [15, 10, 5, 0, 3]],
                [4, "operations", [15, 10, 5, 0]],
                [5, "operations", [12, 8, 4, 0]],
                [6, "operations", [12, 8, 3, 0]],
                [7, "operations", [11, 6, 0]],
            ]);
    });

    it.each(HEALTH_QUESTIONS.flatMap(question => question.options.map(option => ({ question, option }))))(
        "preserves question $question.id option $option.id weight $option.value", ({ question, option }) => {
            const answers = { ...numericAnswers, [question.id]: option.value };
            const ids = { ...optionIds, [question.id]: option.id };
            expect(getHealthAnswersScore(answers, ids, HEALTH_ANSWER_CONTRACT_VERSION)).toBe(calculateHealthScores(answers).total);
            expect(getHealthAnswersScore(answers)).toBe(calculateHealthScores(answers).total);
        },
    );

    it.each([
        [[15, 20, 5, 0, 0, 0, 0], 40, "critical"],
        [[15, 20, 0, 0, 0, 0, 6], 41, "stable"],
        [[15, 20, 15, 15, 4, 0, 6], 75, "stable"],
        [[15, 20, 15, 15, 8, 3, 0], 76, "growth"],
        [[0, -10, 0, 0, 0, 0, 0], 0, "critical"],
        [[15, 20, 15, 15, 12, 12, 11], 100, "growth"],
    ] as const)("retains total/band for %j", (values, expected, category) => {
        const answers = Object.fromEntries(values.map((value, index) => [index + 1, value]));
        expect(getHealthAnswersScore(answers)).toBe(expected);
        expect(calculateHealthScores(answers).total).toBe(expected);
        expect(getHealthScoreCategory(expected)).toBe(category);
        if (values[1] === -10) expect(calculateHealthScores(answers).compliance).toBe(-10);
    });

    it("distinguishes duplicate zero options without inventing a legacy identity", () => {
        const answers = { ...numericAnswers, 2: 0 };
        for (const id of ["missing-one-two", "not-sure"]) {
            expect(getHealthAnswersScore(answers, { ...optionIds, 2: id }, HEALTH_ANSWER_CONTRACT_VERSION)).toBe(80);
        }
        expect(getHealthAnswersScore(answers)).toBe(80);
        expect(answers).not.toHaveProperty("answer_option_ids");
    });

    it.each([
        [optionIds, undefined], [undefined, HEALTH_ANSWER_CONTRACT_VERSION], [optionIds, "unknown"],
        [null, HEALTH_ANSWER_CONTRACT_VERSION], [[], HEALTH_ANSWER_CONTRACT_VERSION],
        [{ ...optionIds, 1: "constructor" }, HEALTH_ANSWER_CONTRACT_VERSION],
        [{ ...optionIds, 1: "unknown-other" }, HEALTH_ANSWER_CONTRACT_VERSION],
        [{ 1: "s-corp" }, HEALTH_ANSWER_CONTRACT_VERSION],
        [{ ...optionIds, 8: "extra" }, HEALTH_ANSWER_CONTRACT_VERSION],
        [{ ...optionIds, "01": "s-corp" }, HEALTH_ANSWER_CONTRACT_VERSION],
    ])("rejects partial/unknown/mismatched identity contract %j", (ids, version) => {
        expect(getHealthAnswersScore(numericAnswers, ids, version)).toBeNull();
    });

    it.each([null, [], { ...numericAnswers, 1: "15" }, { ...numericAnswers, 8: 0 }, { ...numericAnswers, 1: NaN }, { "01": 15, 2: 20, 3: 15, 4: 15, 5: 12, 6: 12, 7: 11 }])("rejects malformed numbers %j", answers => {
        expect(getHealthAnswersScore(answers)).toBeNull();
    });
});
