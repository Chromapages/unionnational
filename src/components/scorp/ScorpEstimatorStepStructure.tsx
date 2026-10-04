"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { ScorpEstimatorInput } from "@/lib/scorp/schema";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { KeyboardEvent } from "react";

const ENTITY_TYPES = [
    { value: "SOLE_PROP", label: "Sole Proprietorship" },
    { value: "LLC", label: "Single/Multi-Member LLC" },
    { value: "PARTNERSHIP", label: "Partnership" },
    { value: "S_CORP", label: "Existing S-Corp" },
    { value: "C_CORP", label: "C-Corporation" },
    { value: "NOT_SURE", label: "Not Sure / Other" }
];

const VERTICALS = [
    { value: "PROFESSIONAL_SERVICES", label: "Professional Services" },
    { value: "CONSTRUCTION", label: "Construction & Trades" },
    { value: "REAL_ESTATE", label: "Real Estate & Agency" },
    { value: "ECOMMERCE", label: "E-commerce & Retail" },
    { value: "RESTAURANT", label: "Restaurant & Hospitality" },
    { value: "INSURANCE", label: "Insurance Services" },
    { value: "AGENCY", label: "Agency / Marketing" },
    { value: "OTHER", label: "Other Business" }
];

const SE_TAX_OPTIONS = ["YES", "NO", "NOT_SURE"];

export const ScorpEstimatorStepStructure = () => {
    const { register, control, setValue, formState: { errors } } = useFormContext<ScorpEstimatorInput>();
    
    const currentEntity = useWatch({
        control,
        name: "entity_type"
    });

    const currentVertical = useWatch({
        control,
        name: "niche_vertical"
    });

    const currentSeTax = useWatch({
        control,
        name: "income_subject_to_se_tax"
    });

    const handleSelect = (fieldName: keyof ScorpEstimatorInput, value: string) => {
        setValue(fieldName, value as ScorpEstimatorInput[keyof ScorpEstimatorInput], { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const handleRadioKeyDown = (event: KeyboardEvent<HTMLButtonElement>, fieldName: keyof ScorpEstimatorInput, options: string[], index: number) => {
        let nextIndex: number;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + options.length) % options.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = options.length - 1;
        else return;

        event.preventDefault();
        handleSelect(fieldName, options[nextIndex]);
        event.currentTarget.closest('[role="radiogroup"]')?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[nextIndex]?.focus();
    };
    const entityTabStop = Math.max(0, ENTITY_TYPES.findIndex(type => type.value === currentEntity));
    const verticalTabStop = Math.max(0, VERTICALS.findIndex(vertical => vertical.value === currentVertical));
    const seTaxTabStop = Math.max(0, SE_TAX_OPTIONS.indexOf(currentSeTax));

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="space-y-4" role="radiogroup" aria-labelledby="entity_type_label" aria-invalid={Boolean(errors.entity_type)} aria-describedby={errors.entity_type ? "entity_type_error" : undefined}>
                <label id="entity_type_label" className="text-sm font-bold text-brand-500 uppercase tracking-wider block">Current Entity Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ENTITY_TYPES.map((type, index) => (
                        <button
                            key={type.value}
                            type="button"
                            role="radio"
                            aria-checked={currentEntity === type.value}
                            tabIndex={index === entityTabStop ? 0 : -1}
                            aria-describedby={errors.entity_type ? "entity_type_error" : undefined}
                            onKeyDown={event => handleRadioKeyDown(event, "entity_type", ENTITY_TYPES.map(option => option.value), index)}
                            onClick={() => handleSelect("entity_type", type.value)}
                            className={cn(
                                "text-left px-5 py-4 rounded-xl border transition-all font-body text-sm",
                                currentEntity === type.value 
                                    ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                                    : "bg-white text-slate-600 border-slate-200 hover:border-gold-500"
                            )}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
                {errors.entity_type && <p id="entity_type_error" className="text-red-500 text-xs font-medium">{errors.entity_type.message}</p>}
            </div>

            <div className="space-y-4" role="radiogroup" aria-labelledby="vertical_label" aria-invalid={Boolean(errors.niche_vertical)} aria-describedby={errors.niche_vertical ? "vertical_error" : undefined}>
                <label id="vertical_label" className="text-sm font-bold text-brand-500 uppercase tracking-wider block">Niche / Vertical</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {VERTICALS.map((v, index) => (
                        <button
                            key={v.value}
                            type="button"
                            role="radio"
                            aria-checked={currentVertical === v.value}
                            tabIndex={index === verticalTabStop ? 0 : -1}
                            aria-describedby={errors.niche_vertical ? "vertical_error" : undefined}
                            onKeyDown={event => handleRadioKeyDown(event, "niche_vertical", VERTICALS.map(option => option.value), index)}
                            onClick={() => handleSelect("niche_vertical", v.value)}
                            className={cn(
                                "text-left px-5 py-4 rounded-xl border transition-all font-body text-sm",
                                currentVertical === v.value 
                                    ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                                    : "bg-white text-slate-600 border-slate-200 hover:border-gold-500"
                            )}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
                {errors.niche_vertical && <p id="vertical_error" className="text-red-500 text-xs font-medium">{errors.niche_vertical.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4" role="radiogroup" aria-labelledby="se_tax_label" aria-invalid={Boolean(errors.income_subject_to_se_tax)} aria-describedby={errors.income_subject_to_se_tax ? "se_tax_error" : undefined}>
                    <label id="se_tax_label" className="text-sm font-bold text-brand-500 uppercase tracking-wider block">Income Subject to SE Tax?</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {SE_TAX_OPTIONS.map((val, index) => (
                            <button
                                key={val}
                                type="button"
                                role="radio"
                                aria-checked={currentSeTax === val}
                                tabIndex={index === seTaxTabStop ? 0 : -1}
                                aria-describedby={errors.income_subject_to_se_tax ? "se_tax_error" : undefined}
                                onKeyDown={event => handleRadioKeyDown(event, "income_subject_to_se_tax", SE_TAX_OPTIONS, index)}
                                onClick={() => handleSelect("income_subject_to_se_tax", val)}
                                className={cn(
                                    "flex-1 px-4 py-4 rounded-xl border transition-all font-body text-xs font-bold",
                                    currentSeTax === val 
                                        ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                                        : "bg-white text-slate-600 border-slate-200 hover:border-gold-500"
                                )}
                            >
                                {val.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                    {errors.income_subject_to_se_tax && <p id="se_tax_error" className="text-red-500 text-xs font-medium">{errors.income_subject_to_se_tax.message}</p>}
                </div>

                <div className="space-y-4">
                    <label htmlFor="state_location" className="text-sm font-bold text-brand-900 uppercase tracking-wider block">State Location (Optional)</label>
                    <input 
                        id="state_location"
                        {...register("state_location")} 
                        placeholder="e.g. CA, TX, NY"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-body uppercase"
                    />
                </div>
            </div>
        </motion.div>
    );
};
