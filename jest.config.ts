import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  transformIgnorePatterns: ["./node_modules/"],
  testEnvironment: "node",
  roots: ["./src"],
  testMatch: ["**/__tests__/**/*", "**/?(*.)+(spec|test).ts"],
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
