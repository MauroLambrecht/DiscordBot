const {
  Client,
  Interaction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  callback: async (client, interaction) => {
    // Your command logic goes here
    const newUsername = interaction.options.getString("username");

    // Your logic to set the bot's username here
    // (Do not execute code here, only define the logic)
  },

  name: "setbotusername",
  description: "Set a new username for the bot.",

  options: [
    {
      name: "username",
      description: "The new username for the bot.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.Administrator], // Set required permissions if needed
  botPermissions: [], // Set required bot permissions if needed
};
