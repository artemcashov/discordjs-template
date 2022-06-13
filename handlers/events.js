const fs = require('fs');

module.exports.init = async (client) => {
  fs.readdirSync("./events").filter(s => s.endsWith('.js')).forEach(file => {
    const event = require(`../events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  });
}
