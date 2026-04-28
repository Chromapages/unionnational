// src/components/SCorp/SavingsEstimatorForm.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/scorp-advantage/calculator";

export type SCorpEstimatorFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    entityType: "SOLE_PROP" | "LLC" | "LLC_MULTI" | "S_CORP" | "C_CORP" | "UNKNOWN";
    nicheVertical: "CONSTRUCTION" | "REAL_ESTATE" | "RESTAURANT" | "ECOMMERCE" | "INSURANCE" | "SERVICE" | "OTHER";
    annualRevenueBand: "UNDER_50K" | "50K_100K" | "100K_250K" | "250K_500K" | "500K_1M" | "OVER_1M";
    estimatedNetProfit: number;
    primaryPainPoint: "OVERPAYING_TAXES" | "WRONG_STRUCTURE" | "YEAR_ROUND_PLANNING" | "BOOKKEEPING_VISIBILITY" | "EXPLORING";
    urgencyLevel: "HIGH" | "MEDIUM" | "LOW";
    _hpt: string;
};

interface SavingsEstimatorFormProps {
    onSubmit: (data: SCorpEstimatorFormData) => void | Promise<void>;
    isLoading: boolean;
}

const defaultData: SCorpEstimatorFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    entityType: "LLC",
    nicheVertical: "SERVICE",
    annualRevenueBand: "100K_250K",
    estimatedNetProfit: 100000,
    primaryPainPoint: "OVERPAYING_TAXES",
    urgencyLevel: "MEDIUM",
    _hpt: "",
};

const entityOptions = [
    { label: "Sole Proprietor / Schedule C", value: "SOLE_PROP" },
    { label: "Single-Member LLC (no S-Corp election)", value: "LLC" },
    { label: "Multi-Member LLC", value: "LLC_MULTI" },
    { label: "Already an S-Corp", value: "S_CORP" },
    { label: "C-Corporation", value: "C_CORP" },
    { label: "Not sure", value: "UNKNOWN" },
] as const;

const revenueOptions = [
    { label: "Under $50K", value: "UNDER_50K" },
    { label: "$50K - $100K", value: "50K_100K" },
    { label: "$100K - $250K", value: "100K_250K" },
    { label: "$250K - $500K", value: "250K_500K" },
    { label: "$500K - $1M", value: "500K_1M" },
    { label: "Over $1M", value: "OVER_1M" },
] as const;

const painOptions = [
    { label: "I think I'm overpaying in taxes", value: "OVERPAYING_TAXES" },
    { label: "I'm not sure my structure is right", value: "WRONG_STRUCTURE" },
    { label: "I want to plan better year-round", value: "YEAR_ROUND_PLANNING" },
    { label: "I need cleaner books and better visibility", value: "BOOKKEEPING_VISIBILITY" },
    { label: "I'm just exploring my options", value: "EXPLORING" },
] as const;

const urgencyOptions = [
    { label: "I want to address this right away", value: "HIGH" },
    { label: "Within the next few months", value: "MEDIUM" },
    { label: "Just researching for now", value: "LOW" },
] as const;

function fieldClass(error?: string) {
    return `mt-2 w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 ${error ? "border-rose-300" : "border-gray-200"}`;
}

