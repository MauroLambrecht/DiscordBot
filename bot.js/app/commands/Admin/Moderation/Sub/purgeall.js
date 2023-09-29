const { Client, Interaction, PermissionFlagsBits } = require("discord.js");

/**
 * Handle interactions for the "purgeall" command, which allows users with the "Administrator"
 * permission to purge (delete) all messages in the current text channel.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handlePurgeAll(client, interaction) {
  // Check if the user has the "Administrator" permission
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    console.log(
      "User does not have sufficient permissions to use the 'purgeall' command."
    );
    return interaction.reply({
      content: "You don't have sufficient permissions! [ADMINISTRATOR]",
      ephemeral: true,
    });
  }

  // Calculate the date 14 days ago
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  // Purge (delete) all messages in the current text channel
  interaction.channel.messages
    .fetch({ limit: 100 })
    .then(async (messages) => {
      const messagesToDelete = messages.filter(
        (message) => message.createdAt >= fourteenDaysAgo
      );

      // If there are messages to delete, perform bulk delete
      if (messagesToDelete.size > 0) {
        interaction.channel.bulkDelete(messagesToDelete).then(() => {
          console.log(`Successfully purged ${messagesToDelete.size} messages.`);
          interaction.reply({
            content: `**Successfully purged \`${messagesToDelete.size}\` messages from this channel.**`,
            ephemeral: true,
          });
        });
      } else {
        console.log("No messages found within the 14-day limit.");
        interaction.reply({
          content: "No messages found within the 14-day limit.",
          ephemeral: true,
        });
      }
    })
    .catch((error) => {
      console.error("Error while fetching messages:", error);
    });
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

module.exports = handlePurgeAll;
