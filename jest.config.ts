import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  transform: { },
  transformIgnorePatterns: ["./node_modules/"],
  testEnvironment: "node",
  roots: ["./src"],
  testMatch: ["**/test/**/*", "**/?(*.)+(spec|test).ts"],
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
