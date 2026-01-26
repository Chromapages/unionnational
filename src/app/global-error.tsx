"use client";

import { useEffect } from "react";


export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html>
            <body className="flex flex-col items-center justify-center min-h-screen bg-brand-900 text-white p-4 font-sans">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="h-20 w-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg
                            className="w-10 h-10 text-gold-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white tracking-tight">Something went wrong</h1>
                    <p className="text-brand-200 text-lg leading-relaxed">
                        We apologize for the inconvenience. A critical error has occurred in the application.
                    </p>
                    <div className="pt-4">
                        <button
                            onClick={() => reset()}
                            className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-lg transition-all shadow-lg shadow-gold-500/20 active:scale-95"
                        >
                            Try again
                        </button>
                    </div>
                    <p className="text-xs text-brand-400 font-mono mt-8 opacity-50">
                        Error ID: {error.digest || "unknown"}
                    </p>
                </div>
            </body>
        </html>
    );
}
