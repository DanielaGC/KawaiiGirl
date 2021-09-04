import type { Message } from "discord.js";
import type { CommandContext } from "./CommandContext";
import { IllyaClient } from "../../Client";
import { CommandInterface } from "./CommandInterface";

export class CommandListener {
  client: IllyaClient;
  config: CommandInterface;
  constructor(client: IllyaClient, options: CommandInterface) {
    this.client = client;
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      description: options.description,
      category: options.category,
      permissions: options.permissions || [],
      dev: options.dev || false,
    };
  }

  run(message: Message, args: Array<string>, ctx: CommandContext): void {
    throw new Error("Não implementado.");
  }
}
