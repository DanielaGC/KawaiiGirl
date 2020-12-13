import IllyaClient from './Client'
import config from '../src/config.json'
const client = new IllyaClient(config.token, config.options)

client.connect()
client.loadCommands('commands')
client.loadEvents('events')