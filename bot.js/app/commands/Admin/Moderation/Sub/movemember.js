const {
  Client,
  Interaction,
  User,
  Channel,
  ChannelType,
} = require("discord.js");

/**
 * Handle interactions for the "movemember" command, which allows users with the "Administrator"
 * permission to move a specific member to a different voice channel.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {User} memberToMove - The member you want to move.
 * @param {Channel} destinationChannel - The channel you want the user to move to.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleMoveMember(
  client,
  interaction,
  memberToMove,
  destinationChannel
) {
  if (
    !memberToMove ||
    !destinationChannel ||
    destinationChannel.type !== ChannelType.GuildVoice
  ) {
    interaction.reply({
      content: "Invalid member or destination voice channel provided.",
      ephemeral: true,
    });
    return;
  }

  try {
    await memberToMove.voice.setChannel(destinationChannel);
    interaction.reply({
      content: `Moved ${memberToMove} to ${destinationChannel}.`,
      ephemeral: true,
    });
  } catch (error) {
    console.log(`Error moving member: ${error.message}`);
    interaction.reply({
      content: "An error occurred while moving the member.",
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

module.exports = handleMoveMember;
