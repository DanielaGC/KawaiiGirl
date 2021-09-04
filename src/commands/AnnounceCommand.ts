import {
  ColorResolvable,
  Message,
  MessageEmbed,
  MessageReaction,
  ReactionEmoji,
  TextChannel,
  User,
} from "discord.js";
import { IllyaClient } from "../Client";
import {
  CommandListener,
  ColorUtils,
  CommandContext,
  EmojiManager,
} from "../utils";

export default class AnnounceCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: "announce",
      aliases: ["anunciar"],
      category: "misc",
      description: "Mostra o seu avatar ou o avatar de alguém.",
      permissions: [
        {
          entity: "user",
          permissions: ["MANAGE_GUILD", "MANAGE_ROLES"],
        },
      ],
    });
  }

  async run(message: Message, args: Array<string>, ctx: CommandContext) {
    const channel = message.guild.channels.cache.get(
      `${BigInt(args[0]?.replace(/[<#>]/g, ""))}`
    ) as TextChannel;
    if (!channel)
      return ctx.quote(
        "error",
        "você precisa mencionar o canal de texto que deseja enviar este anúncio"
      );
    const msg = args.slice(1).join(" ");
    if (!msg)
      return ctx.quote(
        "error",
        "você não colocou o que deseja falar no seu anúncio"
      );
    if (msg.length > 2048)
      return ctx.quote(
        "error",
        "desculpe, mas o limite máximo de caracteres é de `2048` caracteres."
      );
    const embed = new MessageEmbed();
    embed.setColor(ColorUtils["pink"] as ColorResolvable);
    embed.setFooter(
      `Anúncio enviado por: ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true })
    );
    embed.setTimestamp();
    embed.setDescription(msg);

    const m = await ctx.quote(
      "warn",
      "você está preste a enviar um anúncio para o canal de texto selecionado, deseja mencionar os membros online?"
    );
    await m.react(EmojiManager.get("check_mark").reaction);
    await m.react(EmojiManager.get("error").reaction);
    const filter = (reaction: MessageReaction, user: User) =>
      user.id !== this.client.user.id &&
      user.id === message.author.id &&
      [
        EmojiManager.get("check_mark").name,
        EmojiManager.get("error").name,
      ].includes(reaction.emoji.name);
    const collector = m.createReactionCollector({ filter });
    collector.on("collect", (r: MessageReaction) => {
      switch (r.emoji.name) {
        case EmojiManager.get("check_mark").name:
          {
            m.delete();
            channel
              .send({
                content: "@here",
                embeds: [embed],
                allowedMentions: { parse: ["everyone"] },
              })
              .then(() => {
                ctx.quote(
                  "check_mark",
                  `o anúncio foi enviado com sucesso para o ${channel}`
                );
              });
          }
          break;
        case EmojiManager.get("error").name: {
          m.delete();
          channel.send({ embeds: [embed] }).then(() => {
            ctx.quote(
              "check_mark",
              `o anúncio foi enviado com sucesso para o ${channel}`
            );
          });
        }
      }
    });
  }
}
