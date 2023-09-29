const GuildSettings = require("../../../database/models/guild");

module.exports = async (client, member) => {
  try {
    // Get the guild the member left from
    const guild = member.guild;

    // Update the member count in the guild settings
    const guildSettings = await GuildSettings.findOne({ guildId: guild.id });

    guildSettings.memberCount = guild.memberCount;
    await guildSettings.save();
  } catch (error) {
    console.error("Error handling guildMemberRemove event:", error);
  }
};
