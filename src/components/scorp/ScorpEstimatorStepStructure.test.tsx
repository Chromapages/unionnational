import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { afterEach, describe, expect, it } from "vitest";
import type { ScorpEstimatorInput } from "@/lib/scorp/schema";
import { ScorpEstimatorStepStructure } from "./ScorpEstimatorStepStructure";

function SelectedValues() {
    const { control } = useFormContext<ScorpEstimatorInput>();
    const values = useWatch({ control });
    return <output data-testid="selected-values">{JSON.stringify(values)}</output>;
}

function Harness({ invalid = false, unselected = false }: { invalid?: boolean; unselected?: boolean }) {
    const methods = useForm<ScorpEstimatorInput>({ defaultValues: unselected ? {} : {
        entity_type: "LLC", niche_vertical: "PROFESSIONAL_SERVICES", income_subject_to_se_tax: "YES",
    } });
    useEffect(() => {
        if (invalid) {
            methods.setError("entity_type", { message: "Choose an entity" });
            methods.setError("niche_vertical", { message: "Choose a vertical" });
            methods.setError("income_subject_to_se_tax", { message: "Choose a tax answer" });
        }
    }, [invalid, methods]);
    return <FormProvider {...methods}><ScorpEstimatorStepStructure /><SelectedValues /></FormProvider>;
}

afterEach(cleanup);

describe("S-Corp structure radio keyboard behavior", () => {
    it("keeps one tab stop per group and selects/focuses the next option with arrow keys", () => {
        render(<Harness />);
        const group = screen.getByRole("radiogroup", { name: "Current Entity Type" });
        const radios = within(group).getAllByRole("radio");
        expect(radios.filter(radio => radio.tabIndex === 0)).toEqual([radios[1]]);
        radios[1].focus();
        fireEvent.keyDown(radios[1], { key: "ArrowRight" });
        expect(radios[2]).toHaveFocus();
        expect(radios[2]).toHaveAttribute("aria-checked", "true");
        expect(radios.filter(radio => radio.tabIndex === 0)).toEqual([radios[2]]);
        expect(screen.getByTestId("selected-values")).toHaveTextContent('"entity_type":"PARTNERSHIP"');
        fireEvent.keyDown(radios[2], { key: "ArrowUp" });
        expect(radios[1]).toHaveFocus();
        expect(radios[1]).toHaveAttribute("aria-checked", "true");
    });

    it("supports Home/End and wraps arrow movement in the other groups", () => {
        render(<Harness />);
        const vertical = within(screen.getByRole("radiogroup", { name: "Niche / Vertical" })).getAllByRole("radio");
        fireEvent.keyDown(vertical[0], { key: "End" });
        expect(vertical[7]).toHaveFocus();
        expect(screen.getByTestId("selected-values")).toHaveTextContent('"niche_vertical":"OTHER"');
        fireEvent.keyDown(vertical[7], { key: "ArrowDown" });
        expect(vertical[0]).toHaveFocus();
        const tax = within(screen.getByRole("radiogroup", { name: "Income Subject to SE Tax?" })).getAllByRole("radio");
        fireEvent.keyDown(tax[0], { key: "ArrowLeft" });
        expect(tax[2]).toHaveFocus();
        expect(screen.getByTestId("selected-values")).toHaveTextContent('"income_subject_to_se_tax":"NOT_SURE"');
        fireEvent.keyDown(tax[2], { key: "Home" });
        expect(tax[0]).toHaveFocus();
    });

    it("makes the first option tabbable before a selection and associates field errors", () => {
        render(<Harness invalid unselected />);
        for (const [name, errorId, message] of [
            ["Current Entity Type", "entity_type_error", "Choose an entity"],
            ["Niche / Vertical", "vertical_error", "Choose a vertical"],
            ["Income Subject to SE Tax?", "se_tax_error", "Choose a tax answer"],
        ]) {
            const group = screen.getByRole("radiogroup", { name });
            const radios = within(group).getAllByRole("radio");
            expect(radios.filter(radio => radio.tabIndex === 0)).toEqual([radios[0]]);
            expect(group).toHaveAttribute("aria-invalid", "true");
            expect(group).toHaveAttribute("aria-describedby", errorId);
            expect(screen.getByText(message)).toHaveAttribute("id", errorId);
        }
    });
});
