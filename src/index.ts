import { IgnisClient } from "@/classes/client.js";
import * as dotenv from "dotenv";

dotenv.config();

const ignisClient = new IgnisClient(process.env.BOT_TOKEN);
await ignisClient.login();
