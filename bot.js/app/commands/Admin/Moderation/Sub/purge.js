const { Client, Interaction, PermissionFlagsBits } = require("discord.js");

/**
 * Handle interactions for the "purge" command, which allows users with the "ManageMessages"
 * permission to purge a set amount of messages from the channel.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {Number} amount - The number of messages to delete.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handlePurge(client, interaction, amount) {
  // Check if the user has the "ManageMessages" permission
  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return interaction.reply({
      content: "You don't have sufficient permissions! [MANAGE_MESSAGES]",
      ephemeral: true,
    });
  }

  // Check if the amount is a valid number
  if (isNaN(amount)) {
    return interaction.reply({
      content: "**Please supply a valid amount to delete messages!**",
      ephemeral: true,
    });
  }

  // Check if the amount is less than or equal to 100
  if (amount > 100) {
    return interaction.reply({
      content: "**Please supply a number less than 100!**",
      ephemeral: true,
    });
  }

  // Check if the amount is more than 1
  if (amount < 1) {
    return interaction.reply({
      content: "**Please supply a number more than 1!**",
      ephemeral: true,
    });
  }

  // Bulk delete messages from the channel
  interaction.channel
    .bulkDelete(amount)
    .then((messages) =>
      interaction.reply({
        content: `**Successfully deleted \`${messages.size}/${amount}\` messages**`,
        ephemeral: true,
      })
    )
    .catch(() => null);
}

module.exports = handlePurge;

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
