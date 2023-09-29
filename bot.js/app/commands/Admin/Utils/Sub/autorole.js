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
    //this command will give a member a specific role upon joining the server
  },

  name: "autorole",
  description: "Give a person a specific role upon joining",
  options: [
    {
      name: "role",
      description: "which role you want to give upon joining",
      type: ApplicationCommandOptionType.Role,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
