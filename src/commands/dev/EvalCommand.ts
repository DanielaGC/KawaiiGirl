import IllyaClient from '../../Client';
import { Colors, CommandContext, EmbedBuilder } from '../../utils';
import util from 'util'
import { Message, TextChannel } from 'eris';

export default class EvalCommand extends CommandContext {
    public constructor(client: IllyaClient) {
        super(client, {
            name: 'eval',
            dev: true
        })
    }

    async run(message: Message, args: string[]) {
        try {
            let evaluated = await eval(args.join(' '))
            evaluated = util.inspect(evaluated, { depth: 1 })
            evaluated = evaluated.replace(new RegExp(`${this.client.token}`, 'g'), undefined)

            if (evaluated.length > 1800) evaluated = `${evaluated.slice(0, 1800)}...`
            evaluated = `\`\`\`js\n${evaluated}\`\`\``

            message.channel.createMessage(evaluated)
        } catch (err) {
            const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 2040)}...` : err.stack
            const embed = new EmbedBuilder()
            embed.setColor(Colors.default)
            embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``)

            message.channel.createMessage({ embed: embed })
        }
    }
}