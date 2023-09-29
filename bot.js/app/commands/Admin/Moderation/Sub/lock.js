const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  Permissions,
  EmbedBuilder,
} = require("discord.js");

/**
 * Handle interactions for the "lock" command, which allows users with the "Administrator"
 * permission to lock or unlock a text channel by denying or allowing the "SendMessages"
 * and "AddReactions" permissions.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleLock(client, interaction) {
  // Your code logic here
  const lockPermErr = new EmbedBuilder()
    .setTitle("Permission too low to use.")
    .setDescription("You don't have permissions to use this.");

  // Check if the interaction is from a guild (not a DM)
  if (!interaction.guild) {
    return; // Ignore DM interactions
  }

  if (
    !interaction.channel
      .permissionsFor(interaction.member)
      .has(PermissionFlagsBits.Administrator)
  ) {
    return interaction.reply({
      embeds: [lockPermErr],
      ephemeral: true,
    });
  }

  const channel = interaction.channel;

  if (
    channel.permissionOverwrites.cache.has(interaction.guild.id) &&
    channel.permissionOverwrites.cache
      .get(interaction.guild.id)
      .deny.has(PermissionFlagsBits.SendMessages)
  ) {
    // Channel is already locked, so unlock it
    try {
      channel.permissionOverwrites.delete(interaction.guild.id);
    } catch (e) {
      console.log(e);
    }

    interaction.reply({
      content: "Done | Channel Unlocked.",
      ephemeral: true,
    });
  } else {
    // Channel is not locked, so lock it
    try {
      channel.permissionOverwrites.create(interaction.guild.id, {
        SendMessages: false,
        AddReactions: false,
      });
    } catch (e) {
      console.log(e);
    }

    interaction.reply({
      content: "Done | Channel Locked.",
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

module.exports = handleLock;
