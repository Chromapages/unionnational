"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Building2,
    Briefcase,
    Calendar,
    Users,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Zap,
    Scale,
    AlertCircle,
    Loader2,
    MapPin,
    Search,
    PiggyBank,
    BarChart3,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// --- Form Schema (Funnel Map 07 & CRM Pipeline 08 Optimized) ---
const intakeSchema = z.object({
    // Step 1: Core Basics
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone required"),
    companyName: z.string().min(2, "Company name is required"),
    
    // Step 2: Business Profile
    industry: z.string().min(1, "Please select an industry"),
    businessType: z.enum(['Service-Based', 'Product/E-commerce', 'Brick & Mortar', 'High-Growth Tech', 'Other']),
    state: z.string().min(2, "Required"),
    revenueRange: z.enum(['$0-$100k', '$100k-$500k', '$500k-$1M', '$1M-$5M', '$5M+']),
    yearsInBusiness: z.string().min(1, "Required"),
    
    // Step 3: Entity & Financial Health
    entityType: z.enum(['Sole Proprietorship', 'LLC (Single)', 'LLC (Multi)', 'S-Corp', 'C-Corp', 'Other']),
    hasAccountant: z.enum(['Yes, I have an accountant', 'I do it myself', 'I have a bookkeeper only', 'No professional help']),
    booksStatus: z.enum(['Books are current', 'Somewhat behind', 'Major cleanup needed', 'I don’t know']),
    interestedInSCorp: z.boolean(),
    
    // Step 4: Needs & Interest
    primaryPainPoint: z.string().min(1, "Please tell us what's most important"),
    servicesOfInterest: z.array(z.string()).min(1, "Select at least one service"),
    
    // Step 5: Urgency & Investment
    urgency: z.enum(['Immediate (This month)', '1-3 Months', 'Looking for next year', 'Just researching']),
    investmentWillingness: z.enum(['Yes, ready to invest in strategy', 'Maybe, depending on ROI', 'Mostly looking for free advice']),
    preferredNextStep: z.enum(['Book Strategy Call Now', 'Receive Email Summary', 'Wait for callback']),
});

type IntakeData = z.infer<typeof intakeSchema>;

