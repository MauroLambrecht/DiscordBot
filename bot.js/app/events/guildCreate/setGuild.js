const GuildSettings = require("../../../database/models/guild");

module.exports = async (client, guild) => {
  try {
    // Create or fetch guild settings from the database
    let guildSettings = await GuildSettings.findOne({ guildId: guild.id });

    if (!guildSettings) {
      guildSettings = new GuildSettings({
        guildId: guild.id,
        name: guild.name,
      });
    }

    guildSettings.memberCount = guild.memberCount;

    // Save the guild settings to the database
    await guildSettings.save();

    console.log(`Joined new guild: ${guild.name} (${guild.id})`);
  } catch (error) {
    console.error("Error handling guildCreate event:", error);
  }
};
