import { Intents } from 'discord.js'
require('dotenv').config()

module.exports = {
  options: {
    allowedMentions: {
      parse: ['users'],
      repliedUser: true
    },
    messageCacheLifetime: 1800,
    messageSweepInterval: 1800,
    intents: 14335
  }
}