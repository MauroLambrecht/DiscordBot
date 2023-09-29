const {
  Client,
  Interaction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Your code logic here
    const guild = interaction.guild;
    const roles = guild.roles.cache.filter((role) => role.name !== "@everyone");

    const roleList = roles.map((role) => {
      const isAdmin = role.permissions.has(PermissionFlagsBits.Administrator);
      const color = role.hexColor || "#FFFFFF";

      return `**${role.name}** - Admin: ${isAdmin}, Color: ${color}`;
    });

    const embed = new EmbedBuilder()
      .setTitle("Role List")
      .setDescription(roleList.join("\n"));

    interaction.reply({ embeds: [embed], ephemeral: true });
  },

  name: "inrole",
  description: "Get a list of roles in the server",
  options: [],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
