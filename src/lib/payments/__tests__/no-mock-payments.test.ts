import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function productionSourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return entry.name === "__tests__" ? [] : productionSourceFiles(fullPath);
    }

    return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : [];
  });
}

describe("payment architecture", () => {
  it("does not authorize mock money in production source", () => {
    const sourceRoot = path.resolve(__dirname, "../../..");
    const forbiddenProvider = ["provider", ': "mock"'].join("");
    const forbiddenFactory = ["create", "MockPayment"].join("");

    const offenders = productionSourceFiles(sourceRoot).filter((file) => {
      const source = fs.readFileSync(file, "utf8");
      return (
        source.includes(forbiddenProvider) || source.includes(forbiddenFactory)
      );
    });

    expect(offenders).toEqual([]);
  });
});
