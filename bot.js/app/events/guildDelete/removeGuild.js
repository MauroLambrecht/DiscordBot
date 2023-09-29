const GuildSettings = require("../../../database/models/guild");

module.exports = async (client, guild) => {
  try {
    // Remove guild settings from the database upon leaving the guild
    await GuildSettings.findOneAndRemove({ guildId: guild.id });

    console.log(`Left guild: ${guild.name} (${guild.id})`);
  } catch (error) {
    console.error("Error handling guildDelete event:", error);
  }
};
