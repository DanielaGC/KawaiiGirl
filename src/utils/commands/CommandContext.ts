import Discord from "discord.js";
import { IllyaClient } from "../../Client"
const EmojiManager = require('../EmojiManager')
export class CommandContext {
  client: IllyaClient
  message: Discord.Message
  args: string[]
  constructor(client: IllyaClient, message: Discord.Message, args: string[]) {
    this.client = client
    this.message = message
    this.args = args
  }

  quote(emoji: string, content: any) {
    this.message.reply(`${EmojiManager.get(emoji)} **|** ${this.message.author}, ${content}`)
  }
}