export const StrategyIntakeForm = () => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors, isValid, isSubmitting },
    } = useForm<IntakeData>({
        resolver: zodResolver(intakeSchema),
        mode: "onChange",
        defaultValues: {
            servicesOfInterest: [],
            interestedInSCorp: false,
        }
    });

    const currentRevenue = watch("revenueRange");
    const currentEntity = watch("entityType");
    const currentUrgency = watch("urgency");
    const currentAccountant = watch("hasAccountant");
    const currentBooks = watch("booksStatus");
    const currentInvest = watch("investmentWillingness");
    const currentNextStep = watch("preferredNextStep");
    const currentBusType = watch("businessType");

    // --- Navigation Logic ---
    const handleNext = async () => {
        let fieldsToValidate: (keyof IntakeData)[] = [];
        if (step === 1) fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'companyName'];
        if (step === 2) fieldsToValidate = ['industry', 'businessType', 'state', 'revenueRange', 'yearsInBusiness'];
        if (step === 3) fieldsToValidate = ['entityType', 'hasAccountant', 'booksStatus'];
        if (step === 4) fieldsToValidate = ['primaryPainPoint', 'servicesOfInterest'];
        if (step === 5) fieldsToValidate = ['urgency', 'investmentWillingness', 'preferredNextStep'];
        
        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setDirection(1);
            setStep(s => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(s => s - 1);
    };

    const onSubmit = async (data: IntakeData) => {
        try {
            const response = await fetch("/api/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            // Smart Routing logic is handled by the API, but client handles the handoff
            if (result.success && result.redirect) {
                router.push(result.redirect);
            } else {
                setIsComplete(true);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setIsComplete(true);
        }
    };

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 40 : -40, opacity: 0 }),
    };

    if (isComplete) {
        return (
            <div className="bg-white rounded-[2rem] p-12 lg:p-20 text-center border-2 border-slate-100 shadow-3xl max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-bold text-brand-900 font-heading mb-6 tracking-tighter uppercase">Assessment Received</h2>
                <p className="text-xl text-brand-900/60 mb-12 leading-relaxed font-light">
                    Our advisors are reviewing your profile. You will receive your preliminary strategy summary via email within 24 business hours.
                </p>
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => router.push("/book")}
                        className="bg-brand-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-gold-500 hover:text-brand-900 transition-all text-xl shadow-xl shadow-brand-900/20"
                    >
                        Schedule Strategy Call Now
                    </button>
                    <button 
                        onClick={() => router.push("/")}
                        className="text-slate-400 font-bold hover:text-brand-900 transition-colors uppercase tracking-widest text-xs"
                    >
                        Return to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden relative">
                {/* Progress Header */}
                <div className="bg-slate-50/50 border-b border-slate-100 px-10 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black text-brand-900/40 uppercase tracking-[0.3em]">Lifecycle Stage: Intake ({step}/5)</span>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map(s => (
                                <div 
                                    key={s} 
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-700",
                                        step === s ? "w-10 bg-gold-500" : (step > s ? "w-4 bg-brand-900" : "w-4 bg-slate-200")
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="px-10 py-12 lg:px-16 lg:py-16">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="space-y-10"
                        >
                            {/* STEP 1: CORE BASICS (Funnel 07 Sync) */}
                            {step === 1 && (
                                <div className="space-y-8 text-center sm:text-left">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tighter uppercase underline decoration-gold-500/30 underline-offset-8">Core Profile</h2>
                                        <p className="text-brand-900/60 text-lg font-light leading-relaxed">Let's verify your identity and business context.</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">First Name</label>
                                            <input {...register("firstName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all shadow-sm italic" placeholder="e.g. Michael" />
                                            {errors.firstName && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                            <input {...register("lastName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all shadow-sm italic" placeholder="e.g. Ross" />
                                            {errors.lastName && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.lastName.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Company Legal Name</label>
                                            <div className="relative">
                                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold-500 transition-colors" size={20} />
                                                <input {...register("companyName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl pl-14 pr-6 py-4 transition-all shadow-sm italic font-bold" placeholder="Union National Ventures LLC" />
                                            </div>
                                            {errors.companyName && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.companyName.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Business Email</label>
                                                <input {...register("email")} type="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all shadow-sm italic" placeholder="michael@domain.com" />
                                                {errors.email && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.email.message}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Direct Phone</label>
                                                <input {...register("phone")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all shadow-sm italic" placeholder="(555) 000-0000" />
                                                {errors.phone && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: BUSINESS PROFILE (Funnel 07 Sync) */}
                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tighter uppercase underline decoration-gold-500/30 underline-offset-8">Operating Scale</h2>
                                        <p className="text-brand-900/60 text-lg font-light">We specialize in specific operating footprints.</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Primary Industry</label>
                                            <select {...register("industry")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all appearance-none cursor-pointer font-bold italic">
                                                <option value="">Select Industry...</option>
                                                <option value="Construction">Construction</option>
                                                <option value="Restaurant">Restaurant / Hospitality</option>
                                                <option value="Real Estate">Real Estate / Dev</option>
                                                <option value="Professional Services">Professional Services</option>
                                                <option value="E-commerce">Retail / E-commerce</option>
                                                <option value="Other">Other Specialized</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Operating State</label>
                                            <input {...register("state")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all shadow-sm italic" placeholder="e.g. Florida" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Model Type</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {['Service-Based', 'Product/E-commerce', 'Brick & Mortar', 'High-Growth Tech'].map((type) => (
                                                <div 
                                                    key={type}
                                                    onClick={() => setValue("businessType", type as IntakeData['businessType'])}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all cursor-pointer font-bold text-center text-xs tracking-tighter",
                                                        currentBusType === type ? "border-gold-500 bg-gold-500/5 text-brand-900 shadow-sm" : "border-slate-100 bg-white text-slate-400 hover:border-gold-500/30"
                                                    )}
                                                >
                                                    {type}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1 block mb-6">Gross Annual Revenue (High Fit Signal)</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {['$0-$100k', '$100k-$500k', '$500k-$1M', '$1M-$5M', '$5M+'].map((range) => (
                                                <div 
                                                    key={range}
                                                    onClick={() => setValue("revenueRange", range as IntakeData['revenueRange'])}
                                                    className={cn(
                                                        "p-5 rounded-2xl border-2 transition-all cursor-pointer font-black text-center text-sm",
                                                        currentRevenue === range ? "border-brand-950 bg-brand-950 text-gold-500 shadow-xl" : "border-slate-100 bg-slate-50 text-slate-400 hover:border-gold-500/30"
                                                    )}
                                                >
                                                    {range}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: ENTITY & HEALTH (Funnel 07 Sync) */}
                            {step === 3 && (
                                <div className="space-y-8">
                                    <div className="space-y-3 text-left">
                                        <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tighter uppercase underline decoration-gold-500/30 underline-offset-8">Financial Health</h2>
                                        <p className="text-brand-900/60 text-lg font-light">Structure determines your maximum savings ceiling.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Current Entity Selection</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {['Sole Proprietorship', 'LLC (Single)', 'LLC (Multi)', 'S-Corp', 'C-Corp', 'Other'].map((entity) => (
                                                    <div 
                                                        key={entity}
                                                        onClick={() => setValue("entityType", entity as IntakeData['entityType'])}
                                                        className={cn(
                                                            "p-4 rounded-xl border-2 transition-all cursor-pointer font-bold text-center text-[11px] leading-tight",
                                                            currentEntity === entity ? "border-brand-900 bg-brand-900 text-white shadow-lg" : "border-slate-100 bg-slate-50 text-slate-400 hover:border-gold-500/30"
                                                        )}
                                                    >
                                                        {entity}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Accounting Support</label>
                                                <div className="space-y-2">
                                                    {['Yes, I have an accountant', 'I do it myself', 'I have a bookkeeper only', 'No professional help'].map(opt => (
                                                        <div 
                                                            key={opt}
                                                            onClick={() => setValue("hasAccountant", opt as IntakeData['hasAccountant'])}
                                                            className={cn(
                                                                "px-6 py-3 rounded-xl border-2 transition-all cursor-pointer text-sm font-bold flex justify-between items-center group",
                                                                currentAccountant === opt ? "border-gold-500 bg-gold-50 text-brand-900" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-gold-500/20"
                                                            )}
                                                        >
                                                            {opt}
                                                            <div className={cn("w-2 h-2 rounded-full", currentAccountant === opt ? "bg-gold-500" : "bg-slate-200")} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Current Book Accuracy</label>
                                                <div className="space-y-2">
                                                    {['Books are current', 'Somewhat behind', 'Major cleanup needed', 'I don’t know'].map(opt => (
                                                        <div 
                                                            key={opt}
                                                            onClick={() => setValue("booksStatus", opt as IntakeData['booksStatus'])}
                                                            className={cn(
                                                                "px-6 py-3 rounded-xl border-2 transition-all cursor-pointer text-sm font-bold flex justify-between items-center",
                                                                currentBooks === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-gold-500/20"
                                                            )}
                                                        >
                                                            {opt}
                                                            <div className={cn("w-2 h-2 rounded-full", currentBooks === opt ? "bg-gold-500 shadow-[0_0_8px_gold]" : "bg-slate-200")} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: PAIN & INTEREST */}
                            {step === 4 && (
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tighter uppercase underline decoration-gold-500/30 underline-offset-8">Strategic Priorities</h2>
                                        <p className="text-brand-900/60 text-lg font-light leading-relaxed">What part of the "Growth OS" is broken?</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Your Primary Financial Friction Point?</label>
                                        <textarea 
                                            {...register("primaryPainPoint")} 
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 outline-none rounded-2xl px-8 py-6 transition-all h-36 resize-none italic text-lg leading-relaxed"
                                            placeholder="e.g. I’m making great revenue but my bank account is empty, or I’m terrified of my next tax bill..."
                                        />
                                    </div>

                                    <div className="space-y-4 pt-6">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1 block mb-4">Advisory Pillars of Interest</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {[
                                                { id: 'scorp', label: 'S-Corp Advantage', icon: TrendingUp },
                                                { id: 'cfo', label: 'Fractional CFO Strategy', icon: BarChart3 },
                                                { id: 'planning', label: 'Proactive Tax Planning', icon: PiggyBank },
                                                { id: 'bookkeeping', label: 'Strategic Visibility/Books', icon: Search },
                                                { id: 'filing', label: 'Premium Tax Filing', icon: ShieldCheck }
                                            ].map(item => (
                                                <label key={item.id} className="flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-100 bg-white cursor-pointer hover:border-gold-500/50 transition-all group has-[:checked]:border-gold-500 has-[:checked]:bg-gold-500/5">
                                                    <div className="relative flex items-center justify-center">
                                                        <input 
                                                            type="checkbox" 
                                                            value={item.label}
                                                            {...register("servicesOfInterest")}
                                                            className="peer sr-only"
                                                        />
                                                        <div className="w-6 h-6 border-2 border-slate-200 rounded-lg group-hover:border-gold-500 peer-checked:bg-gold-500 peer-checked:border-gold-500 transition-all flex items-center justify-center">
                                                            <CheckCircle2 size={14} className="text-white scale-0 peer-checked:scale-100 transition-transform" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-brand-900 text-[11px] uppercase tracking-widest leading-none mb-1">{item.label}</span>
                                                        <span className="text-[10px] text-slate-400 font-light italic">Available advisory route</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 5: URGENCY & LOGIC (Funnel 07 Sync) */}
                            {step === 5 && (
                                <div className="space-y-10">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-bold text-brand-900 font-heading tracking-tighter uppercase underline decoration-gold-500/30 underline-offset-8">Deployment Urgency</h2>
                                        <p className="text-brand-900/60 text-lg font-light leading-relaxed">How fast do we need to implement these changes?</p>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Timeline</label>
                                                <div className="space-y-2">
                                                    {['Immediate (This month)', '1-3 Months', 'Looking for next year', 'Just researching'].map(t => (
                                                        <div 
                                                            key={t}
                                                            onClick={() => setValue("urgency", t as IntakeData['urgency'])}
                                                            className={cn(
                                                                "p-4 rounded-xl border-2 transition-all cursor-pointer font-bold flex justify-between items-center text-sm",
                                                                currentUrgency === t ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-gold-500/30"
                                                            )}
                                                        >
                                                            {t}
                                                            <CheckCircle2 className={cn("w-5 h-5", currentUrgency === t ? "text-gold-500" : "text-transparent")} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Investment Readiness</label>
                                                <div className="space-y-2">
                                                    {['Yes, ready to invest in strategy', 'Maybe, depending on ROI', 'Mostly looking for free advice'].map(opt => (
                                                        <div 
                                                            key={opt}
                                                            onClick={() => setValue("investmentWillingness", opt as IntakeData['investmentWillingness'])}
                                                            className={cn(
                                                                "p-4 rounded-xl border-2 transition-all cursor-pointer font-bold flex justify-between items-center text-sm",
                                                                currentInvest === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-gold-500/30"
                                                            )}
                                                        >
                                                            {opt}
                                                            <Zap className={cn("w-5 h-5", currentInvest === opt ? "text-gold-500" : "text-transparent")} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Preferred Next Step</label>
                                                <div className="space-y-4">
                                                    {[
                                                        { id: 'Book Strategy Call Now', icon: Calendar, desc: 'Schedule your preliminary review on our calendar today.' },
                                                        { id: 'Receive Email Summary', icon: Search, desc: 'Get a strategy profile delivered to your inbox first.' },
                                                        { id: 'Wait for callback', icon: Users, desc: 'Have an advisor reach out to you via phone.' }
                                                    ].map(opt => (
                                                        <div 
                                                            key={opt.id}
                                                            onClick={() => setValue("preferredNextStep", opt.id as IntakeData['preferredNextStep'])}
                                                            className={cn(
                                                                "p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 group relative overflow-hidden",
                                                                currentNextStep === opt.id ? "border-gold-500 bg-gold-500/5 text-brand-900" : "border-slate-50 bg-slate-50 text-slate-400 hover:border-gold-500/20"
                                                            )}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-black uppercase tracking-widest text-[11px]">{opt.id}</span>
                                                                <opt.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", currentNextStep === opt.id ? "text-gold-600" : "text-slate-300")} />
                                                            </div>
                                                            <p className={cn("text-[10px] leading-relaxed italic", currentNextStep === opt.id ? "text-slate-600" : "text-slate-400")}>{opt.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Controls (Institutional Style) */}
                    <div className="flex justify-between items-center mt-20 pt-10 border-t border-slate-100 italic">
                        {step > 1 ? (
                            <button 
                                type="button" 
                                onClick={handleBack}
                                className="flex items-center gap-3 text-slate-400 font-bold hover:text-brand-900 transition-colors uppercase tracking-[0.2em] text-[10px]"
                            >
                                <ArrowLeft className="w-5 h-5" /> Roll Back Step
                            </button>
                        ) : (
                            <div className="flex items-center gap-3 text-slate-300 pointer-events-none uppercase tracking-[0.2em] text-[10px]">
                                <Scale size={18} /> Qualified Business Intake
                            </div>
                        )}

                        {step < 5 ? (
                            <button 
                                type="button" 
                                onClick={handleNext}
                                className="bg-brand-900 text-white font-black px-12 py-5 rounded-2xl flex items-center gap-4 hover:bg-gold-500 hover:text-brand-900 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] group text-sm uppercase tracking-widest"
                            >
                                Continue Path <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                disabled={isSubmitting || !watch('preferredNextStep')}
                                className="bg-brand-900 text-white font-black px-12 py-5 rounded-2xl flex items-center gap-4 hover:bg-gold-500 hover:text-brand-900 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.15)] enabled:animate-pulse disabled:opacity-50 text-sm uppercase tracking-widest"
                            >
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Assessment"}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Credibility Footer */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                <div className="flex items-center gap-3 font-bold text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                    <ShieldCheck className="w-5 h-5 text-gold-600" /> Secure Data Protocol
                </div>
                <div className="flex items-center gap-3 font-bold text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                    <TrendingUp className="w-5 h-5 text-gold-600" /> Strategic Alignment
                </div>
                <div className="flex items-center gap-3 font-bold text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                    <Scale className="w-5 h-5 text-gold-600" /> Regulatory Compliance
                </div>
            </div>
        </div>
    );
};
