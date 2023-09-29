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
      const bannedWords = guildSettings?.automod?.bannedWords;
      const content = message.content.toLowerCase();

      // Check if the message contains any banned words
      const hasBannedWord = bannedWords.some((word) =>
        content.includes(word.toLowerCase())
      );

      if (hasBannedWord) {
        // Delete the message containing the banned word
        message.delete();

        // Notify the user that the message was deleted due to a banned word
        message.author.send(
          "Your message was deleted because it contained a banned word."
        );

        // Create a log embed for the event
        const logEmbed = new EmbedBuilder()
          .setColor("#ff0000") // Set the color of the embed to red
          .setTitle("Automod: Message Deleted")
          .setDescription(
            `A message was deleted in ${message.channel.toString()} for containing a banned word.`
          )
          .addFields({ name: "User", value: message.author.toString() })
          .addFields({ name: "Deleted Message", value: message.content });

        // Log the automod event to the log channel
        logEvent(client, guildSettings, logEmbed);
      }
    }
  }
};
