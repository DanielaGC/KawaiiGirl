import { Client, ClientOptions, Collection } from 'discord.js'
import { readdir } from 'fs'

export class IllyaClient extends Client {
  public aliases: any
  public commands: any
  constructor(options: ClientOptions) {
    super(options)
    this.aliases = new Collection()
    this.commands = new Collection()
  }

  public loadEvents() {
    readdir(`${__dirname}/events`, (err, files) => {
      if (err) return console.log(err.message)
      files.forEach((file) => {
        const Events = require(`${__dirname}/events/${file}`)
        const events = new Events[file.split('.')[0]](this)
        super.on(events.name, (...args) => events.run(...args))
      })
    })
  }
}