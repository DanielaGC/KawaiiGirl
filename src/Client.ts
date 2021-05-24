import { Client, ClientOptions, Collection } from 'discord.js'
import { readdir } from 'fs'

export class IllyaClient extends Client {
  aliases: any
  commands: any
  constructor(options: ClientOptions) {
    super(options)
    this.aliases = new Collection()
    this.commands = new Collection()
  }
  
  loadCommands() {
    readdir(`${__dirname}/commands`, (err, files) => {
      if (err) return console.error(err.message)
      files.forEach((file: string) => {
        const Command = require(`${__dirname}/commands/${file}`)
        const command = new Command(this)
        this.commands.set(command.config.name, command)
        command.config.aliases.forEach((alias: string) =>this.aliases.set(alias, command.config.name))
      })
    })
  }

  loadEvents() {
    readdir(`${__dirname}/events`, (err, files) => {
      if (err) return console.log(err.message)
      files.forEach((file: string) => {
        const Events = require(`${__dirname}/events/${file}`)
        const events = new Events(this)
        super.on(events.name, (...args) => events.run(...args))
      })
    })
  }

  async startBot(token?: string) {
    this.loadCommands()
    this.loadEvents()
    return await super.login(token)
  }
}