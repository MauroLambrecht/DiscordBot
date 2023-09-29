const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {},

  name: "giveaway-create",
  description: "Create a giveaway with a specified duration and prize.",
  options: [
    {
      name: "duration",
      description: "Duration of the giveaway in seconds.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: "prize",
      description: "Prize for the giveaway.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [],
};
