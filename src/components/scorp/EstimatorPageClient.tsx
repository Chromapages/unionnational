// src/components/SCorp/EstimatorPageClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SavingsEstimatorForm, SCorpEstimatorFormData } from "@/components/scorp/SavingsEstimatorForm";
import { calculateFitScore, calculateSCorpSavings } from "@/lib/scorp-advantage/calculator";

export function EstimatorPageClient() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (data: SCorpEstimatorFormData) => {
        setIsLoading(true);
        setError("");

        const estimate = calculateSCorpSavings(data.estimatedNetProfit);
        const fitScore = calculateFitScore(data);
        const highIntentFlag = data.urgencyLevel === "HIGH" || fitScore >= 70 || estimate.estimatedSavings > 15000;

        const resultPayload = {
            ...data,
            ...estimate,
            fitScore,
            highIntentFlag,
        };

        try {
            const response = await fetch("/api/ghl-intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    version: "1.0",
                    eventType: "SCORP_ESTIMATOR_SUBMITTED",
                    sourcePage: "scorp-estimator",
                    leadMagnetType: "SCORP_ESTIMATOR",
                    submittedAt: new Date().toISOString(),
                    _hpt: data._hpt,
                    contact: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                    },
                    business: {
                        businessName: data.businessName,
                        nicheVertical: data.nicheVertical,
                        annualRevenueBand: data.annualRevenueBand,
                        entityType: data.entityType,
                        estimatedNetProfit: data.estimatedNetProfit,
                    },
                    intent: {
                        primaryServiceInterest: "SCORP_STRATEGY",
                        primaryPainPoint: data.primaryPainPoint,
                        consultationType: "SCORP_REVIEW",
                        urgencyLevel: data.urgencyLevel,
                    },
                    results: {
                        scorpEstimatedSavings: estimate.estimatedSavings,
                        suggestedSalary: estimate.suggestedSalary,
                        distributions: estimate.distributions,
                        highIntentFlag,
                        fitScore,
                    },
                    tracking: {
                        referrerUrl: document.referrer || undefined,
                        clientTimestamp: new Date().toISOString(),
                    },
                    meta: {
                        locale: "en",
                        userAgent: navigator.userAgent,
                    },
                }),
            });

            const apiResult = await response.json();

            if (!response.ok) {
                throw new Error(apiResult.error || "We could not submit your estimate. Please try again.");
            }

            sessionStorage.setItem("scorp-estimator-result", JSON.stringify(resultPayload));

            const params = new URLSearchParams({
                firstName: data.firstName,
                businessName: data.businessName,
                netProfit: String(data.estimatedNetProfit),
                savings: String(estimate.estimatedSavings),
                salary: String(estimate.suggestedSalary),
                distributions: String(estimate.distributions),
            });

            router.push(`/scorp-estimator/results?${params.toString()}`);
        } catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : "We could not submit your estimate. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && (
                <div className="mx-auto mb-6 max-w-3xl rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                    {error}
                </div>
            )}
            <SavingsEstimatorForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}
