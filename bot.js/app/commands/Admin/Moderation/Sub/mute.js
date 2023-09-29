const { Client, Interaction, User } = require("discord.js");

/**
 * Handle interactions for the "mute" command, which allows users with the "MuteMembers"
 * permission to mute a member in the server.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {User} targetUserId - The user you want to mute.
 * @param {String} reason - The reason for the mute.
 *
 * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
 */

async function handleMute(client, interaction, targetUserId, reason) {
  await interaction.deferReply();

  const targetUser = await interaction.guild.members.fetch(targetUserId);

  if (!targetUser) {
    await interaction.editReply("That user doesn't exist in this server.");
    return;
  }

  if (targetUser.id === interaction.guild.ownerId) {
    await interaction.editReply(
      "You can't mute that user because they're the server owner."
    );
    return;
  }

  let mutedRole = interaction.guild.roles.cache.find(
    (role) => role.name === "Muted"
  );

  if (!mutedRole) {
    try {
      mutedRole = await interaction.guild.roles.create({
        name: "Muted",
        permissions: [],
      });

      interaction.guild.channels.cache.forEach(async (channel) => {
        await channel.permissionOverwrites.create(mutedRole, {
          SendMessages: false,
          AddReactions: false,
          Speak: false,
        });
      });

      await interaction.editReply("The Muted role has been created.");
    } catch (error) {
      console.log(`Error creating the Muted role: ${error}`);
      await interaction.editReply(
        "An error occurred while creating the Muted role."
      );
      return;
    }
  }

  const targetUserRolePosition = targetUser.roles.highest.position;
  const requestUserRolePosition = interaction.member.roles.highest.position;
  const botRolePosition = interaction.guild.members.me.roles.highest.position;

  if (targetUserRolePosition >= requestUserRolePosition) {
    await interaction.editReply(
      "You can't mute that user because they have the same/higher role than you."
    );
    return;
  }

  if (targetUserRolePosition >= botRolePosition) {
    await interaction.editReply(
      "I can't mute that user because they have the same/higher role than me."
    );
    return;
  }

  // Mute the targetUser
  try {
    await targetUser.roles.add(mutedRole);
    await interaction.editReply(
      `User ${targetUser} was muted\nReason: ${reason}`
    );
  } catch (error) {
    console.log(`There was an error when muting: ${error}`);
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

module.exports = handleMute;
