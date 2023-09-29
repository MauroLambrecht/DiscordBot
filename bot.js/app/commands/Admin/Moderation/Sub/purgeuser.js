const {
  Client,
  Interaction,
  User,
  PermissionFlagsBits,
} = require("discord.js");

/**
 * Handle interactions for the "purgeuser" command, which allows users with the "Administrator"
 * permission to purge (delete) all messages sent by a specific user in the current text channel.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {Number} amount - The number of messages to delete.
 * @param {User} targetUser - The user you want to delete messages from.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handlePurgeUser(client, interaction, targetUser, amount) {
  // Check if the user has the "Administrator" permission
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({
      content: "You don't have sufficient permissions! [ADMINISTRATOR]",
      ephemeral: true,
    });
  }

  // If the target user is not valid, return an error message
  if (!targetUser) {
    return interaction.reply({
      content: "Please specify a valid user to purge messages.",
      ephemeral: true,
    });
  }

  // Purge (delete) all messages sent by the target user in the current text channel
  const messages = await interaction.channel.messages.fetch({ limit: 100 });
  const messagesToDelete = messages.filter(
    (message) => message.author.id === targetUser.id
  );

  if (messagesToDelete.size === 0) {
    return interaction.reply({
      content: `No messages found from user ${targetUser}.`,
      ephemeral: true,
    });
  }

  interaction.channel
    .bulkDelete(messagesToDelete)
    .then((deletedMessages) => {
      interaction.reply({
        content: `**Successfully purged \`${deletedMessages.size}\` messages from user ${targetUser}.**`,
        ephemeral: true,
      });
    })
    .catch(() => null);
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

module.exports = handlePurgeUser;
