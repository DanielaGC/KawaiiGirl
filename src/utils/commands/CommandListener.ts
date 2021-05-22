import { IllyaClient } from "../../Client";
import { CommandInterface } from './CommandInterface'

export class CommandListener {
  public client: IllyaClient
  public name: string
  public aliases: string[]
  public permissions: object[]
  constructor(client: IllyaClient, options: CommandInterface) {
    this.client = client
    this.name = options.name
    this.aliases = options.aliases || []
    this.permissions = options.permissions || []
  }

  run(ctx: object) { }
}