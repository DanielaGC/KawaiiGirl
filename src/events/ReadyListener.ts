import { ActivitiesOptions } from 'discord.js'
import { IllyaClient } from '../Client'
import { EventListener } from '../utils'

module.exports = class ReadyListener extends EventListener {
  public constructor(client: IllyaClient) {
    super(client, 'ready')
  }

  run() {
    const activities: ActivitiesOptions[] = [
      { name: `Use ${process.env.PREFIX}comandos para saber dos meus comandos` },
      { name: `Eu conheço ${this.client.users.cache.size} pessoas em ${this.client.guilds.cache.size} servidores diferentes` },
      { name: `Se precisa de ajuda, dê ${process.env.PREFIX}ajuda` },
      { name: `Conhecimento para ${this.client.users.cache.size} pessoas!` },
      { name: 'Doe para mim e ganhe a minha versão premium' },
      { name: `Use ${process.env.PREFIX}convite para poder me adicionar em seu servidor.` },
      { name: `Conectada a ${this.client.channels.cache.size} canais em ${this.client.guilds.cache.size} servidores` },
      { name: 'Visite o meu WebSite: https://kawaiigirl-website.glitch.me/' },
      { name: `Posso contar o seu upvote? Se sim use ${process.env.PREFIX}votar e me ajude a compra pão de queijo!` }
    ]

    setInterval(() => this.client.user.setPresence({ activities }), 15000)

    console.log('-------------------------------------------------------')
    console.log(`Conectada em: ${this.client.user.username}`)
    console.log(`Olá, mundo.\nUsuários: ${this.client.users.cache.size}.\nServidores: ${this.client.guilds.cache.size}.`)
    console.log('-------------------------------------------------------')
  }
}