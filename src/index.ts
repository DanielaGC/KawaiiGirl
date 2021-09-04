import { AllowedMentionsTypes } from "discord-api-types";
import { IllyaClient } from "./Client";
import config from "./config";

const client = new IllyaClient(config.options);
client.startBot(process.env.TOKEN)
