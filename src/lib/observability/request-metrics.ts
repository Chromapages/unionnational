import { logger } from "./logger";

const METRIC_PATTERN = /^(?:ghl_intake|shop_checkout|shop_webhook|api)_[a-z0-9_]{1,64}$/;
const TAG_VALUES: Record<string, ReadonlySet<string>> = {
  source: new Set(["ghl-intake", "shop-checkout", "shop-webhook"]),
  error: new Set(["true", "false"]),
  provider: new Set(["ghl", "stripe", "sanity"]),
  method: new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]),
};

function safeTags(tags: Record<string, string> = {}): Record<string, string> {
  return Object.fromEntries(Object.entries(tags).filter(([key, value]) =>
    (Object.hasOwn(TAG_VALUES, key) && TAG_VALUES[key].has(value)) || (key === "status" && /^[1-5]\d\d$/.test(value))
  ));
}

function writeMetric(metric: string, kind: "counter" | "histogram", value: number, tags?: Record<string, string>): void {
  if (!METRIC_PATTERN.test(metric) || !Number.isFinite(value) || value < 0) return;
  // JSON stdout is the operational sink. The log collector can aggregate these
  // events; there is no implicit provider or public metrics endpoint.
  logger.info("request_metric", { event: "request_metric", metric, kind, value, tags: safeTags(tags) });
}

export async function incrementCounter(name: string, tags?: Record<string, string>): Promise<void> {
  try {
    writeMetric(name, "counter", 1, tags);
  } catch {
  }
}

export async function recordLatency(
  histogram: string,
  ms: number,
  tags?: Record<string, string>
): Promise<void> {
  try {
    writeMetric(histogram, "histogram", ms, tags);
  } catch {
  }
}

export function withLatency<T>(
  histogramName: string,
  fn: () => T | Promise<T>,
  tags?: Record<string, string>
): T | Promise<T> {
  const start = Date.now();

  try {
    const result = fn();

    if (result && typeof (result as Promise<T>).then === "function") {
      return Promise.resolve(result).finally(async () => {
        await recordLatency(histogramName, Date.now() - start, tags);
      });
    }

    recordLatency(histogramName, Date.now() - start, tags);
    return result;
  } catch (err) {
    recordLatency(histogramName, Date.now() - start, {
      ...tags,
      error: "true",
    });
    throw err;
  }
}

export async function withLatencyAsync<T>(
  histogramName: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const start = Date.now();

  try {
    const result = await fn();
    await recordLatency(histogramName, Date.now() - start, tags);
    return result;
  } catch (err) {
    await recordLatency(histogramName, Date.now() - start, {
      ...tags,
      error: "true",
    });
    throw err;
  }
}
