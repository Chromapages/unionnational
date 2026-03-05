"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SafeAreaContextType {
    top: number;
    bottom: number;
    left: number;
    right: number;
    isKeyboardOpen: boolean;
}

const SafeAreaContext = createContext<SafeAreaContextType>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    isKeyboardOpen: false,
});

export function useSafeArea() {
    return useContext(SafeAreaContext);
}

interface SafeAreaProviderProps {
    children: React.ReactNode;
}

export function SafeAreaProvider({ children }: SafeAreaProviderProps) {
    const [safeArea, setSafeArea] = useState({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    });
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        // Read CSS environment variables
        const updateSafeArea = () => {
            const styles = getComputedStyle(document.documentElement);
            setSafeArea({
                top: parseInt(styles.getPropertyValue("env(safe-area-inset-top)") || "0", 10),
                bottom: parseInt(styles.getPropertyValue("env(safe-area-inset-bottom)") || "0", 10),
                left: parseInt(styles.getPropertyValue("env(safe-area-inset-left)") || "0", 10),
                right: parseInt(styles.getPropertyValue("env(safe-area-inset-right)") || "0", 10),
            });
        };

        // Update on resize/orientation change
        window.addEventListener("resize", updateSafeArea);
        updateSafeArea();

        return () => window.removeEventListener("resize", updateSafeArea);
    }, []);

    // Detect keyboard
    useEffect(() => {
        const handleResize = () => {
            const visualHeight = window.visualViewport?.height || window.innerHeight;
            const windowHeight = window.innerHeight;
            const isKeyboard = visualHeight < windowHeight * 0.75;
            setIsKeyboardOpen(isKeyboard);
        };

        if (typeof window !== "undefined" && "visualViewport" in window) {
            window.visualViewport?.addEventListener("resize", handleResize);
            return () => window.visualViewport?.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <SafeAreaContext.Provider value={{ ...safeArea, isKeyboardOpen }}>
            {children}
        </SafeAreaContext.Provider>
    );
}
