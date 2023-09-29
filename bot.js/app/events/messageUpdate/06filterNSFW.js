const { MessageAttachment } = require("discord.js");
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

          if (isNSFW) {
            // If the image contains NSFW content, delete the message
            message.delete();

            // Notify the user that the message was deleted due to NSFW content
            const embed = new MessageEmbed()
              .setColor("#ff0000")
              .setTitle("NSFW Content Warning")
              .setDescription(
                "Your message was deleted because it contained NSFW content."
              )
              .addField("Message Content:", message.content)
              .setTimestamp();

            message.author.send({ embeds: [embed] });

            logEvent(client, guildSettings, embed);
          }
        }
      }
    }
  }
};
