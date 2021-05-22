import { IllyaClient } from './Client'
const config = require('./config')
const client = new IllyaClient(config.options)
client.startBot(process.env.TOKEN)