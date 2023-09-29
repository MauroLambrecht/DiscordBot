const { EmbedBuilder } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const logEvent = require("../../utils/logEvent");

// Function to calculate the percentage of capital letters in a string
function calculateCapsPercentage(text) {
  const totalChars = text.length;
  const capsChars = (text.match(/[A-Z]/g) || []).length;
  return (capsChars / totalChars) * 100;
}

module.exports = async (client, message) => {
  // Check if the event occurred in a guild (not a DM)
  if (message.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });

    // Check if automod is enabled for the guild
    if (guildSettings?.automod?.enabled) {
      const maxCapsPercentage = guildSettings?.automod?.maxCapsPercentage;
      const content = message.content;

      // Check if the message content length is greater than 10 characters
      if (content.length > 10) {
        // Calculate the percentage of capital letters in the message content
        const capsPercentage = calculateCapsPercentage(content);

        // Check if the message exceeds the maximum allowed percentage of capital letters
        if (capsPercentage > maxCapsPercentage) {
          // Delete the message with excessive capital letters
          message.delete();

          // Notify the user that the message was deleted due to excessive capital letters
          message.author.send(
            "Your message was deleted because it contained excessive capital letters."
          );

          // Create a log embed for the event
          const logEmbed = new EmbedBuilder()
            .setColor("#ff0000") // Set the color of the embed to red
            .setTitle("Automod: Message Deleted (Excessive Caps)")
            .setDescription(
              `A message was deleted in ${message.channel.toString()} for containing excessive capital letters.`
            )
            .addFields({ name: "User", value: message.author.toString() })
            .addFields({ name: "Deleted Message", value: message.content });

          // Log the automod event to the log channel
          logEvent(client, guildSettings, logEmbed);
        }
      }
    }
  }
};
