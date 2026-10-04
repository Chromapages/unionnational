import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { afterEach, describe, expect, it } from "vitest";
import type { ScorpEstimatorInput } from "@/lib/scorp/schema";
import { ScorpEstimatorStepFinancials } from "./ScorpEstimatorStepFinancials";

function SelectedValues() {
    const { control } = useFormContext<ScorpEstimatorInput>();
    return <output data-testid="selected-values">{JSON.stringify(useWatch({ control }))}</output>;
}

function Harness({ invalid = false }: { invalid?: boolean }) {
    const methods = useForm<ScorpEstimatorInput>({ defaultValues: {
        annual_revenue_band: "UNDER_100K", estimated_net_profit_range: "UNDER_50K",
        current_payroll_status: "NOT_RUNNING_PAYROLL", tax_payroll_readiness: "MEDIUM",
    } });
    useEffect(() => {
        if (invalid) {
            methods.setError("annual_revenue_band", { message: "Choose revenue" });
            methods.setError("estimated_net_profit_range", { message: "Choose profit" });
            methods.setError("current_payroll_status", { message: "Choose payroll" });
            methods.setError("tax_payroll_readiness", { message: "Choose readiness" });
        }
    }, [invalid, methods]);
    return <FormProvider {...methods}><ScorpEstimatorStepFinancials /><SelectedValues /></FormProvider>;
}

afterEach(cleanup);

describe("S-Corp financial radio keyboard behavior", () => {
    it.each([
        ["Annual Gross Revenue", "annual_revenue_band", "5M_PLUS", "UNDER_100K"],
        ["Estimated Net Profit", "estimated_net_profit_range", "250K_PLUS", "UNDER_50K"],
        ["Currently Running Payroll?", "current_payroll_status", "NOT_SURE", "RUNNING_PAYROLL"],
        ["Implementation Readiness", "tax_payroll_readiness", "HIGH", "LOW"],
    ])("supports roving Home/End and wrapped arrows for %s", (name, field, last, first) => {
        render(<Harness />);
        const radios = within(screen.getByRole("radiogroup", { name })).getAllByRole("radio");
        expect(radios.filter(radio => radio.tabIndex === 0)).toHaveLength(1);
        fireEvent.keyDown(radios[0], { key: "End" });
        expect(radios.at(-1)).toHaveFocus();
        expect(radios.at(-1)).toHaveAttribute("aria-checked", "true");
        expect(screen.getByTestId("selected-values")).toHaveTextContent(`"${field}":"${last}"`);
        fireEvent.keyDown(radios.at(-1)!, { key: "ArrowRight" });
        expect(radios[0]).toHaveFocus();
        expect(screen.getByTestId("selected-values")).toHaveTextContent(`"${field}":"${first}"`);
        fireEvent.keyDown(radios[0], { key: "ArrowUp" });
        expect(radios.at(-1)).toHaveFocus();
        fireEvent.keyDown(radios.at(-1)!, { key: "Home" });
        expect(radios[0]).toHaveFocus();
        expect(radios.filter(radio => radio.tabIndex === 0)).toEqual([radios[0]]);
    });

    it("associates validation errors with all four radio groups", () => {
        render(<Harness invalid />);
        for (const [name, errorId] of [
            ["Annual Gross Revenue", "annual_revenue_band_error"],
            ["Estimated Net Profit", "estimated_net_profit_range_error"],
            ["Currently Running Payroll?", "current_payroll_status_error"],
            ["Implementation Readiness", "tax_payroll_readiness_error"],
        ]) {
            const group = screen.getByRole("radiogroup", { name });
            expect(group).toHaveAttribute("aria-invalid", "true");
            expect(group).toHaveAttribute("aria-describedby", errorId);
            expect(document.getElementById(errorId)).toBeInTheDocument();
        }
    });
});
