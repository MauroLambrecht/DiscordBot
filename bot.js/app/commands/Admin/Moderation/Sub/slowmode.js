const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

/**
 * Handle interactions for the "slowmode" command, which allows users with the "Manage Channels"
 * or "Administrator" permission to set the slow mode (rate limit) for the current text channel.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {Number} slowmodeDelay - The number of seconds of delay in a channel.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleSlowmode(client, interaction, slowmodeDelay) {
  // Check if the user has the required permissions to manage channels
  if (
    !interaction.member.permissions.has(PermissionFlagsBits.ManageChannels) &&
    !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
  ) {
    return interaction.reply({
      content:
        "You don't have sufficient permissions! [MANAGE_CHANNELS, ADMINISTRATOR]",
      ephemeral: true,
    });
  }

  // Check if the slowmode delay is a valid positive integer
  if (isNaN(slowmodeDelay) || slowmodeDelay < 0) {
    return interaction.reply({
      content:
        "**Please provide a valid positive integer for slow mode delay.**",
      ephemeral: true,
    });
  }

  // Set the slow mode for the current text channel
  try {
    await interaction.channel.setRateLimitPerUser(slowmodeDelay);
    const response =
      slowmodeDelay === 0
        ? "Slow mode has been disabled."
        : `Slow mode has been set to ${slowmodeDelay} seconds.`;

    interaction.reply({
      content: `**${response}**`,
      ephemeral: true,
    });
  } catch (error) {
    console.log(`Error setting slow mode: ${error}`);
    interaction.reply({
      content: "An error occurred while setting slow mode.",
      ephemeral: true,
    });
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

module.exports = handleSlowmode;
