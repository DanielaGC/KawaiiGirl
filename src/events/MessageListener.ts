import { EventContext, EmbedBuilder } from "../utils"
const { prefix } = require("../../config.json")
export default class MessageListener extends EventContext {
    public constructor(client: any) {
        super(client, "messageCreate")
    }

    run(message: any) {
        if (message.author.bot) return
        if (message.channel.type !== 0) return

        if (!message.content.startsWith(prefix)) return

        const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd: string = args.shift().toLowerCase()
        const commands = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))

        if (!commands) return
        const embed = new EmbedBuilder()
        embed.setDescription("owo test uwu")
        embed.setColor("#ffe7ba")
        embed.addField("owo", "uwu", true)
        embed.addField("owo", "uwu", true)
        embed.addField("owo", "uwu", true)

        message.channel.createMessage({ embed: embed })
        commands.run(message, args)
    }
}