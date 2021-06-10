import { Message, MessageEmbed } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandListener, ColorUtils } from '../utils'

module.exports = class AvatarCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'avatar',
      category: 'misc',
      description: 'Mostra o seu avatar ou o avatar de alguém.'
    })
  }

  async run(message: Message, args: string[]) {
    const member = this.client.users.cache.get(args[0]?.replace(/[<@!>]/g, '')) || message.author
    const avatar = member.displayAvatarURL({ dynamic: true, size: 2048 })
    const embed = new MessageEmbed()
    embed.setColor(ColorUtils['pink'])
    embed.setImage(avatar)
    embed.addField('Aqui está o avatar', `Avatar de ${member.toString()}. Baixe o avatar clicando [aqui](${avatar})`)
    
    message.reply(embed)
  }
}