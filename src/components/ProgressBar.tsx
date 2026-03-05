"use client";

import { AppProgressBar } from 'next-nprogress-bar';

export function ProgressBar() {
    return (
        <AppProgressBar
            height="3px"
            color="#D4AF37"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
}
