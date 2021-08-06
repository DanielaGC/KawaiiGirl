import { Message, MessageEmbed } from 'discord.js'
import { IllyaClient } from '../Client'
import { EventListener, CommandPermissions, ColorUtils, CommandContext, EmojiManager } from '../utils'

module.exports = class MessageListener extends EventListener {
  public constructor(client: IllyaClient) {
    super(client, 'messageCreate')
  }

  run(message: Message) {
    if (message.channel.type === 'DM') return
    if (message.author.bot) return
    if (message.content.replace('!', '') === this.client.user.toString()) {
      return message.channel.send(`Olá ${message.author}, meu nome é \`${this.client.user.username}\` meu prefix é \`${process.env.PREFIX}\` espero que se divirta comigo (Não pense besteira).`)
    }
    const ctx = new CommandContext(this.client, message)
    if (!message.content.startsWith(process.env.PREFIX)) return
    const args: string[] = message.content.slice(process.env.PREFIX.length).trim().split(' ')
    const commandName: string = args.shift().toLowerCase()
    const command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName))
    if (!command) return
    const permissions = new CommandPermissions(this.client, message.guild, message.member)
    const userHas = permissions.userHas(command.config.permissions)
    const botHas = permissions.botHas(command.config.permissions)
    message.channel.sendTyping()
    if (userHas.length > 0) return ctx.quote('error', `você não tem permissão para ${userHas.map(perms => `\`${perms}\``).join(', ')}, você não pode usar esse comando.`)
    if (botHas.length > 0) return ctx.quote('error', `eu não tenho permissão para ${botHas.map(perms => `\`${perms}\``).join(', ')}, eu não posso executar esse comando.`)    
    if (command.config.dev && !process.env.BOT_DEV.includes(message.author.id)) return ctx.quote('error', 'apenas a minha criadora tem a permissão de executar este comando!')
    try {
      command.run(message, args, ctx)
    } catch (err) {
      const embed = new MessageEmbed()
      embed.setColor(ColorUtils['pink'])
      embed.addField(`${EmojiManager.get('inbox_tray').mention} **Comando**`, `\`\`\`${command.config.name}\`\`\``)
      embed.addField(`${EmojiManager.get('outbox_tray').mention} **Erro**`, `\`\`\`${err}\`\`\``)

      message.reply({embeds: [embed]})
    }
  }
}