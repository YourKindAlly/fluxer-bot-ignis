import { IgnisClient } from "../classes/client.ts";
import { Client } from "@fluxerjs/core";
import { jest } from "@jest/globals";

jest.mock("@fluxerjs/core", () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      login: jest.fn();
      isReady: jest.fn();
      destroy: jest.fn();
    }),
  };
});

describe("IgnisClient", () => {
  let ignisClient: IgnisClient;
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    jest.clearAllMocks();

    ignisClient = new IgnisClient("test-token");
    mockClient = (ignisClient as any).client;
  });

  describe("login", () => {
    test("Should successfully login with valid token.", async () => {
      mockClient.login.mockResolvedValue("fake-token");

      const result = await ignisClient.login();
      expect(mockClient.login).toHaveBeenCalledWith("test-token");
      expect(result).toBe(true);
    });
  });
});
