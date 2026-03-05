export function getClientIdentifier(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp;
    return "anonymous";
}

interface RateLimitResult {
    success: boolean;
    resetTime: number;
}

const cache = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, limit = 10, windowMs = 60000): RateLimitResult {
    const now = Date.now();
    const record = cache.get(identifier);

    if (!record || now > record.resetTime) {
        const resetTime = now + windowMs;
        cache.set(identifier, { count: 1, resetTime });
        return { success: true, resetTime };
    }

    record.count++;
    if (record.count > limit) {
        return { success: false, resetTime: record.resetTime };
    }

    return { success: true, resetTime: record.resetTime };
}
