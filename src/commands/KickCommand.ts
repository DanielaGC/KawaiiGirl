import { ColorResolvable, Message, MessageEmbed, TextChannel } from "discord.js";
import { IllyaClient } from "../Client";
import { CommandListener, CommandContext, ColorUtils } from "../utils";

export default class KickCommand extends CommandListener {
  constructor(client: IllyaClient) {
    super(client, {
      name: "kick",
      aliases: ["expulsar"],
      category: "mod",
      description: "Expulsa algum membro infrator do servidor.",
      permissions: [
        {
          entity: "user",
          permissions: ["KICK_MEMBERS"],
        },
        {
          entity: "bot",
          permissions: ["KICK_MEMBERS", "EMBED_LINKS"],
        },
      ],
    });
  }

  async run(message: Message, args: Array<string>, ctx: CommandContext) {
    const member = await ctx.getUser(args[0]);
    if (!member)
      return ctx.quote(
        "error",
        "você precisa especificar um usuário para eu poder expulsar."
      );
    try {
      const guild_member = await message.guild.members.fetch(member.id);
      if (
        message.member.roles.highest.position <=
        guild_member.roles.highest.position
      )
        return ctx.quote(
          "error",
          "desculpe, você não pode expulsar alguém com um cargo igual ou maior que o seu."
        );
      if (!guild_member.kickable)
        return ctx.quote(
          "error",
          "desculpe, eu não posso expulsar este usuário, o cargo dele é maior que o meu."
        );
    } catch {
      return ctx.quote(
        "error",
        "este usuário não está servidor, por isso, eu não posso o expulsar."
      );
    }
    if (member.id === message.author.id)
      return ctx.quote(
        "error",
        "me desculpe, mas você não pode se auto expulsar."
      );
    const reason: string = `Punido por: ${message.author.tag} - Motivo: ${
      args[1] ? args.slice(1).join(" ") : "Sem motivos aparente."
    }`;
    if (reason.length > 512)
      return ctx.quote(
        "error",
        "você colocou um motivo muito grande, por favor, poderia reduzir o mesmo?"
      );
    message.guild.members.kick(member.id, reason).then(() => {
      const modChannel = message.guild.channels.cache.find(
        ({ name }) => name === "mod-log"
      ) as TextChannel;
      if (modChannel) {
        const embed = new MessageEmbed();
        embed.setAuthor(
          "Usuário expulso",
          member.displayAvatarURL({ dynamic: true })
        );
        embed.setColor(ColorUtils["red"] as ColorResolvable);
        embed.setThumbnail(member.displayAvatarURL({ dynamic: true }));
        embed.setFooter(`ID do usuário: ${message.author.id}`);
        embed.addField("Usuário expulso", member.tag, true);
        embed.addField("Quem expulsou", message.author.tag, true);
        embed.addField("Motivo", reason, true);

        modChannel.send({ embeds: [embed] });
      }
      ctx.quote("tada", `o usuário **${member.tag}** foi expulso com sucesso.`);
    });
  }
}
