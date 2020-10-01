import IllyaClient from "../../Client"
import { Colors, CommandContext, EmbedBuilder } from "../../utils"
export default class PingCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: "ping"
        })
    }

    run(message: any, args: string[]) {

        switch (args[0]) {
            case "shards": {
                const shardList = []
                const embed = new EmbedBuilder()
                embed.setColor(Colors.default)
                embed.setFooter(`Eu estou com ${this.client.shards.size} shards`)
                this.client.shards.forEach((shards: any) => {
                    let shardStatus
                    if (shards.status === "ready") shardStatus = "CONNECTED"
                    if (shards.status === "disconnected") shardStatus = "DISCONNECTED"
                    if (shards.status === "connecting") shardStatus = "CONNECTING"
                    if (shards.status === "handshaking") shardStatus = "HANDSHAKING"

                    shardList.push(embed.addField(`Shard ID: ${shards.id}`, `Websocket ping: ${shards.latency}\nStatus: ${shardStatus}`, true))
                })

                message.channel.createMessage({ embed: embed })
            }
                break;
            default: {
                message.channel.createMessage(`🏓 Pong!\nWebsocket ping: ${message.channel.guild.shard.latency}ms!\nShard: ${message.channel.guild.shard.id}/${this.client.shards.size}`)
            }
        }
    }
}