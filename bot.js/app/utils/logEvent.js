const { ChannelType } = require("discord.js");

async function logEvent(client, guildSettings, embed) {
  // Check if the log channel exists in the guild settings
  const logChannelId = guildSettings?.logChannels?.LogChannel;
  if (!logChannelId) {
    console.log("Log channel not set.");
    return; // If log channel is not set, do nothing.
  }

  try {
    // Fetch the log channel object from the provided channel ID
    const logChannel = client.channels.cache.get(logChannelId);

    if (logChannel?.type === ChannelType.GuildText) {
      // Send the embed to the log channel
      await logChannel.send({ embeds: [embed] });
    } else {
      console.log("Log channel is not a text channel.");
    }
  } catch (error) {
    console.error("Error logging event to channel:", error);
  }
}

module.exports = logEvent;
