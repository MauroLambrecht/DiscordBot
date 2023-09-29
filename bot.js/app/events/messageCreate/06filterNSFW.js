const { MessageAttachment, EmbedBuilder } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const logEvent = require("../../utils/logEvent");
const { detectNSFW } = require("../../utils/nsfwFilter");

module.exports = async (client, message) => {
  if (message.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });

    // Check if automod is enabled for the guild
    if (guildSettings?.automod?.enabled) {
      // Check if the message contains an image attachment
      if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        if (attachment.url) {
          // Detect NSFW content in the image attachment
          const isNSFW = await detectNSFW(attachment.url);

          console.log(isNSFW);

          if (isNSFW.probability > 0.7) {
            // Notify the user that the message was deleted due to NSFW content
            const embed = new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle("NSFW Content Warning")
              .setDescription(
                "Your message was deleted because it contained NSFW content."
              )
              .addFields({ name: "Message Content:", value: attachment.url })
              .addFields({
                name: "probability:",
                value: `${Math.round(isNSFW.probability * 100, 2)}%`,
              })
              .addFields({
                name: "classname:",
                value: isNSFW.className,
              })
              .setTimestamp();

            // If the image contains NSFW content, delete the message
            message.delete();

            message.author.send({ embeds: [embed] });

            logEvent(client, guildSettings, embed);
          }
        }
      }
    }
  }
};
