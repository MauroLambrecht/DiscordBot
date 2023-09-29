const { EmbedBuilder, ChannelType, Constants } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const logEvent = require("../../utils/logEvent");

module.exports = async (client, channel) => {
  // Check if the event occurred in a guild (not a DM channel, etc.)
  if (channel.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: channel.guild.id,
    });

    // Determine the channel type
    let channelType;
    switch (channel.type) {
      case ChannelType.GuildText:
        channelType = "Text Channel";
        break;
      case ChannelType.GuildVoice:
        channelType = "Voice Channel";
        break;
      case ChannelType.GuildCategory:
        channelType = "Category";
        break;
      case ChannelType.GuildNews:
        channelType = "Announcement Channel";
        break;
      default:
        channelType = "Unknown";
    }

    // Create the log message
    const embed = new EmbedBuilder()
      .setColor("#00ff00") // Set the color of the embed
      .setTitle("Channel Created") // Set the title of the embed
      .setDescription(
        `A new ${channelType.toLowerCase()} was created: ${channel.toString()}`
      )
      .addFields({ name: "Channel ID", value: channel.id })
      .addFields({
        name: "Channel Category",
        value: channel.parent?.name ?? "None",
      });

    // Log the channel create event to the log channel
    logEvent(client, guildSettings, embed);
  }
};
