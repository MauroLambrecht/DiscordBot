const { Client, Interaction, Channel, ChannelType } = require("discord.js");

/**
 * Handle interactions for the "moveall" command, which allows users with the "Administrator"
 * permission to move all members from one voice channel to another.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {Channel} sourceChannel - The channel where you want to warp members from.
 * @param {Channel} destinationChannel - The channel where you want to warp members to.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleMoveAll(
  client,
  interaction,
  sourceChannel,
  destinationChannel
) {
  if (
    !sourceChannel ||
    !destinationChannel ||
    sourceChannel.type !== ChannelType.GuildVoice ||
    destinationChannel.type !== ChannelType.GuildVoice
  ) {
    interaction.reply({
      content: "Invalid source or destination voice channel provided.",
      ephemeral: true,
    });
    return;
  }

  // Get the voiceStates of the members in the sourceChannel
  const voiceStates = sourceChannel.guild.voiceStates.cache;
  const membersToMove = voiceStates.map((voiceState) => voiceState.member);
  let movedMembersCount = 0;

  for (const member of membersToMove) {
    try {
      await member.voice.setChannel(destinationChannel);
      movedMembersCount++;
    } catch (error) {
      console.log(`Error moving member: ${error.message}`);
    }
  }

  interaction.reply({
    content: `Moved ${movedMembersCount} members from ${sourceChannel} to ${destinationChannel}.`,
    ephemeral: true,
  });
}

module.exports = handleMoveAll;

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

module.exports = handleMoveAll;