export function SavingsEstimatorForm({ onSubmit, isLoading }: SavingsEstimatorFormProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<SCorpEstimatorFormData>(defaultData);
    const [error, setError] = useState("");

    const updateField = <K extends keyof SCorpEstimatorFormData>(field: K, value: SCorpEstimatorFormData[K]) => {
        setFormData((current) => ({ ...current, [field]: value }));
        setError("");
    };

    const validateStep = () => {
        if (step === 1) {
            if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
                return "First name, last name, and email are required.";
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                return "Enter a valid email address.";
            }
        }

        if (step === 3 && formData.estimatedNetProfit < 0) {
            return "Estimated net profit must be zero or higher.";
        }

        return "";
    };

    const goNext = () => {
        const validationError = validateStep();
        if (validationError) {
            setError(validationError);
            return;
        }
        setStep((current) => Math.min(current + 1, 4));
    };

    const submit = async () => {
        const validationError = validateStep();
        if (validationError) {
            setError(validationError);
            return;
        }
        await onSubmit(formData);
    };

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md md:p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
                    <span>Step {step} of 4</span>
                    <span>{Math.round((step / 4) * 100)}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${(step / 4) * 100}%` }} />
                </div>
            </div>

            <input
                type="text"
                name="_hpt"
                value={formData._hpt}
                onChange={(event) => updateField("_hpt", event.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            {step === 1 && (
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Business Profile</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">Let&apos;s start with your basic information.</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">Your estimate is personalized to your business - no generic numbers here.</p>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="font-semibold text-gray-900">First name</label>
                            <input id="firstName" className={fieldClass()} value={formData.firstName} onChange={(event) => updateField("firstName", event.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="font-semibold text-gray-900">Last name</label>
                            <input id="lastName" className={fieldClass()} value={formData.lastName} onChange={(event) => updateField("lastName", event.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="font-semibold text-gray-900">Email</label>
                            <input id="email" type="email" className={fieldClass()} value={formData.email} onChange={(event) => updateField("email", event.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="font-semibold text-gray-900">Phone</label>
                            <input id="phone" type="tel" className={fieldClass()} value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="businessName" className="font-semibold text-gray-900">Business name</label>
                            <input id="businessName" className={fieldClass()} value={formData.businessName} onChange={(event) => updateField("businessName", event.target.value)} />
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Business Structure</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">How is your business currently structured?</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">Your entity type determines whether you&apos;re eligible for S-Corp strategy - and how much you may be leaving on the table.</p>

                    <fieldset className="mt-8">
                        <legend className="font-semibold text-gray-900">Entity type</legend>
                        <div className="mt-4 grid gap-3">
                            {entityOptions.map((option) => (
                                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 text-gray-700 transition hover:border-indigo-600">
                                    <input type="radio" name="entityType" value={option.value} checked={formData.entityType === option.value} onChange={() => updateField("entityType", option.value)} />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className="mt-6">
                        <label htmlFor="nicheVertical" className="font-semibold text-gray-900">Niche vertical</label>
                        <select id="nicheVertical" className={fieldClass()} value={formData.nicheVertical} onChange={(event) => updateField("nicheVertical", event.target.value as SCorpEstimatorFormData["nicheVertical"])}>
                            <option value="CONSTRUCTION">Construction / HVAC</option>
                            <option value="REAL_ESTATE">Real Estate</option>
                            <option value="RESTAURANT">Restaurant / Food Service</option>
                            <option value="ECOMMERCE">E-Commerce</option>
                            <option value="INSURANCE">Insurance Agency</option>
                            <option value="SERVICE">General Service Business</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Revenue & Profit</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">What does your business generate?</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">Net profit - not gross revenue - is what determines your S-Corp savings opportunity.</p>

                    <fieldset className="mt-8">
                        <legend className="font-semibold text-gray-900">Annual revenue band</legend>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {revenueOptions.map((option) => (
                                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 text-gray-700 transition hover:border-indigo-600">
                                    <input type="radio" name="annualRevenueBand" value={option.value} checked={formData.annualRevenueBand === option.value} onChange={() => updateField("annualRevenueBand", option.value)} />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className="mt-8">
                        <label htmlFor="estimatedNetProfit" className="font-semibold text-gray-900">
                            Estimated annual net profit: {formatCurrency(formData.estimatedNetProfit)}
                        </label>
                        <input
                            id="estimatedNetProfit"
                            type="range"
                            min={0}
                            max={1000000}
                            step={5000}
                            value={formData.estimatedNetProfit}
                            onChange={(event) => updateField("estimatedNetProfit", Number(event.target.value))}
                            className="mt-4 w-full accent-indigo-600"
                        />
                        <input
                            id="estimatedNetProfitNumber"
                            type="number"
                            min={0}
                            max={1000000}
                            step={5000}
                            value={formData.estimatedNetProfit}
                            onChange={(event) => updateField("estimatedNetProfit", Number(event.target.value))}
                            className={fieldClass()}
                            aria-label="Estimated annual net profit as a number"
                        />
                        <p className="mt-2 text-sm text-gray-500">After business expenses, before your personal taxes.</p>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Pain Point & Intent</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">What&apos;s the most important thing you want to fix?</h2>
                    <p className="mt-3 text-gray-600 leading-relaxed">This helps us route your results to the right evaluation path.</p>

                    <fieldset className="mt-8">
                        <legend className="font-semibold text-gray-900">Primary pain point</legend>
                        <div className="mt-4 grid gap-3">
                            {painOptions.map((option) => (
                                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 text-gray-700 transition hover:border-indigo-600">
                                    <input type="radio" name="primaryPainPoint" value={option.value} checked={formData.primaryPainPoint === option.value} onChange={() => updateField("primaryPainPoint", option.value)} />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="mt-8">
                        <legend className="font-semibold text-gray-900">Urgency level</legend>
                        <div className="mt-4 grid gap-3">
                            {urgencyOptions.map((option) => (
                                <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 text-gray-700 transition hover:border-indigo-600">
                                    <input type="radio" name="urgencyLevel" value={option.value} checked={formData.urgencyLevel === option.value} onChange={() => updateField("urgencyLevel", option.value)} />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>
            )}

            {error && (
                <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                    {error}
                </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={() => setStep((current) => Math.max(current - 1, 1))}
                    disabled={step === 1 || isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                </button>

                <button
                    type="button"
                    onClick={step === 4 ? submit : goNext}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Calculating...
                        </>
                    ) : (
                        <>
                            {step === 4 ? "See My Estimate" : "Continue"}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
