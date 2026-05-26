/**
 * OpenTelemetry instrumentation for Next.js.
 *
 * Full tracing is enabled when:
 * - NEXT_RUNTIME=nodejs
 * - OTEL_EXPORTER_OTLP_ENDPOINT is set
 *
 * Falls back to no-op stub in non-nodejs environments.
 */

import { SpanKind, SpanStatusCode, context } from "@opentelemetry/api";

const SERVICE_NAME = process.env.OTEL_SERVICE_NAME ?? "union-national-tax";
const SERVICE_VERSION = process.env.npm_package_version ?? "0.0.0";
const ENVIRONMENT = process.env.NODE_ENV ?? "development";
const OTEL_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://localhost:4318/v1/traces";

let tracerInstance: { startSpan(name: string, opts?: object): unknown; startActiveSpan(name: string, opts: object, fn: (span: unknown) => unknown): unknown } | null = null;
let initialized = false;

async function initTracer() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.OTEL_EXPORTER_OTLP_ENDPOINT) return;

  try {
    const { NodeSDK } = await import("@opentelemetry/sdk-node");
    const { OTLPTraceExporter } = await import("@opentelemetry/exporter-trace-otlp-http");
    const { BatchSpanProcessor } = await import("@opentelemetry/sdk-trace-base");
    const { HttpInstrumentation } = await import("@opentelemetry/instrumentation-http");
    const { resourceFromAttributes } = await import("@opentelemetry/resources");
    const semconv = await import("@opentelemetry/semantic-conventions") as unknown as Record<string, string>;
    const { trace } = await import("@opentelemetry/api");

    const exporter = new OTLPTraceExporter({ url: OTEL_ENDPOINT });
    const spanProcessor = new BatchSpanProcessor(exporter, {
      maxQueueSize: 2048,
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000,
      exportTimeoutMillis: 30000,
    });

    const resource = resourceFromAttributes({
      [semconv.ATTR_SERVICE_NAME ?? "service.name"]: SERVICE_NAME,
      [semconv.ATTR_SERVICE_VERSION ?? "service.version"]: SERVICE_VERSION,
      [semconv.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT ?? "deployment.environment"]: ENVIRONMENT,
    });

    const sdk = new NodeSDK({
      resource,
      spanProcessors: [spanProcessor],
      instrumentations: [new HttpInstrumentation()],
    });

    sdk.start();
    tracerInstance = trace.getTracer(SERVICE_NAME, SERVICE_VERSION);
  } catch (error) {
    console.warn("[otel] Failed to initialize OpenTelemetry:", error);
  }
}

export async function register(): Promise<void> {
  if (initialized) return;
  initialized = true;
  await initTracer();
}

export function getTracer() {
  return tracerInstance;
}

export { SpanKind, SpanStatusCode, context };