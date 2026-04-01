import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  transform: {},
  testEnvironment: 'node',
  roots: ['./src'],
  testMatch: ['**/test/**/*.ts', '**/?(*.)+(spec|test).ts']
};

export default config;