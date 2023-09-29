// File: app/events/guildUpdate.js
const GuildSettings = require("../../../database/models/guild.js");

module.exports = async (client, oldGuild, newGuild) => {
  try {
    const guildId = newGuild.id;

    // Fetch the guild settings from the database
    const guildSettings = await GuildSettings.findOne({ guildId });
    if (guildSettings) {
      // Update the guild's name in the database
      guildSettings.name = newGuild.name;
      guildSettings.memberCount = newGuild.memberCount;
      await guildSettings.save();
    }
  } catch (error) {
    console.error("Error updating guild name in the database:", error);
  }
};
