import { Message, MessageEmbed } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandContext, CommandListener } from '../utils'

module.exports = class CommandsCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'commands',
      aliases:['comandos'],
      category: 'misc',
      description: 'Mostra esta lista de comandos para você.'
    })
  }

  async run(message: Message, args: Array<string>, ctx: CommandContext) {
    const music_filter = this.client.commands.filter((cmd: any) => cmd.config.category === 'music').map((cmd: any) => `**${process.env.PREFIX}${cmd.config.name}** » ${cmd.config.description}`)
    const msg = await ctx.quote('loading', 'Calculando...')
    await msg.edit(`:ping_pong: **|** ${message.author.toString()}, meu ping é \`${Math.round(this.client.ws.ping)}\`ms! A latência da API é \`${msg.createdTimestamp - message.createdTimestamp}\`ms!`)
  }
}