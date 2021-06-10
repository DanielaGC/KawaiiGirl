import Discord from "discord.js";
import { IllyaClient } from "../../Client"
const EmojiManager = require('../EmojiManager')
export class CommandContext {
  client: IllyaClient
  message: Discord.Message
  constructor(client: IllyaClient, message: Discord.Message) {
    this.client = client
    this.message = message
  }

  async quote(emoji: string, content: any) {
    return this.message.reply(`${EmojiManager.get(emoji).mention} **|** ${this.message.author}, ${content}`)
  }
}