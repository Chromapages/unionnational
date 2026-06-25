"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Lock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type FormData = {
    firstName: string;
    email: string;
    phone: string;
    businessName: string;
    state: string;
};

interface BlueprintMoreInfoFormProps {
    className?: string;
    locale?: "en" | "es";
}

export function BlueprintMoreInfoForm({ className, locale = "en" }: BlueprintMoreInfoFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formSchema = useMemo(() => z.object({
        firstName: z.string().min(1, locale === "es" ? "El nombre es obligatorio" : "First name is required"),
        email: z.string().email(locale === "es" ? "Se requiere un correo electrónico válido" : "Valid email required"),
        phone: z.string().min(10, locale === "es" ? "Se requiere un número de teléfono válido" : "Valid phone number required"),
        businessName: z.string().min(1, locale === "es" ? "El nombre de la empresa es obligatorio" : "Business name is required"),
        state: z.string().min(1, locale === "es" ? "El estado es obligatorio" : "State is required"),
    }), [locale]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        const payload = {
            event_type: "BLUEPRINT_MORE_INFO_REQUEST",
            contact: {
                first_name: data.firstName,
                email: data.email,
                phone: data.phone,
                tags: locale === "es"
                    ? ["LM_Blueprint_MoreInfo", "Interest_Construction", "Lang_ES"]
                    : ["LM_Blueprint_MoreInfo", "Interest_Construction", "Lang_EN"],
            },
            intent: {
                lead_magnet_type: "BLUEPRINT_MORE_INFO",
                primary_service_interest: "CONSTRUCTION_BLUEPRINT",
            },
            business: {
                business_name: data.businessName,
                industry: "CONSTRUCTION",
            },
            meta: {
                version: "1.0",
                submitted_at: new Date().toISOString(),
                locale: locale,
            },
        };

        try {
            const response = await fetch("/api/ghl/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to submit");
            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error("Blueprint more info form submission error:", error);
            setErrorMessage(
                locale === "es"
                    ? "Hubo un error al enviar su solicitud. Por favor, inténtelo de nuevo."
                    : "There was an error submitting your request. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("bg-brand-800 border border-gold-500/20 rounded-2xl p-8 sm:p-10 text-center", className)}
            >
                <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {locale === "es" ? "Mensaje Enviado" : "Message Sent"}
                </h3>
                <p className="text-slate-300">
                    {locale === "es"
                        ? "Nos pondremos en contacto a la brevedad para responder sus preguntas."
                        : "We'll be in touch shortly to answer your questions."}
                </p>
            </motion.div>
        );
    }

    return (
        <div className={cn("bg-brand-800 border border-gold-500/20 rounded-2xl p-8 sm:p-10", className)}>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                    <h3 className="text-xl font-heading font-bold text-white">
                        {locale === "es" ? "¿Tiene Preguntas?" : "Have Questions?"}
                    </h3>
                    <p className="text-sm text-slate-400">
                        {locale === "es"
                            ? "Envíenos un mensaje y le responderemos en un plazo de 24 horas."
                            : "Send us a message and we'll get back to you within 24 hours."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1.5">
                            {locale === "es" ? "Nombre" : "First Name"}
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder="Jane"
                            {...register("firstName")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.firstName && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                            {locale === "es" ? "Correo Electrónico" : "Email Address"}
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder={locale === "es" ? "jane@empresa.com" : "jane@company.com"}
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
                            {locale === "es" ? "Número de Teléfono" : "Phone Number"}
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="(555) 555-5555"
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.phone && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-1.5">
                            {locale === "es" ? "Nombre de la Empresa" : "Business Name"}
                        </label>
                        <input
                            id="businessName"
                            type="text"
                            autoComplete="organization"
                            placeholder={locale === "es" ? "Construcciones Acme" : "Acme Construction"}
                            {...register("businessName")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.businessName && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.businessName.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-1.5">
                        {locale === "es" ? "Estado" : "State"}
                    </label>
                    <input
                        id="state"
                        type="text"
                        autoComplete="address-level1"
                        placeholder="TX"
                        maxLength={2}
                        {...register("state")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm uppercase"
                    />
                    {errors.state && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.state.message}</p>
                    )}
                </div>

                {errorMessage && (
                    <p className="text-sm text-red-400 bg-red-500/10 rounded-xl p-4">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-brand-900 font-bold font-heading rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {locale === "es" ? "Enviando..." : "Sending..."}
                        </>
                    ) : (
                        locale === "es" ? "Enviar Mensaje" : "Send Message"
                    )}
                </button>

                <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    {locale === "es"
                        ? "Respetamos su privacidad. Nunca enviaremos spam."
                        : "We respect your privacy. No spam, ever."}
                </p>
            </form>
        </div>
    );
}
