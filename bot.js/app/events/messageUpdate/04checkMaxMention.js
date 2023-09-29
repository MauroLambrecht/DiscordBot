const { EmbedBuilder } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const logEvent = require("../../utils/logEvent");

module.exports = async (client, message) => {
  // Check if the event occurred in a guild (not a DM)
  if (message.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });

    // Check if automod is enabled for the guild
    if (guildSettings?.automod?.enabled) {
      const automodSettings = guildSettings.automod;
      // Max Mentions Per Message Check
      const maxMentionsPerMessage = automodSettings.maxMentionsPerMessage;
      const mentionCount =
        message.mentions.users.size + message.mentions.roles.size;

      if (mentionCount > maxMentionsPerMessage) {
        // Delete the message containing too many mentions
        message.delete();

        // Notify the user that the message was deleted due to too many mentions
        message.author.send(
          "Your message was deleted because it contained too many mentions."
        );

        // Create the log message for the automod event
        const logEmbed = new EmbedBuilder()
          .setColor("#ff0000") // Set the color of the embed to red (indicating automod action)
          .setTitle("Automod: Max Mentions Per Message Exceeded")
          .setDescription(
            `A message was deleted in ${message.channel.toString()} for containing too many mentions: ${
              message.content
            }`
          );

        // Add more details about the deleted message
        logEmbed.addFields(
          { name: "User", value: message.author.toString(), inline: true },
          { name: "Channel", value: message.channel.toString(), inline: true },
          { name: "Deleted Message", value: message.content }
        );

        // Log the automod event to the log channel
        logEvent(client, guildSettings, logEmbed);
      }
    }
  }
};
