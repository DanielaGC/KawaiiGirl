import { IllyaClient } from "../../Client";
import { CommandInterface } from './CommandInterface'

export class CommandListener {
  client: IllyaClient
  config: object
  constructor(client: IllyaClient, options: CommandInterface) {
    this.client = client
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      description: options.description,
      category: options.category,
      permissions: options.permissions || []
    }
  }
}