import { Message } from 'discord.js'
import { IllyaClient } from '../Client'
import { EventListener, CommandPermissions } from '../utils'

module.exports = class MessageListener extends EventListener {
  public constructor(client: IllyaClient) {
    super(client, 'message')
  }

  run(message: Message) {
    if (message.channel.type === 'dm') return
    if (message.author.bot) return
    if (message.content.replace('!', '') === this.client.user.toString()) {
      return message.channel.send(`Olá ${message.author}, meu nome é \`${this.client.user.username}\` meu prefix é \`${process.env.PREFIX}\` espero que se divirta comigo (Não pense besteira).`)
    }
    if (!message.content.startsWith(process.env.PREFIX)) return
    const args: string[] = message.content.slice(process.env.PREFIX.length).trim().split(' ')
    const commandName: string = args.shift().toLowerCase()
    const command = this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName))
    if (!command) return
    const permissions = new CommandPermissions(this.client, message.guild, message.member)
    const userHas = permissions.userHas(command.config.permissions)
    const botHas = permissions.botHas(command.config.permissions)
    message.channel.startTyping()
    if (userHas.length > 0) return message.channel.send(`${message.author.toString()}, você não tem permissão para ${userHas.map(perms => `\`${perms}\``).join(', ')}, você não pode usar esse comando.`)
    if (botHas.length > 0) return message.channel.send(`${message.author.toString()}, eu não tenho permissão para ${botHas.map(perms => `\`${perms}\``).join(', ')}, eu não posso executar esse comando.`)
    if (message.channel.typing) {
      message.channel.stopTyping(true)
    }
    command.run(message, args)
  }
}