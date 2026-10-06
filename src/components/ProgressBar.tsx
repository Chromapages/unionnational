"use client";

import { AppProgressBar } from 'next-nprogress-bar';
import { useCspNonce } from '@/components/security/CspNonceProvider';

export function ProgressBar() {
    const nonce = useCspNonce();
    return (
        <AppProgressBar
            nonce={nonce}
            height="3px"
            color="#D4AF37"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
}
