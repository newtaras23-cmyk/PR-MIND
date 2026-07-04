import { describe, expect, it } from "vitest";
import { insights } from "../src/content/insights";
import { approachSteps, servicePillars, stats } from "../src/content/services";

describe("content collections", () => {
  it("exposes at least three insights items", () => {
    expect(insights).toHaveLength(3);
    expect(insights[0].slug).toContain("reputation");
  });

  it("exposes concrete approach steps", () => {
    expect(approachSteps).toHaveLength(3);
    expect(approachSteps[0].title).toBeTruthy();
  });

  it("exposes service pillars and stats", () => {
    expect(servicePillars.length).toBeGreaterThan(0);
    expect(stats.length).toBeGreaterThan(0);
  });
});
