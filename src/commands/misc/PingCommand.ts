import IllyaClient from "../../Client"
import { Colors, CommandContext, EmbedBuilder } from "../../utils"
import moment from "moment"
import "moment-duration-format"
import { Message, Shard, TextChannel } from "eris"
export default class PingCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: "ping"
        })
    }

    run(context: TextChannel, args: string[]) {

        switch (args[0]) {
            case "shards": {
                const shardList = []
                const embed = new EmbedBuilder()
                embed.setColor(Colors.default)
                embed.setFooter("Eu estou com " +  this.client.shards.size + " shards")
                this.client.shards.forEach((shard: Shard) => {
                    let shardUptime = moment.duration(Date.now() - shard.lastHeartbeatReceived).format()
                    const shardStatus = shard.status === "ready" ? "CONNECTED" : shard.status === "disconnected" ? "DISCONNECTED" : shard.status === "connecting" ? "CONNECTING" : "HANDSHAKING"
                    shardList.push(embed.addField("Shard ID: " + shard.id, "Websocket ping: " + shard.latency + "\n" + "Status: " + shardStatus + "\nUptime: " + shardUptime, true))
                })

                context.createMessage({ embed: embed })
            }
                break;
            default: {
                context.createMessage("🏓 Pong!\nWebsocket ping:" + context.channel.guild.shard.latency + "ms!\nShard: " + context.guild.shard.id + "/" + this.client.shards.size)
            } //TODO Fix the damn type
        }
    }
}