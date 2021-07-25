import { Message, User } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandContext, CommandListener } from '../utils'

module.exports = class ChatCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'chat',
      category: 'misc',
      description: 'Abre ou fecha um canal de texto para os usuários',
      permissions: [{
        entity: 'both',
        permissions: ['MANAGE_CHANNELS']
      }]
    })
  }

  async run(message: Message, args: string[], ctx: CommandContext) {
    const role = message.guild.roles.cache.get(message.guild.id)
    const channel = message.guild.channels.cache.get(message.channel.id)
    switch (args[0]) {
      case 'on': {
        channel.edit({
          permissionOverwrites: [{
            id: role,
            allow: ['SEND_MESSAGES']
          }]
        }, `Canal destrancado por ${message.author.tag}`).then(() => {
          ctx.quote('check_mark', 'este canal foi destrancado com sucesso.')
        })
      }
        break;
      case 'off': {
        channel.edit({
          permissionOverwrites: [{
            id: role,
            deny: ['SEND_MESSAGES']
          }]
        }, `Canal trancado por ${message.author.tag}`).then(() => {
          ctx.quote('check_mark', 'este canal foi trancado com sucesso.')
        })
      }
        break;
      default: {
        ctx.quote('error', 'você precisa inserir `on` para liberar o canal ou `off` para trancar o canal.')
      }
    }
  }
}