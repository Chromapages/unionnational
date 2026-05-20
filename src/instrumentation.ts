export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.OTEL_EXPORTER_OTLP_ENDPOINT) return;
  // Keep OpenTelemetry out of the Next dev/client compilation graph.
  // The Node SDK pulls in built-ins such as fs, net, tls, and stream.
}
