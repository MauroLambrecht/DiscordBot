const { Client, Interaction, User } = require("discord.js");
const ms = require("ms");

/**
 * Handle interactions for the "timeout" command, which allows users with the "Mute Members"
 * permission to timeout a user for a specific duration.
 *
 * @param {Interaction} interaction -  The interaction triggered by the user.
 * @param {User} mentionable - The user to timeout.
 * @param {TimeRanges} duration - The timeout duration.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleTimeout(client, interaction, mentionable, duration) {
  await interaction.deferReply();

  const targetUser = await interaction.guild.members.fetch(mentionable);
  if (!targetUser) {
    await interaction.editReply("That user doesn't exist in this server.");
    return;
  }

  if (targetUser.user.bot) {
    await interaction.editReply("I can't timeout a bot.");
    return;
  }

  const msDuration = ms(duration);
  if (isNaN(duration)) {
    await interaction.editReply("Please provide a valid timeout duration.");
    return;
  }

  if (msDuration < 5000 || msDuration > 2.419e9) {
    await interaction.editReply(
      "Timeout duration cannot be less than 5 seconds or more than 28 days."
    );
    return;
  }

  const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
  const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
  const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

  if (targetUserRolePosition >= requestUserRolePosition) {
    await interaction.editReply(
      "You can't timeout that user because they have the same/higher role than you."
    );
    return;
  }

  if (targetUserRolePosition >= botRolePosition) {
    await interaction.editReply(
      "I can't timeout that user because they have the same/higher role than me."
    );
    return;
  }

  // Timeout the user
  try {
    const { default: prettyMs } = await import("pretty-ms");

    if (targetUser.isCommunicationDisabled()) {
      await targetUser.timeout(msDuration);
      await interaction.editReply(
        `${targetUser}'s timeout has been updated to ${prettyMs(duration, {
          verbose: true,
        })}`
      );
      return;
    }

    await targetUser.timeout(duration);
    await interaction.editReply(
      `${targetUser} was timed out for ${prettyMs(duration, {
        verbose: true,
      })}`
    );
  } catch (error) {
    console.log(`There was an error when timing out: ${error}`);
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

module.exports = handleTimeout;
