const { MessageEmbed } = require('discord.js')
const Perms = require('../jsons/permissions.json');

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if(!message.author.bot || !message.content.startsWith(Config.prefix)) {
            const prefix = Config.prefix;
            message.args = message.content.slice(message.content.startsWith(prefix) ? prefix.length : Config.prefix).trim().split(/ +/g);
            message.command = message.args.shift();
            const cmd = client.commands.get(message.command)
            if (!cmd) return;

            if(!cmd.types.includes(`CHAT`)) return

            if (cmd.user_permissions) {
                let invalidPerms = []
                for (const perm of cmd.user_permissions) {
                    if (!message.member.permissions.has(perm)) invalidPerms.push(Perms[perm]);
                }
                if (invalidPerms.length) {
                    return await message.reply({ content: `У вас не достаточно прав: \`${invalidPerms}\``, ephemeral: true });
                }
            }

            if (cmd.user_roles && !cmd.user_roles[0] == "") {
                if(!message.member.roles.cache.some(role => cmd.user_roles.includes(role.id))) {
                    return await message.reply({ content: `У вас нет требуемой роли`, ephemeral: true });
                }
            }
            
            if (cmd.bot_permissions) {
                let invalidPerms = []
                for (const perm of cmd.bot_permissions) {
                    if (!message.guild.me.permissions.has(perm)) invalidPerms.push(Perms[perm]);
                }
                if (invalidPerms.length) {
                    return await message.reply({ content: `У меня не достаточно прав: \`${invalidPerms}\``, ephemeral: true });
                }
            }
            
            cmd.execute(client, message)
        }
    }
}