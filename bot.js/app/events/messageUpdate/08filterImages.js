const { EmbedBuilder } = require("discord.js");
const Clarifai = require("clarifai");
const GuildSettings = require("../../../database/models/guild");

const clarifai = new Clarifai.App({
  apiKey: "477faeb5b4144c6bb0783a8ec2dfeb06",
});

async function moderateImage(imageUrl) {
  try {
    // Use Clarifai API to moderate the image
    const response = await clarifai.models.predict(
      Clarifai.MODERATION_MODEL,
      imageUrl
    );

    console.log(response);

    // Get the moderation status
    const moderationStatus = response.outputs[0]?.data?.concepts[0]?.name;

    console.log(moderationStatus);

    // Return the moderation status
    return moderationStatus === "sfw";
  } catch (error) {
    console.error("Error moderating image:", error);
    return false; // In case of an error, assume the image is safe
  }
}

module.exports = async (client, message) => {
  if (message.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: message.guild.id,
    });

    // Check if automod is enabled for the guild
    if (guildSettings?.automod?.enabled) {
      if (message.attachments.size > 0) {
        const imageUrl = message.attachments.first().url;

        // Check if the image is safe
        const isSafeImage = await moderateImage(imageUrl);
        console.log(isSafeImage);

        if (!isSafeImage) {
          // Delete the message containing the unsafe image
          message.delete();

          // Notify the user that the message was deleted due to an unsafe image
          message.author.send(
            "Your message was deleted because it contained an unsafe image."
          );

          const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Unsafe Image Warning")
            .setDescription(
              "Your message was deleted because it contained an unsafe image."
            )
            .addfields({ name: "user", value: message.author })
            .setTimestamp();

          logEvent(client, guildSettings, embed);
        }
      }
    }
  }
};
