'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Suppress React 19's 'disableTransition' unrecognized prop warning
// This must run immediately on the client before React renders the Studio tree
if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args: any[]) => {
        if (args.some(arg => typeof arg === 'string' && arg.includes('disableTransition'))) return;
        originalError.apply(console, args);
    };
}

export default function Studio() {
    return <NextStudio config={config} />
}
