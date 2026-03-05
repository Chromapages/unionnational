"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`ErrorBoundary caught an error in [${this.props.name || "Unknown Component"}]:`, error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-6 rounded-2xl bg-brand-800/50 border border-brand-700 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px]">
                    <div className="w-12 h-12 bg-feedback-error/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-feedback-error" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-white font-semibold">Something went wrong here</h3>
                        <p className="text-brand-300 text-sm max-w-sm">
                            We encountered an issue displaying this section.
                        </p>
                    </div>
                    <button
                        onClick={this.handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-700 hover:bg-brand-600 text-white rounded-lg text-sm transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
