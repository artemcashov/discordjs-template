module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`${client.user.tag} Ready!`);
        require('../handlers/commands.js').init(client)
    }
}
