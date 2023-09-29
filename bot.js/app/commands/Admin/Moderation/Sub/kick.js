const { Interaction } = require("discord.js");

/**
 * Handle interactions for the "kick" command, which allows users with the "KickMembers"
 * permission to kick a member from the server. The command takes a target user to kick
 * and an optional reason for the kick.
 *
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {string} targetUserId - The ID of the user to kick.
 * @param {string} reason - The reason for the kick (optional).
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleKick(interaction, targetUserId, reason) {
  await interaction.deferReply();

  // Fetch the target user from the guild (server)
  const targetUser = await interaction.guild.members.fetch(targetUserId);

  // Check if the target user exists in the server
  if (!targetUser) {
    await interaction.editReply("That user doesn't exist in this server.");
    return;
  }

  // Check if the target user is the server owner
  if (targetUser.id === interaction.guild.ownerId) {
    await interaction.editReply(
      "You can't kick that user because they're the server owner."
    );
    return;
  }

  // Get the highest roles' positions of the target user, the user executing the command, and the bot
  const targetUserRolePosition = targetUser.roles.highest.position;
  const requestUserRolePosition = interaction.member.roles.highest.position;
  const botRolePosition = interaction.guild.members.me.roles.highest.position;

  // Check if the target user has a higher or equal role to the user executing the command
  if (targetUserRolePosition >= requestUserRolePosition) {
    await interaction.editReply(
      "You can't kick that user because they have the same/higher role than you."
    );
    return;
  }

  // Check if the target user has a higher or equal role to the bot
  if (targetUserRolePosition >= botRolePosition) {
    await interaction.editReply(
      "I can't kick that user because they have the same/higher role than me."
    );
    return;
  }

  // Kick the target user
  try {
    await targetUser.kick({ reason });
    await interaction.editReply(
      `User ${targetUser} was kicked\nReason: ${reason}`
    );
  } catch (error) {
    console.log(`There was an error when kicking: ${error}`);
  }
}

/*
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 *                   🐺 xWolfy, the Mastermind 🌟
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 *
 *   🌟 Talented Creator and Bot Developer 🚀
 *   💫 Crafting Marvelous Bots with Artistry 🎨
 *
 *   🚀 Unleash the Magic on Discord 🌌✨
 *   🌈 Embrace the Wonderment and Explore! 🌠🚀
 *
 * ───────── ･ ｡ﾟ☆: *.☽  Connect with xWolfy ☽ .* :☆ﾟ. ────────────
 *           🌐 GitHub: https://github.com/xWolfy 🌐
 *           💫 Discord server: https://discord.gg/zVs7j3rxDf 💫
 *           🐺 DM me: xwolfy 🐺
 * ────────────────────────────────────────────────────────────────
 */

module.exports = handleKick;
