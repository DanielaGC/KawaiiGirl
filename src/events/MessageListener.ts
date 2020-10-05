import { EventContext } from "../utils"
import { prefix, owner } from "../config.json"
import { Message } from "eris"
import IllyaClient from "../Client"
export default class MessageListener extends EventContext {
    public constructor(client: IllyaClient) {
        super(client, "messageCreate")
    }

    run(message: Message) {
        if (message.author.bot) return
        if (message.channel.type !== 0) return

        if (!message.content.startsWith(prefix)) return

        const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd: string = args.shift().toLowerCase()
        const commands = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))

        if (!commands) return
        if (commands.config.dev && !owner.includes(message.author.id)) return
        message.channel.sendTyping()
        commands.run(message, args)
    }
}