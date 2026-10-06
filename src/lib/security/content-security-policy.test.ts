import { describe, expect, it } from 'vitest';
import { getContentSecurityPolicy } from './content-security-policy';

describe('request nonce policy', () => {
    it('requires the nonce for consumer production scripts and styles', () => {
        const policy = getContentSecurityPolicy('synthetic-nonce', false, false);
        const script = policy.split('; ').find((directive) => directive.startsWith('script-src'))!;
        const style = policy.split('; ').find((directive) => directive.startsWith('style-src '))!;
        expect(script).toContain("'nonce-synthetic-nonce'");
        expect(script).not.toMatch(/unsafe-inline|unsafe-eval/);
        expect(style).toContain("'nonce-synthetic-nonce'");
        expect(style).not.toContain('unsafe-inline');
        expect(policy).toContain("object-src 'none'");
        expect(policy).toContain('https://link.agent-crm.com');
    });
    it('isolates Studio and development exceptions', () => {
        expect(getContentSecurityPolicy('synthetic-nonce', false, true)).toContain('unsafe-eval');
        expect(getContentSecurityPolicy(undefined, true, false)).toContain("'unsafe-inline' 'unsafe-eval' https://*.sanity.io");
    });
});
