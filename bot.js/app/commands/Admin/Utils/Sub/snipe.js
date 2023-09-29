const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const msg = client.snipes.get(interaction.channel.id);
    if (!msg)
      return await interaction.reply({
        content: "I can't find any deleted messages!",
        ephemeral: true,
      });

    const ID = msg.author.id;
    const member = interaction.guild.members.cache.get(ID);
    const URL = member.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`SNIPED MESSAGE! (${member.user.tag})`)
      .setDescription(`${msg.content}`)
      .setTimestamp()
      .setFooter({ text: `Member ID: ${ID}`, iconURL: `${URL}` });

    if (msg.image)
      await interaction.reply({
        content: "I can't find any deleted messages!",
        ephemeral: true,
      });
    await interaction.reply({ embeds: [embed] });
  },

  name: "snipe",
  description: "Snipes user's last message",
  options: [
    {
      name: "target-user",
      description: "The user whose message you want to see.",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
