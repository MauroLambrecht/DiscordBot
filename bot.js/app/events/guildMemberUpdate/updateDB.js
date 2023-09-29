const Member = require("../../../database/models/member.js");

module.exports = async (client, oldMember, newMember) => {
  // try {
  //   const memberId = newMember.id;
  //   const guildId = newMember.guild.id;
  //   // Fetch the member from the database
  //   const member = await Member.findOne({ userId: memberId, guildId });
  //   if (member) {
  //     // Update the member's name in the database
  //     member.name = newMember.displayName;
  //     await member.save();
  //   }
  // } catch (error) {
  //   console.error("Error updating member's name in the database:", error);
  // }
};
