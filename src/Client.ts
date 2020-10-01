import { Client } from "eris"
import { readdir } from "fs"

export default class IllyaClient extends Client {
    public aliases: any
    public commands: any
    public shardUptime: any
    public constructor(token: string, options: object) {
        super(token, options)

        this.aliases = new Map()
        this.commands = new Map()
        this.shardUptime = new Map()
    }

    public connect() {
        this.shards.forEach((shard: any) => {
            this.shardUptime.set(shard.id, {
                shardID: shard.id,
                uptime: 0
            })
        })
        return super.connect()
    }

    public loadCommands(path: string) {
        readdir(`${__dirname}/${path}`, (err, f) => {
            if (err) return console.error(err)

            for (let category of f) {
                readdir(`${__dirname}/${path}/${category}`, (err, cmd) => {
                    if (err) return console.error(err)

                    for (let command of cmd) {
                        const Commands = require(`${__dirname}/${path}/${category}/${command}`).default
                        const commands = new Commands(this)
                        this.commands.set(commands.config.name, commands)
                        commands.config.aliases.forEach((alias: any) => {
                            return this.aliases.set(alias, commands.config.name)
                        })
                    }
                })
            }
        })
    }

    public loadEvents(path: string) {
        readdir(`${__dirname}/${path}`, (err, f) => {
            if (err) return console.error(err)

            for (let files of f) {
                const Events = require(`${__dirname}/${path}/${files}`).default
                const events = new Events(this)
                super.on(events.name, (...args) => events.run(...args))
            }
        })
    }
}