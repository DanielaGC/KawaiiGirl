import IllyaClient from "../../Client"
import { CommandContext } from "../../utils"
export default class PingCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: "ping"
        })
    }

    run(message: any, args: string[]) {
        message.channel.createMessage(`🏓 Pong! ${message.channel.guild.shard.latency}ms!`)
    }
}