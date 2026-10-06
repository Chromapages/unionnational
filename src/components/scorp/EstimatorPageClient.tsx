// src/components/SCorp/EstimatorPageClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SavingsEstimatorForm, SCorpEstimatorFormData } from "@/components/scorp/SavingsEstimatorForm";
import { calculateFitScore, calculateSCorpSavings, isHighIntent } from "@/lib/scorp-advantage/calculator";
import { sanitizeReferrerUrl } from "@/lib/scorp-advantage/referrer";
import { clearEstimatorResult, saveEstimatorResult } from "@/lib/scorp-advantage/result-storage";

export function EstimatorPageClient() {
    const submissionId = useRef(crypto.randomUUID());
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (data: SCorpEstimatorFormData) => {
        clearEstimatorResult();
        if (!Number.isFinite(data.estimatedNetProfit) || data.estimatedNetProfit < 0 || data.estimatedNetProfit > 1000000) {
            setError("Estimated net profit must be between $0 and $1,000,000.");
            return;
        }
        setIsLoading(true);
        setError("");

        const estimate = calculateSCorpSavings(data.estimatedNetProfit, data.entityType);
        const fitScore = calculateFitScore(data);
        const highIntentFlag = isHighIntent(data);

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
                        referrerUrl: sanitizeReferrerUrl(document.referrer),
                        clientTimestamp: new Date().toISOString(),
                    },
                    meta: {
                        locale: document.documentElement.lang === "es" ? "es" : "en",
                        userAgent: navigator.userAgent,
                        submissionId: submissionId.current,
                    },
                }),
            });

            const apiResult = await response.json();

            if (!response.ok || apiResult.success !== true) {
                throw new Error(apiResult.error || "We could not submit your estimate. Please try again.");
            }

            saveEstimatorResult(estimate);

            router.push("/scorp-estimator/results");
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
