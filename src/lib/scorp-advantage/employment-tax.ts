// 2026 SSA contribution base: https://www.ssa.gov/oact/cola/cbb.html
// SE earnings/rates: https://www.irs.gov/taxtopics/tc554
export const EMPLOYMENT_TAX_YEAR = 2026;
export const SOCIAL_SECURITY_WAGE_BASE = 184500;
export const ILLUSTRATIVE_SALARY_RATIO = 0.6;
export const EMPLOYMENT_TAX_ASSUMPTIONS = "2026 illustration with no other wages or income. Owner salary is an illustrative assumption, not a reasonable-compensation recommendation. Excludes filing-status effects, Additional Medicare Tax, federal/state income taxes, state payroll taxes, and payroll/compliance costs. Salary and distributions are shown before employer payroll costs; actual results may differ.";

export function calculateEmploymentTax(earnings: number): number {
    if (!Number.isFinite(earnings) || earnings < 0) throw new RangeError("Earnings must be a finite nonnegative number.");
    return Math.min(earnings, SOCIAL_SECURITY_WAGE_BASE) * 0.124 + earnings * 0.029;
}

export function calculateEmploymentTaxComparison(netProfit: number, salary: number) {
    if (!Number.isFinite(netProfit) || netProfit < 0) throw new RangeError("Profit must be a finite nonnegative number.");
    const selfEmploymentEarnings = netProfit * 0.9235;
    const selfEmploymentTax = selfEmploymentEarnings >= 400 ? calculateEmploymentTax(selfEmploymentEarnings) : 0;
    const payrollTax = calculateEmploymentTax(salary);
    return { selfEmploymentTax, payrollTax, estimatedSavings: Math.round(Math.max(0, selfEmploymentTax - payrollTax)) };
}
