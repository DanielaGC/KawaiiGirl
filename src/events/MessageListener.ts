import { Message } from 'discord.js'
import { IllyaClient } from '../Client'
import { EventListener } from '../utils'

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
    const command = this.client.commands.get(commandName) || this.client.commands.get(this.client.commands.aliases.get(commandName))
    if (!command) return

    command.run(message, args)
  }
}