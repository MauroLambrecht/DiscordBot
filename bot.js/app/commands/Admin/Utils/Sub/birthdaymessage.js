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
    //this command sets a birthdaymessage to the user
  },

  name: "bdaymessage",
  description: "Set a specific birthday message to a user",
  options: [
    {
      name: "message",
      description: "which message you want to give",
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "random",
      description: "ignore message and have a random message everytime",
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
