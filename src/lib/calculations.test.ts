import { describe, expect, it } from "vitest";
import { calculateEstimatedValue } from "./calculations";

describe("calculateEstimatedValue", () => {
  it("calculates the value correctly", () => {
    expect(calculateEstimatedValue(5, 20)).toBe(100);
  });

  it("rounds to two decimals", () => {
    expect(calculateEstimatedValue(2.345, 20)).toBe(46.9);
  });

  it("rejects invalid quantity", () => {
    expect(() => calculateEstimatedValue(0, 20)).toThrow();
  });
});
