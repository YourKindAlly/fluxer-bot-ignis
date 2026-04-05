import { jest } from "@jest/globals";

const mockClient = {
  login: jest.fn<(token: string) => Promise<string>>(),
  isReady: jest.fn(),
  destroy: jest.fn(),
};

jest.mock("@fluxerjs/core", () => ({
  Client: jest.fn().mockImplementation((options) => mockClient),
}));

import { IgnisClient } from "../classes/client.ts";

describe("IgnisClient", () => {
  let ignisClient: IgnisClient;

  beforeEach(() => {
    mockClient.login.mockClear();
    ignisClient = new IgnisClient("test-token");
    (ignisClient as any).client = mockClient;
  });

  describe("login", () => {
    test("Should successfully login when token is provided.", async () => {
      mockClient.login.mockResolvedValue("fake-token");
      const result = await ignisClient.login();

      expect(mockClient.login).toHaveBeenCalledWith("test-token");
      expect(result).toBe(true);
    });

    test("Should handle login failure gracefully.", async () => {
      const loginError = new Error("Invalid token.");
      mockClient.login.mockRejectedValue(loginError);

      const result = await ignisClient.login();

      expect(result).toBe(false);
      expect(mockClient.login).toHaveBeenCalled();
    });

    test("Should handle network errors.", async () => {
      const networkError = new Error("Network connection failed.");
      mockClient.login.mockRejectedValue(networkError);

      const result = await ignisClient.login();

      expect(result).toBe(false);
    });
  });

  describe("isReady", () => {
    test("Should return ready status.", () => {
      mockClient.isReady.mockReturnValue(true);

      expect(ignisClient.isReady()).toBe(true);
      expect(mockClient.isReady).toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    test("Should destroy the client.", async () => {
      await ignisClient.logout();

      expect(mockClient.destroy).toHaveBeenCalled();
    });
  });
});
