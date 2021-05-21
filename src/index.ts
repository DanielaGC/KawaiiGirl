import { IllyaClient } from './Client'
const config = require('./config')
const client = new IllyaClient(config.options)
client.loadEvents()
client.login(process.env.TOKEN)