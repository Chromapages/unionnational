import { expect, it, vi } from "vitest";

const createClient = vi.hoisted(() => vi.fn(() => ({ fetch: vi.fn() })));
vi.mock("next-sanity", () => ({ createClient }));
vi.mock("@/lib/config/env", () => ({
  publicEnv: { sanityProjectId: "public-fixture", sanityDataset: "public", sanityApiVersion: "2026-01-09" },
}));
import * as publicClient from "./client";

it("creates only a credential-free public read client", () => {
  expect(createClient).toHaveBeenCalledExactlyOnceWith({
    projectId: "public-fixture", dataset: "public", apiVersion: "2026-01-09", useCdn: true,
  });
  expect(publicClient).not.toHaveProperty("writeClient");
});
