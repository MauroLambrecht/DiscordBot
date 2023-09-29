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

      // Check if the message contains any banned words
      const bannedWords = automodSettings.bannedWords;
      const content = message.content.toLowerCase();
      const hasBannedWord = bannedWords.some((word) =>
        content.includes(word.toLowerCase())
      );

      // Max Emojis Per Message Check
      const maxEmojisPerMessage = automodSettings.maxEmojisPerMessage;
      const emojiRegex =
        /(<a?:[a-zA-Z0-9_]+:\d+>|[\u2000-\u3300\u{1F000}-\u{1F9EF}])/gu;
      const emojiCount = (message.content.match(emojiRegex) || []).length;

      if (emojiCount > maxEmojisPerMessage) {
        // Delete the message containing too many emojis
        message.delete();

        // Notify the user that the message was deleted due to too many emojis
        message.author.send(
          "Your message was deleted because it contained too many emojis."
        );

        // Create the log message for the automod event
        const logEmbed = new EmbedBuilder()
          .setColor("#ff0000") // Set the color of the embed to red (indicating automod action)
          .setTitle("Automod: Max Emojis Per Message Exceeded")
          .setDescription(
            `A message was deleted in ${message.channel.toString()} for containing too many emojis: ${
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

      // Perform other automod checks (if any) here...
    }
  }
};
