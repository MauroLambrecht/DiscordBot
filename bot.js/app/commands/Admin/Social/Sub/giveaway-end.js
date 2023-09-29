const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Get the giveaway ID from the user input
    const giveawayId = interaction.options.getString("giveawayId");
  },

  name: "giveaway-end",
  description: "End a running giveaway and determine the winner(s).",
  options: [
    {
      name: "giveawayid",
      description: "ID of the giveaway to end.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [], // Set required permissions if needed
  botPermissions: [], // Set required bot permissions if needed
};
