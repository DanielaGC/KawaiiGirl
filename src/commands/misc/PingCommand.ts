import IllyaClient from "../../Client"
import { Colors, CommandContext, EmbedBuilder } from "../../utils"
const moment = require("moment")
import "moment-duration-format"
import { Message, Shard, TextChannel } from "eris"
export default class PingCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: "ping"
        })
    }

    run(context: Message, args: string[]) {
        
        switch (args[0]) {
            case "shards": {
                const shardList = []
                const embed = new EmbedBuilder()
                embed.setColor(Colors.default)
                embed.setFooter(`Eu estou com ${this.client.shards.size} shards`)
                this.client.shards.forEach((shard: Shard) => {
                    let shardUptime = moment.duration(Date.now() - shard.lastHeartbeatReceived).format("dd:hh:mm:ss", { stopTrim: "d" })
                    const shardStatus = shard.status === "ready" ? "CONNECTED" : shard.status === "disconnected" ? "DISCONNECTED" : shard.status === "connecting" ? "CONNECTING" : "HANDSHAKING"
                    shardList.push(embed.addField(`Shard ID: ${shard.id}`, `Websocket ping: ${shard.latency}\nStatus: ${shardStatus}\nUptime: ${shardUptime}`, true))
                })

                context.channel.createMessage({ embed: embed })
            }
                break;
            default: {
                context.channel.createMessage(`🏓 Pong!\nWebsocket ping: ${this.client.guilds.get(context.guildID).shard.latency}ms!\nShard: ${this.client.guilds.get(context.guildID).shard.id}/${this.client.shards.size}`)
            } //TODO Fix the damn type
        }
    }
}