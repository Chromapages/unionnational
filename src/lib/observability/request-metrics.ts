interface Metrics {
  increment(counter: string, tags?: Record<string, string>): void;
  histogram(name: string, value: number, tags?: Record<string, string>): void;
}

declare global {
  interface Global {
    metrics?: Metrics;
  }
}

let _metrics: Metrics | undefined;

async function getMetrics(): Promise<Metrics | undefined> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      if (!_metrics) {
        const vm = await import("node:vm");
        _metrics = (vm as unknown as { trackedRequest?: { metrics?: Metrics } }).trackedRequest?.metrics;
      }
    } catch {
    }
  }
  return _metrics;
}

export async function incrementCounter(name: string, tags?: Record<string, string>): Promise<void> {
  try {
    const m = await getMetrics();
    if (m) {
      m.increment(name, tags);
    }
  } catch {
  }
}

export async function recordLatency(
  histogram: string,
  ms: number,
  tags?: Record<string, string>
): Promise<void> {
  try {
    const m = await getMetrics();
    if (m) {
      m.histogram(histogram, ms, tags);
    }
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

    if (result instanceof Promise) {
      return result.finally(async () => {
        await recordLatency(histogramName, Date.now() - start, tags);
      }) as T;
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