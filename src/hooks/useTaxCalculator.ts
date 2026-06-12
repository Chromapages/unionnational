/**
 * useCounter - Animated counter hook with ease-out quart easing.
 * Extracted from VideoHero for reusability and testability.
 */
import { useState, useEffect, useRef } from "react";

interface UseCounterOptions {
    /** End value to count to */
    end: number;
    /** Animation duration in milliseconds */
    duration?: number;
    /** Whether to start the animation */
    start?: boolean;
}

/**
 * Counts from 0 to `end` with ease-out-quart easing.
 * Returns the current animated value (not the raw end value).
 *
 * @example
 * const savings = useCounter(12000, 1500, showResult);
 */
export const useCounter = ({ end, duration = 1000, start = false }: UseCounterOptions): number => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) {
            setCount(0);
            return;
        }

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(end * ease);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, start]);

    return count;
};

interface UseCalculationResult {
    savings: number;
    oldTax: number;
    newTax: number;
}

interface UseTaxCalculatorOptions {
    /** The net income value as a string (may include commas) */
    income: string;
    /** Whether calculation is enabled */
    enabled: boolean;
    /** Calculation delay in ms (for UX simulation) */
    delay?: number;
}

/**
 * Simplified S-Corp tax savings calculator.
 *
 * Logic:
 * - Old tax = netIncome * 15.3% (self-employment tax rate)
 * - Salary = 40% of netIncome (capped at minimum $40k if income > $40k)
 * - New tax = salary * 15.3%
 * - Savings = oldTax - newTax
 *
 * @example
 * const { result, isCalculating } = useTaxCalculator({ income, enabled: true });
 */
export const useTaxCalculator = ({
    income,
    enabled,
    delay = 800,
}: UseTaxCalculatorOptions): {
    result: UseCalculationResult | null;
    isCalculating: boolean;
} => {
    const [result, setResult] = useState<UseCalculationResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        if (!enabled || !income) {
            setResult(null);
            setIsCalculating(false);
            return;
        }

        setIsCalculating(true);
        setResult(null);

        const timer = window.setTimeout(() => {
            const netIncome = parseFloat(income.replace(/[.,]/g, "")) || 0;

            // Self-employment tax rate (Social Security 12.4% + Medicare 2.9%)
            const SE_TAX_RATE = 0.153;

            const oldTax = netIncome * SE_TAX_RATE;
            let salary = netIncome * 0.4;
            if (salary < 40000 && netIncome > 40000) salary = 40000;
            if (netIncome < 40000) salary = netIncome;

            const newTax = salary * SE_TAX_RATE;
            const savings = oldTax - newTax;

            setResult({
                savings: Math.max(0, savings),
                oldTax,
                newTax,
            });
            setIsCalculating(false);
        }, delay);

        return () => {
            window.clearTimeout(timer);
        };
    }, [income, enabled, delay]);

    return { result, isCalculating };
};

/**
 * Format a number as USD currency without cents.
 */
export const formatCurrency = (value: number, locale: string = "en-US"): string => {
    const resolvedLocale = locale === "es" ? "es-ES" : locale;
    return new Intl.NumberFormat(resolvedLocale, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
};
