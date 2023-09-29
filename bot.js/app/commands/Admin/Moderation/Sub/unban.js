const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  User,
} = require("discord.js");

/**
 * Handle interactions for the "unban" command, which allows users with the "Ban Members"
 * permission to unban a user from the server.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {User} targetUserId - The user to unban.
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleUnban(client, interaction, targetUserId) {
  await interaction.deferReply();

  try {
    // Fetch the banned users from the server
    const bannedUsers = await interaction.guild.bans.fetch();

    // Find the banned user with the specified ID
    const bannedUser = bannedUsers.find((ban) => ban.user.id === targetUserId);

    if (!bannedUser) {
      await interaction.editReply("That user is not banned from this server.");
      return;
    }

    // Unban the user
    await interaction.guild.members.unban(bannedUser.user, reason);

    await interaction.editReply(
      `User ${bannedUser.user.tag} has been unbanned.\nReason: ${reason}`
    );
  } catch (error) {
    console.log(`There was an error when unbanning: ${error}`);
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

module.exports = handleUnban;

// - - Unban not working - -
