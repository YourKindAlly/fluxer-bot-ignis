import { Client, Events } from "@fluxerjs/core";

export class IgnisClient {
  private client: Client;
  private token: string | undefined;

  constructor(token?: string) {
    this.client = new Client({ intents: 0 });
    this.token = token || process.env.BOT_TOKEN;
  }

  async login(): Promise<boolean> {
    if (!this.token) {
      throw new Error("No token provided.");
    }

    try {
      await this.client.login(this.token);
      return true;
    } catch (error) {
      console.error("Login failed.");
      return false;
    }
  }

  isReady(): boolean {
    return this.client.isReady();
  }

  async logout(): Promise<void> {
    this.client.destroy();
  }
}
