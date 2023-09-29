const {
  Client,
  Interaction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Command logic goes here
    const text = interaction.options.getString("text");
    if (!text) {
      return interaction.reply("Please provide some text to say.");
    }

    return interaction.reply(text);
  },

  name: "say",
  description: "Make the bot say something.",

  options: [
    {
      name: "text",
      description: "The text to be said.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
