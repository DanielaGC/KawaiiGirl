import IllyaClient from "./Client"
const config = require("../config.json")
const client = new IllyaClient(config.token, config.options)

client.connect()
client.loadCommands("commands")
client.loadEvents("events")