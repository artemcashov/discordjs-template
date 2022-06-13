const fs = require('fs')

module.exports.init = async (client) => {
  console.log("Хандлер команд запущен.")

  fs.readdirSync("./commands").filter(s => s.endsWith('.js')).forEach(file => {
    const cmd = require(`../commands/${file}`)
    client.commandsArray.push(cmd.slash.toJSON())
    client.commands.set(cmd.name, cmd)
    console.log(`Команда ${cmd.name} загружена.`);
  })

  client.application.commands.set(client.commandsArray);
}
