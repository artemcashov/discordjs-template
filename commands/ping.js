const { Interaction, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Modal, TextInputComponent, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const name = "пинг";
const description = "Задержка бота олдж";

module.exports = {
  name: name, // имя команды
  types: ["CHAT", "SLASH"], // типы команды
  description: description, // описание команды
  user_permissions: ["SEND_MESSAGES"], // требуемые права для пользователя
  user_roles: [], // требуемые роли для пользователя
  bot_permissions: ["SEND_MESSAGES"], // требуемые права для бота
  componentsNames: [""] // id кнопок, селект меню и другого,
  slash: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description),

  async execute(client, command) {
    command.reply(`🏓 Задержка ${Date.now() - command.createdTimestamp}ms. API: ${Math.round(client.ws.ping)}ms`);
  },

  componentListener(client, interaction) {
    // do nothing
  }
}
