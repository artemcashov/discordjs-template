const { Client } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: `ping`, // имя команды
    types: [`CHAT`, `SLASH`], // типы команды
    description: `Задержка бота`, // описание команды
    user_permissions: [`SEND_MESSAGES`], // требуемые права для пользователя
    user_roles: [``], // требуемые роли для пользователя
    bot_permissions: [`SEND_MESSAGES`], // требуемые права для бота
    
    slash: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Websocket пинг"),

    async execute(client, command) {
        command.reply(`🏓 Задержка ${Date.now() - command.createdTimestamp}ms. API: ${Math.round(client.ws.ping)}ms`);
    }
}