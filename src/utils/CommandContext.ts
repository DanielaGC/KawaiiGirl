import IllyaClient from '../Client'

export default class CommandContext {
  public client: IllyaClient
  public config: object
  public constructor(client: IllyaClient, options: any) {
    this.client = client
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      category: options.category,
      UserPerms: options.UserPerms || null,
      ClientPerms: options.ClientPerms || null,
      dev: options.dev || false
    }
  }
}