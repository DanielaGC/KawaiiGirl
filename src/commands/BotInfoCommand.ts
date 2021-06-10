import { Message, MessageEmbed, User } from 'discord.js'
import { IllyaClient } from '../Client'
import { CommandListener, ColorUtils } from '../utils'
const moment = require('moment')
require('moment-duration-format')
module.exports = class BotInfoCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: 'botinfo',
      category: 'misc'
    })
  }

  async run(message: Message, args: string[]) {

    moment.locale('pt-BR');
    const duration = moment.duration(this.client.uptime).format("D [dias], H [horas], m [minutos], s [segundos]");
    var owners: Array<string> = []

    process.env.BOT_DEV.trim().split(',').forEach(async (ids: string) => {
      const owner = await this.client.users.fetch(ids)
      await owners.push(owner.tag)
    })

    const embed = new MessageEmbed()
    embed.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    embed.setFooter(this.client.user.username, this.client.user.avatarURL({ dynamic: true }))
    embed.setTimestamp()
    embed.setColor(ColorUtils['pink'])
    embed.setThumbnail(this.client.user.avatarURL({ dynamic: true }))
    embed.addField(`Oi eu sou a KawaiiGirl`, `Oi eu sou a KawaiiGirl (ou como meus amigos me chamam, Illya) e sou apenas um simples bot brasileiro para o Discord com o foco principal em Moderação e Música!\n\nAtualmente eu estou espalhando muita diversão e alegria (e um pouco de fofura) em \`\`${this.client.guilds.cache.size}\`\` servidores, tenho \`\`${this.client.commands.size}\`\` comandos, conheço \`\`${this.client.users.cache.size}\`\` usuários, já vi \`\`${this.client.emojis.cache.size}\`\` emojis e estou acordada há ${duration}.`)
    embed.addField('Me adicione', '[clique aqui](https://discordapp.com/oauth2/authorize?client_id=481282441294905344&scope=bot&permissions=1580723278)', true)
    embed.addField('Meu website', '[clique aqui](https://chinokafuu.glitch.me)', true)
    embed.addField('Suporte', '[clique aqui](https://discord.gg/Jr57UrsXeC)', true)
    embed.addField('Menções Honrosas', `\`\`Obrigada ${message.author.tag} por está me usando\nObrigada ${(owners.length < 2) ? `à ${owners.join(', ')}` : `aos ${owners.join(', ')}`} por me ${(owners.length < 2) ? 'criar' : 'criarem'}!\`\``)

    message.reply(embed)
  }
}