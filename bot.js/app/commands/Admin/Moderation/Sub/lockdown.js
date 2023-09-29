const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  Permissions,
  EmbedBuilder,
} = require("discord.js");

/**
 * Handle interactions for the "lockdown" command, which allows users with the "Administrator"
 * permission to lockdown or unlock the server by locking or unlocking every channel.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleLockdown(client, interaction) {
  // Your code logic here
  const lockPermErr = new EmbedBuilder()
    .setTitle("Permission too low to use.")
    .setDescription("You don't have permissions to use this.");

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

  const guild = interaction.guild;
  const channels = guild.channels.cache.filter(
    (channel) => channel.type !== "GUILD_CATEGORY"
  );

  let isServerLocked = false;

  channels.forEach((channel) => {
    if (
      channel.permissionOverwrites.cache.has(guild.id) &&
      channel.permissionOverwrites.cache
        .get(guild.id)
        .deny.has(PermissionFlagsBits.SendMessages)
    ) {
      // Channel is already locked, unlock it
      try {
        channel.permissionOverwrites.delete(guild.id);
      } catch (e) {
        console.log(e);
      }

      isServerLocked = true;
    } else {
      // Channel is not locked, lock it
      try {
        channel.permissionOverwrites.create(guild.id, {
          SendMessages: false,
          AddReactions: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  });

  if (isServerLocked) {
    interaction.reply({
      content: "Done | Server Unlocked.",
      ephemeral: true,
    });
  } else {
    interaction.reply({
      content: "Done | Server Locked Down.",
      ephemeral: true,
    });
  }
}

module.exports = handleLockdown;

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
