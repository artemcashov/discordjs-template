const { Client, Collection } = require("discord.js")
require('dotenv').config()
const client = new Client({
    intents: 32767
})

client.commands = new Collection()
client.commandsArray = []

global.Config = require('./jsons/config.json')

require('./handlers/events.js').init(client)

client.login(process.env.TOKEN)

client.on('error',error=>console.log(error))
client.on('warn',warn=>console.log(warn))
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

module.exports = client;