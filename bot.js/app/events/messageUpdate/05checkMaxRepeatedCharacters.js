const { EmbedBuilder } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const logEvent = require("../../utils/logEvent");

// Function to check if a string contains excessive repeated characters
function hasExcessiveRepeatedCharacters(str, maxRepeatedCharacters) {
  const regex = new RegExp(`(.)\\1{${maxRepeatedCharacters},}`, "gi");
  return regex.test(str);
}

module.exports = async (client, message) => {
  // Check if the event occurred in a guild (not a DM)
  if (message.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });

    // Check if automod is enabled for the guild
    if (guildSettings?.automod?.enabled) {
      const { maxRepeatedCharacters } = guildSettings.automod;

      const content = message.content;

      // Check if the message contains excessive repeated characters
      if (hasExcessiveRepeatedCharacters(content, maxRepeatedCharacters)) {
        // Delete the message containing excessive repeated characters
        message.delete();

        // Notify the user that the message was deleted
        message.author.send(
          "Your message was deleted because it contained excessive repeated characters."
        );

        // Create an embed to log the automod action
        const embed = new EmbedBuilder()
          .setColor("#ff0000") // Set the color of the embed to red
          .setTitle("Automod - Excessive Repeated Characters") // Set the title of the embed
          .setDescription(
            `Message deleted in ${message.channel.toString()} for containing excessive repeated characters:\n\n${
              message.content
            }`
          )
          .addFields({
            name: "User",
            value: message.author.toString(),
            inline: true,
          })
          .addFields({
            name: "Channel",
            value: message.channel.toString(),
            inline: true,
          });

        // Log the automod action to the log channel
        logEvent(client, guildSettings, embed);
      }

      // Check other automod features (banned words, caps, emojis, mentions) here...
    }
  }
};
