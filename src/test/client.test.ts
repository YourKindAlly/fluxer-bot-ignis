import { jest } from "@jest/globals";

const mockClient = {
  login: jest.fn<(token: string) => Promise<string>>(),
  isReady: jest.fn(),
  destroy: jest.fn(),

  on: jest.fn(),
  _callbacks: new Map(),

  _emit(event: string, ...args: any[]) {
    const callback = this._callbacks.get(event);
    if (callback) callback(...args);
  },
};

const mockEvents = {
  Ready: "ready",
  MessageCreate: "messageCreate",
};

jest.mock("@fluxerjs/core", () => ({
  Client: jest.fn().mockImplementation((options) => mockClient),
  Events: mockEvents,
}));

mockClient.on.mockImplementation((event, callback) => {
  mockClient._callbacks.set(event, callback);
});

import { IgnisClient } from "@/classes/client.js";

describe("IgnisClient", () => {
  let ignisClient: IgnisClient;

  beforeEach(async () => {
    mockClient.login.mockClear();
    mockClient.isReady.mockClear();
    mockClient.destroy.mockClear();

    mockClient.on.mockClear();

    ignisClient = new IgnisClient("test-token", mockClient as any);
    await ignisClient.login();
  });

  describe("login method", () => {
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

  describe("isReady method", () => {
    test("Should return ready status.", () => {
      mockClient.isReady.mockReturnValue(true);

      expect(ignisClient.isReady()).toBe(true);
      expect(mockClient.isReady).toHaveBeenCalled();
    });
  });

  describe("logout method", () => {
    test("Should destroy the client.", async () => {
      await ignisClient.logout();

      expect(mockClient.destroy).toHaveBeenCalled();
    });
  });

  describe("Ready event", () => {
    test("Should invoke on event before login method.", () => {
      const onCallOrder = mockClient.on.mock.invocationCallOrder[0];
      const loginCallOrder = mockClient.login.mock.invocationCallOrder[0];

      expect(onCallOrder).toBeDefined();
      expect(loginCallOrder).toBeDefined();
      expect(onCallOrder as number).toBeLessThan(loginCallOrder as number);
    });

    test("Should be called with the ready event.", () => {
      const onReadySpy = jest.spyOn(IgnisClient.prototype, "onReady");
      new IgnisClient("test-token", mockClient as any);

      mockClient._emit(mockEvents.Ready);

      expect(onReadySpy).toHaveBeenCalled();
    });
  });
});
