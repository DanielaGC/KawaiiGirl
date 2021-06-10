import { Message, MessageEmbed } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandListener, ColorUtils } from '../utils'

module.exports = class AvatarCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'eval',
      category: 'dev',
      description: 'Executa algumas coisas que só os meus desenvolvedores sabem.',
      dev: true
    })
  }

  async run(message: Message, args: string[]) {
    const util = require('util')
    const code = args.join(' ')
    try {
      const ev = eval(code)
      let str = util.inspect(ev, {
        depth: 1
      })

      str = `${str.replace(new RegExp(`${this.client.token}|${process.env.TOKEN}`, 'g'), 'nop?')}`
      if (str.length > 1012) {
        str = str.substr(0, 1012)
        str = `${str}...`
      }
      const embed = new MessageEmbed()
      embed.setColor(ColorUtils['green'])
      embed.addFields([{
        name: ':inbox_tray: **Entrada**',
        value: `\`\`\`${code}\`\`\``
      }, {
        name: ':outbox_tray: **Saida**',
        value: `\`\`\`js\n${str}\`\`\``
      }])

      message.reply(embed)
    } catch (err) {
      message.react('❌')
      const embed = new MessageEmbed()
      embed.setColor(ColorUtils['green'])
      embed.addFields([{
        name: ':inbox_tray: **Entrada**',
        value: `\`\`\`${code}\`\`\``
      }, {
        name: ':outbox_tray: **Saida**',
        value: `\`\`\`${err}\`\`\``
      }])

      message.reply(embed)
    }
  }
}