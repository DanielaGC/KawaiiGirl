import IllyaClient from "../../Client";
import { Colors, CommandContext, EmbedBuilder } from "../../utils";

export default class EvalCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: "eval",
            dev: true
        })
    }

    async run(message: any, args: string[]) {
        try {
            const util = require("util")
            let evalued = await eval(args.join(" "))
            evalued = util.inspect(evalued, { depth: 1 })
            evalued = evalued.replace(new RegExp(`${this.client.tokne}`, "g"), undefined)

            if (evalued.length > 1800) evalued = `${evalued.slice(0, 1800)}...`
            evalued = `\`\`\`js\n${evalued}\`\`\``

            message.channel.createMessage(evalued)
        } catch (err) {
            const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 2040)}...` : err.stack
            const embed = new EmbedBuilder()
            embed.setColor(Colors.default)
            embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)

            message.channel.createMessage({ embed: embed })
        }
    }
}