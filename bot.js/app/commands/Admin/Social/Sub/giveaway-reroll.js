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

  name: "giveaway-reroll",
  description: "reroll a giveaway and determine the new winner(s).",
  options: [
    {
      name: "giveawayid",
      description: "ID of the giveaway to reroll.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [], // Set required permissions if needed
  botPermissions: [], // Set required bot permissions if needed
};
