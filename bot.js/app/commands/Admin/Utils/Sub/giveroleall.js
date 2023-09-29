const {
  Client,
  Interaction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    //give a specific role to all peaple
  },

  name: "giveroletoall",
  description: "give a specific role to all peaple",
  options: [
    {
      name: "role",
      description: "what role",
      type: ApplicationCommandOptionType.Role,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
