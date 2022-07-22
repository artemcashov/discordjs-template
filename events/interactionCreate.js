const Perms = require('../jsons/permissions.json');

module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      const cmd = client.commands.get(interaction.commandName)
      if (!cmd) return;

      if (cmd.types.includes("SLASH")) {
        if (cmd.user_permissions) {
          let invalidPerms = []
          for (const perm of cmd.user_permissions) {
            if (!interaction.member.permissions.has(perm)) invalidPerms.push(Perms[perm]);
          }
          if (invalidPerms.length) {
            return await interaction.reply({ content: `У вас не достаточно прав: \`${invalidPerms}\``, ephemeral: true });
          }
        }
  
        if (cmd.user_roles && !cmd.user_roles[0] == "") {
          if (!interaction.member.roles.cache.some(role => cmd.user_roles.includes(role.id))) {
            return await interaction.reply({ content: "У вас нет требуемой роли", ephemeral: true });
          }
        }
  
        if (cmd.bot_permissions) {
          let invalidPerms = []
          for (const perm of cmd.bot_permissions) {
            if (!interaction.guild.me.permissions.has(perm)) invalidPerms.push(Perms[perm]);
          }
          if (invalidPerms.length) {
            return await interaction.reply({ content: `У меня не достаточно прав: \`${invalidPerms}\``, ephemeral: true });
          }
        }
      }

      cmd.execute(client, interaction)
    } else {
      let found = false;
      client.commands.forEach((cmd) => {
          if(cmd.componentsNames) {
              cmd.componentsNames.forEach(c => {
                  if(interaction.customId.startsWith(c)) {
                      cmd.componentListener(client, interaction)
                  }
              });
          }
      });
    }
  }
}
