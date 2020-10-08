import { Message } from "eris";
import IllyaClient from "../../Client";
import { CommandContext } from "../../utils"

export default class PlayCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: "play"
        })
    }

    async run(context: Message, args: string[]) {
        const player = await this.client.joinVoiceChannel(context.member.voiceState.channelID)
        player.play("https://cast.animu.com.br:8021/stream", { inlineVolume: true })

        context.channel.createMessage("Vamos tocar a rádio animu!")
    }
}