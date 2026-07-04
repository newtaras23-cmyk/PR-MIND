import { describe, expect, it } from "vitest";
import { buildMetadata } from "../src/lib/metadata";

describe("extended metadata coverage", () => {
  for (let index = 0; index < 100; index += 1) {
    it(`builds metadata for generated page ${index + 1}`, () => {
      const title = `Page ${index + 1}`;
      const path = `/page-${index + 1}`;
      const metadata = buildMetadata({ title, path });

      expect(metadata.title).toBe(`${title} | PR-MIND`);
      expect(metadata.openGraph?.url).toBe(`https://prmind.example/en${path}`);
      expect(metadata.twitter?.title).toBe(`${title} | PR-MIND`);
      expect(metadata.alternates?.canonical).toBe(`https://prmind.example/en${path}`);
    });
  }
});
