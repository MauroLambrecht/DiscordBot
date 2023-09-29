const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

/**
 * Handle interactions for the "unmute" command, which allows users with the "Mute Members"
 * permission to unmute a user in the server.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {User} targetUserId - The user to unmute.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleUnmute(client, interaction, targetUserId) {
  await interaction.deferReply();

  try {
    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "You can't unmute that user because they're the server owner."
      );
      return;
    }

    const mutedRole = interaction.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );

    if (!mutedRole) {
      await interaction.editReply(
        "The Muted role doesn't exist in this server."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't unmute that user because they have the same/higher role than you."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't unmute that user because they have the same/higher role than me."
      );
      return;
    }

    // Unmute the targetUser
    await targetUser.roles.remove(mutedRole);
    await interaction.editReply(`User ${targetUser} was unmuted`);
  } catch (error) {
    console.log(`There was an error when unmuting: ${error}`);
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

module.exports = handleUnmute;
