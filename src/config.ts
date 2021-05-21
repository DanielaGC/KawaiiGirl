import { Intents } from 'discord.js'
require('dotenv').config()

module.exports = {
  owner: [
    '395788326835322882'
  ],
  options: {
    allowedMentions: {
      parse: ['users'],
      repliedUser: true
    },
    messageCacheLifetime: 1800,
    messageSweepInterval: 1800,
    intents: Intents.ALL
  }
}