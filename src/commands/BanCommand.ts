import { Message, MessageEmbed, TextChannel } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandListener, CommandContext, ColorUtils } from '../utils'

module.exports = class BanCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'ban',
      aliases: ['banir'],
      category: 'mod',
      description: 'Bane algum membro infrator do servidor.',
      permissions: [
        {
          entity: 'user',
          permissions: ['BAN_MEMBERS']
        },{
        entity: 'bot',
        permissions: ['BAN_MEMBERS', 'EMBED_LINKS']
      }]
    })
  }

  async run(message: Message, args: Array<string>, ctx: CommandContext) {
    const member = await ctx.getUser(args[0])
    if (!member) return ctx.quote('error', 'você precisa especificar um usuário para eu poder banir.')
    try {
      const guild_member = await message.guild.members.fetch(member.id)
      if (message.member.roles.highest.position <= guild_member.roles.highest.position) return ctx.quote('error', 'desculpe, você não pode banir alguém com um cargo igual ou maior que o seu.')
      if (!guild_member.bannable) return ctx.quote('error', 'desculpe, eu não posso banir este usuário, o cargo dele é maior que o meu.')
    } catch {
      return
    }
    if (member.id === message.author.id) return ctx.quote('error', 'me desculpe, mas você não pode se auto banir.')
    const reason: string = `Punido por: ${message.author.tag} - Motivo: ${args[1] ? args.slice(1).join(' ') : 'Sem motivos aparente.'}`
    if (reason.length > 512) return ctx.quote('error', 'você colocou um motivo muito grande, por favor, poderia reduzir o mesmo?')
    message.guild.members.ban(member.id, { reason }).then(() => {
      const modChannel = message.guild.channels.cache.find(({ name }) => name === 'mod-log') as TextChannel
      if (modChannel) {
        const embed = new MessageEmbed()
        embed.setAuthor('Usuário banido', member.displayAvatarURL({ dynamic: true }))
        embed.setColor(ColorUtils['red'])
        embed.setThumbnail(member.displayAvatarURL({ dynamic: true }))
        embed.setFooter(`ID do usuário: ${message.author.id}`)
        embed.addField('Usuário banido', member.tag, true)
        embed.addField('Quem baniu', message.author.tag, true)
        embed.addField('Motivo', reason, true)

        modChannel.send(embed)
      }
      ctx.quote('tada', `o usuário **${member.tag}** foi banido com sucesso.`)
    })
  }
}