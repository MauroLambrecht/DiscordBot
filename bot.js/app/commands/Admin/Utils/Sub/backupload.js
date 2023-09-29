const {
  Client,
  Interaction,
  ChannelType,
  Role,
  OverwriteType,
} = require("discord.js");
const fs = require("fs");

/**
 * Handle the "backupload" subcommand for the "utils" command.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {Object} backupData - The parsed JSON data from the uploaded backup file.
 */
async function handleBackupLoad(client, interaction, backupData) {
  try {
    // Get the server and all its channels
    const server = interaction.guild;

    // Delete existing channels (except threads), roles, emojis, and stickers
    await Promise.all([
      ...server.channels.cache
        .filter((channel) => !channel.isThread())
        .map((channel) =>
          channel.delete().catch((error) => {
            console.error(
              `Error deleting channel ${channel.name}: ${error.message}`
            );
          })
        ),
      ...server.roles.cache
        .filter((role) => role.id !== server.id && !role.managed) // Skip @everyone role and bot roles
        .map((role) =>
          role.delete().catch((error) => {
            console.error(`Error deleting role ${role.name}: ${error.message}`);
          })
        ),
      ...server.emojis.cache.map((emoji) =>
        emoji.delete().catch((error) => {
          console.error(`Error deleting emoji ${emoji.name}: ${error.message}`);
        })
      ),
      ...server.stickers.cache.map((sticker) =>
        sticker.delete().catch((error) => {
          console.error(
            `Error deleting sticker ${sticker.name}: ${error.message}`
          );
        })
      ),
    ]);

    // Create categories first
    const categoryChannelsData = backupData.server.channels.filter(
      (channel) => channel.type === "category"
    );

    const createdCategories = new Map();
    for (const categoryData of categoryChannelsData) {
      const createdCategory = await server.channels.create({
        name: categoryData.name,
        type: ChannelType.GuildCategory,
        permissionOverwrites: categoryData.permissions.map((perm) => {
          return {
            id: perm.id,
            type: OverwriteType.Role,
            allow: perm.allow,
            deny: perm.deny,
          };
        }),
      });

      createdCategories.set(categoryData.id, createdCategory);
    }

    // Create channels under their respective categories
    const nonCategoryChannelsData = backupData.server.channels.filter(
      (channel) => channel.type !== "category"
    );

    for (const channelData of nonCategoryChannelsData) {
      let createdChannel;
      switch (channelData.type) {
        case "text":
          channelData.type = ChannelType.GuildText;
          break;
        case "voice":
          channelData.type = ChannelType.GuildVoice;
          break;
        case "announcement":
          channelData.type = ChannelType.GuildAnnouncement;
          break;
        case "thread":
          // Restore threads separately (you may have a custom method for this)
          //   await restoreThread(server, channelData);
          console.log("Skipping the channel creation for threads.");
          continue; // Skip the channel creation for threads
        default:
          console.log("Skipping unknown channel type:", channelData.type);
          continue; // Skip unknown channel types
      }

      if (!channelData.name) {
        console.log("Channel name is missing for channel data:", channelData);
        continue; // Skip this channel data if the name is missing
      }

      if (channelData.category) {
        const category = createdCategories.get(channelData.category.id);
        if (!category) {
          console.error(
            "Error creating channel:",
            channelData.name,
            "- Category not found."
          );
          continue;
        }

        createdChannel = await server.channels.create({
          name: channelData.name,
          type: channelData.type,
          permissionOverwrites: channelData.permissions.map((perm) => {
            return {
              id: perm.id,
              type: OverwriteType.Role,
              allow: perm.allow,
              deny: perm.deny,
            };
          }),
          parent: category,
        });
      } else {
        // If the channel doesn't have a category, create it without a parent
        createdChannel = await server.channels.create({
          name: channelData.name,
          type: channelData.type,
          permissionOverwrites: channelData.permissions.map((perm) => {
            return {
              id: perm.id,
              type: OverwriteType.Role,
              allow: perm.allow,
              deny: perm.deny,
            };
          }),
        });
      }

      if (createdChannel) {
        console.log("Created channel:", createdChannel.name);
      } else {
        console.log("Failed to create channel:", channelData.name);
      }
    }

    const createdRoles = new Map();

    for (const roleData of backupData.server.roles) {
      // Skip bot roles and @everyone role
      if (roleData.managed || roleData.id === server.id) {
        console.log(`Skipping role creation for ${roleData.name}`);
        continue;
      }

      try {
        const createdRole = await server.roles.create({
          id: roleData.id,
          name: roleData.name,
          color: roleData.color,
          permissions: roleData.permissions,
          hoist: roleData.hoist,
          mentionable: roleData.mentionable,
        });

        createdRoles.set(roleData.id, createdRole);
        console.log(`Created role: ${roleData.name}`);
      } catch (error) {
        console.error(`Error creating role ${roleData.name}: ${error.message}`);
        continue;
      }
    }

    // Calculate the position for each created role
    const botRole = server.roles.highest;
    let currentPosition = botRole.position + createdRoles.size + 1;

    for (const [roleId, role] of createdRoles.entries()) {
      const roleData = backupData.server.roles.find(
        (data) => data.id === roleId
      );

      if (roleData) {
        const positionRelativeToBot = roleData.position - botRole.position;
        const newPosition =
          botRole.position + positionRelativeToBot + createdRoles.size;

        // Update the position of the created role
        await role.setPosition(newPosition);
        console.log(`Set position for role ${role.name}: ${newPosition}`);
      }
    }

    // Create members and assign roles
    for (const memberData of backupData.server.members) {
      try {
        const member = await server.members.fetch(memberData.id);

        // Check if the bot can change the nickname of the member
        if (
          !server.roles.highest.comparePositionTo(member.roles.highest) &&
          server.ownerId !== member.id
        ) {
          const memberRoles = memberData.roles
            .map((roleId) => createdRoles.get(roleId))
            .filter((role) => role !== undefined); // Filter out undefined roles

          await member.roles.add(memberRoles);

          if (memberData.nickname) {
            await member.setNickname(memberData.nickname);
          } else {
            // If the member had no nickname in the backup data, remove their current nickname
            await member.setNickname("");
          }
        } else {
          console.log(
            `Skipping changing the nickname of ${member.user.tag} due to role hierarchy or being the guild owner.`
          );
        }
      } catch (error) {
        if (error.code === 10007) {
          console.error(`Unknown member with ID ${memberData.id}, skipping...`);
          continue;
        } else {
          console.error(
            `Error while processing member with ID ${memberData.id}: ${error.message}`
          );
          continue;
        }
      }
    }

    // Create emojis
    for (const emojiData of backupData.server.emojis) {
      await server.emojis.create(emojiData.url, emojiData.name);
    }

    // Create stickers (assuming you have a custom method for this)
    // replace "createSticker" with the actual method to create stickers
    for (const stickerData of backupData.server.stickers) {
      await createSticker(
        server,
        stickerData.name,
        stickerData.url,
        stickerData.format
      );
    }

    // Ban users
    for (const banData of backupData.server.bans) {
      await server.bans.create(banData.user, { reason: banData.reason });
    }

    console.error("Successfull");
  } catch (error) {
    console.error("Error while loading backup:", error);
  }
}

module.exports = handleBackupLoad;
