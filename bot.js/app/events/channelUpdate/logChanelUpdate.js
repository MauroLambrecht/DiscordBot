const { EmbedBuilder, ChannelType, Permissions } = require("discord.js");
const GuildSettings = require("../../../database/models/guild");
const logEvent = require("../../utils/logEvent");

function getChangedPermissions(oldOverwrites, newOverwrites) {
  const changedPermissions = [];

  oldOverwrites.forEach((oldPerm, id) => {
    const newPerm = newOverwrites.get(id);

    if (
      !newPerm ||
      oldPerm.allow !== newPerm.allow ||
      oldPerm.deny !== newPerm.deny
    ) {
      changedPermissions.push({
        id,
        oldPermissions: new Permissions(oldPerm.allow, oldPerm.deny),
        newPermissions: newPerm
          ? new Permissions(newPerm.allow, newPerm.deny)
          : null,
      });
    }
  });

  newOverwrites.forEach((newPerm, id) => {
    const oldPerm = oldOverwrites.get(id);

    if (!oldPerm) {
      changedPermissions.push({
        id,
        oldPermissions: null,
        newPermissions: new Permissions(newPerm.allow, newPerm.deny),
      });
    }
  });

  return changedPermissions;
}

module.exports = async (client, oldChannel, newChannel) => {
  // Check if the event occurred in a guild (not a DM channel, etc.)

  if (!newChannel) return;

  if (newChannel.guild) {
    const guildSettings = await GuildSettings.findOne({
      guildId: newChannel.guild.id,
    });

    // Determine the channel type
    let channelType;
    switch (newChannel.type) {
      case ChannelType.GuildText:
        channelType = "Text Channel";
        break;
      case ChannelType.GuildVoice:
        channelType = "Voice Channel";
        break;
      case ChannelType.GuildCategory:
        channelType = "Category";
        break;
      case ChannelType.GuildNews:
        channelType = "Announcement Channel";
        break;
      case ChannelType.GuildStore:
        channelType = "Store Channel";
        break;
      default:
        channelType = "Unknown";
    }

    // Check if the channel name was changed
    if (oldChannel.name !== newChannel.name) {
      // Create the log message for the name change
      const nameChangeEmbed = new EmbedBuilder()
        .setColor("#ffff00") // Set the color of the embed to yellow (indicating change)
        .setTitle("Channel Name Change") // Set the title of the embed
        .setDescription(
          `The ${channelType} "${oldChannel.name}" was renamed to "${newChannel.name}".`
        );

      // Log the channel name change event to the log channel
      logEvent(client, guildSettings, nameChangeEmbed);
    }

    // Check if the channel permissions were changed
    const oldOverwrites = oldChannel.permissionOverwrites.cache;
    const newOverwrites = newChannel.permissionOverwrites.cache;

    if (oldOverwrites && newOverwrites && oldOverwrites !== newOverwrites) {
      const changedPermissions = getChangedPermissions(
        oldOverwrites,
        newOverwrites
      );

      if (changedPermissions.length > 0) {
        // Create the log message for the permission change
        const permissionChangeEmbed = new EmbedBuilder()
          .setColor("#ff0000") // Set the color of the embed to red (indicating change)
          .setTitle("Channel Permission Change") // Set the title of the embed
          .setDescription(
            `The permissions for the ${channelType} "${newChannel.name}" were updated.`
          );

        // Add detailed information about changed permissions
        changedPermissions.forEach(({ id, oldPermissions, newPermissions }) => {
          const userOrRole = newChannel.guild.roles.cache.has(id)
            ? `Role: ${newChannel.guild.roles.cache.get(id).name}`
            : `User: ${newChannel.guild.members.cache.get(id).user.tag}`;

          permissionChangeEmbed.addField(
            `Changed Permissions for ${userOrRole}`,
            `
            Old Permissions:
            ${oldPermissions ? oldPermissions.toArray().join(", ") : "None"}
            
            New Permissions:
            ${newPermissions ? newPermissions.toArray().join(", ") : "None"}
            `
          );
        });

        // Log the channel permission change event to the log channel
        logEvent(client, guildSettings, permissionChangeEmbed);
      }
    }
  } else {
    return;
  }
};
