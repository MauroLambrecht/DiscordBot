const { EmbedBuilder } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const validateLink = require("../../utils/linksValidation");
const logEvent = require("../../utils/logEvent");

module.exports = async (client, message) => {
  if (message.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });

    // Check if automod is enabled for the guild
    if (guildSettings?.automod?.enabled) {
      // Check if the message contains a link
      const links = message.content.match(/\bhttps?:\/\/\S+\b/g);
      if (links) {
        for (const link of links) {
          // Validate the link for safety
          const scanResultsUrl = await validateLink(link);

          if (scanResultsUrl && scanResultsUrl === "SAFE") {
            // Create the log message for safe link validation
            const linkValidationEmbed = new EmbedBuilder()
              .setColor("#00ff00") // Set the color of the embed to green (indicating safe link validation)
              .setTitle("Safe Link Validation") // Set the title of the embed
              .setDescription(
                `A safe link was sent in ${message.channel.toString()}.\nLink: ${link}`
              );

            // Log the safe link validation event to the log channel
            logEvent(client, guildSettings, linkValidationEmbed);
          } else {
            // If link validation indicates NSFW or unsafe link, delete the message
            message.delete();
            // Notify the user that the message was deleted due to a potentially unsafe link
            message.author.send(
              "Your message was deleted because it contained a potentially unsafe link (NSFW)."
            );

            // Create the log message for unsafe link validation
            const linkValidationEmbed = new EmbedBuilder()
              .setColor("#ff0000") // Set the color of the embed to red (indicating unsafe link validation)
              .setTitle("Unsafe Link Validation") // Set the title of the embed
              .setDescription(
                `An unsafe link was sent in ${message.channel.toString()}.\nLink: ${link}\nScan results: ${scanResultsUrl}`
              );

            // Log the unsafe link validation event to the log channel
            logEvent(client, guildSettings, linkValidationEmbed);
          }
        }
      }
    }
  }
};
