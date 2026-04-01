import { Client, Events } from "@fluxerjs/core";
import type { Message } from "@fluxerjs/core";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: 0 });

/** Invoked when bot has logged in and is ready. */
client.on(Events.Ready, () => {
  console.log("Ready");
});

/** Invoked when message is created in a community. */
client.on(Events.MessageCreate, async (message: Message) => {
  if (message.content === "!ping") await message.reply("Pong!");
});

/** Logs in the client as long as a valid bot token is provided. */
async function logInClient() {
  if (!process.env.BOT_TOKEN) {
    console.log(
      "There was an error fetching the bot token from env. BOT_TOKEN is empty.",
    );
    return;
  }

  await client.login(process.env.BOT_TOKEN);
}

logInClient();
