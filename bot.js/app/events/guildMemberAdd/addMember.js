const GuildSettings = require("../../../database/models/guild.js");
const Member = require("../../../database/models/member.js");

module.exports = async (client, member) => {
  try {
    const guildId = member.guild.id;
    const memberId = member.user.id;

    // Fetch the current guild settings from the database
    const guildSettings = await GuildSettings.findOne({ guildId });

    guildSettings.memberCount = member.guild.memberCount;
    await guildSettings.save();

    // Delete the member data from the database
    await Member.findOneAndDelete({ userId: memberId, guildId });
  } catch (error) {
    console.error("Error handling guildMemberRemove event:", error);
  }
};
