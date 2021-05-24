import { ActivitiesOptions } from 'discord.js'
import { IllyaClient } from '../Client'
import { EventListener } from '../utils'

module.exports = class ReadyListener extends EventListener {
  public constructor(client: IllyaClient) {
    super(client, 'ready')
  }

  run() {
    const activities: ActivitiesOptions[] = [
      { name: `Use ${process.env.PREFIX}comandos para saber quais são os meus comandos` },
      { name: `Eu conheço ${this.client.users.cache.size} usuários em ${this.client.guilds.cache.size} servidores diferentes` },
      { name: `Se precisa de ajuda, use ${process.env.PREFIX}ajuda` },
      { name: `Conhecimento para ${this.client.users.cache.size} usuários!` },
      { name: `Use ${process.env.PREFIX}convite para poder me adicionar em seu servidor.` },
      { name: `Conectada a ${this.client.channels.cache.size} canais em ${this.client.guilds.cache.size} servidores` },
      { name: 'Visite o meu website: https://chinokafuu.glitch.me/' },
      { name: `Posso contar com o seu voto? Se sim, use ${process.env.PREFIX}votar e me ajude a crescer cada vez mais!` }
    ]

    setInterval(() => this.client.user.setPresence({ activities }), 15000)

    console.log('-------------------------------------------------------')
    console.log(`Conectada em: ${this.client.user.username}`)
    console.log(`Olá, mundo.\nUsuários: ${this.client.users.cache.size}.\nServidores: ${this.client.guilds.cache.size}.`)
    console.log('-------------------------------------------------------')
  }
}