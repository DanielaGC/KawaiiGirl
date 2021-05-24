import { IllyaClient } from "../../Client";
import { CommandInterface } from './CommandInterface'

export class CommandListener {
  public client: IllyaClient
  public config: object
  constructor(client: IllyaClient, options: CommandInterface) {
    this.client = client
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      permissions: options.permissions || []
    }
  }
}