import { Message } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandContext, CommandListener } from '../utils'

export default class PingCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'ping',
      category: 'misc',
      description: 'Mostra o meu tempo de resposta e o tempo de resposta da API.'
    })
  }

  async run(message: Message, args: Array<string>, ctx: CommandContext) {
    const msg = await ctx.quote('loading', 'Calculando...')
    await msg.edit(`:ping_pong: **|** ${message.author.toString()}, meu ping é \`${Math.round(this.client.ws.ping)}\`ms! A latência da API é \`${msg.createdTimestamp - message.createdTimestamp}\`ms!`)
  }
}