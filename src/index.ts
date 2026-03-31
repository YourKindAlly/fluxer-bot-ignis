import { Client, Events } from '@fluxerjs/core';
import type {Message} from '@fluxerjs/core';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: 0 });

client.on(Events.Ready, () => {
    console.log("Ready");
});

client.on(Events.MessageCreate, async (message: Message) => {
    if (message.content === '!ping') await message.reply('Pong!');
});

async function loginClient() {
    if (!process.env.BOT_TOKEN) {
        console.log('There was an error fetching the bot token from env. BOT_TOKEN is empty.');
        return;
    }

    await client.login(process.env.BOT_TOKEN);
}

loginClient();