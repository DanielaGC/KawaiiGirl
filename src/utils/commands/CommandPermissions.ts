import { Guild, GuildMember } from "discord.js";
import { IllyaClient } from "../../Client";
interface Permissions {
  entity: string
  permissions: object[]
}
export class CommandPermissions {
  client: IllyaClient
  guild: Guild
  member: GuildMember
  constructor(client: IllyaClient, guild: Guild, member: GuildMember) {
    this.client = client
    this.guild = guild
    this.member = member
  }

  userHas(permissions: object[]) {
    const perms: string[] = []
    permissions.filter((perm: Permissions) => perm.entity === 'user' || perm.entity === 'both').forEach((perm: Permissions) => {
      if (perm.permissions[0]) {
        perm.permissions.forEach((p: any) => {
          if (p === 'BOT_DEVELOPER') {
            if (process.env.BOT_DEV.includes(this.member.user.id)) perms.push(p)
          } else {
            if (!this.member.permissions.has(p)) perms.push(p)
          }
        })
      }
    })

    return perms
  }

  botHas(permissions: object[]) {
    const perms: string[] = []
    permissions.filter((perm: Permissions) => perm.entity === 'bot' || perm.entity === 'both').forEach((perm: Permissions) => {
      if (perm.permissions[0]) {
        perm.permissions.forEach((p: any) => {
          if (!this.guild.me.permissions.has(p)) perms.push(p)
        })
      }
    })

    return perms
  }
}