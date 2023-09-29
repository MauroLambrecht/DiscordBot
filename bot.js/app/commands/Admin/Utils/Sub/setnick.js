const {
  Client,
  Interaction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  callback: async (client, interaction) => {
    // Your command logic goes here
    // Get the member and new nickname from the interaction options
    const member = interaction.options.getMember("member");
    const newNickname = interaction.options.getString("nickname");

    // Your logic to set the new nickname here
    // (Do not execute code here, only define the logic)
  },

  name: "setnick",
  description: "Set a new nickname for a member in the server.",

  options: [
    {
      name: "member",
      description: "The member whose nickname will be changed.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "nickname",
      description: "The new nickname for the member.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  permissionsRequired: [PermissionFlagsBits.ManageNicknames],
  botPermissions: [PermissionFlagsBits.ManageNicknames],
};
