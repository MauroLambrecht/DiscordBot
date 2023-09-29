const {
  Client,
  Interaction,
  TextChannel,
  AttachmentBuilder,
  ChannelType,
} = require("discord.js");
const fs = require("fs");

/**
 * Handle the "backupcreate" subcommand for the "utils" command.
 *
 * @param {Client} client - The Discord.js client.
 * @param {Interaction} interaction - The interaction triggered by the user.
 */
async function handleBackupCreate(client, interaction) {
  try {
    // Get the server and all its channels
    const server = interaction.guild;
    await server.channels.fetch();
    await server.members.fetch();
    await server.emojis.fetch();
    await server.stickers.fetch();
    await server.bans.fetch();

    const channels = server.channels.cache.filter(
      (channel) =>
        channel.type === ChannelType.GuildText ||
        channel.type === ChannelType.GuildVoice ||
        channel.type === ChannelType.GuildCategory ||
        channel.type === ChannelType.GuildAnnouncement ||
        channel.type === ChannelType.PublicThread
    );

    // Get all roles of the server
    const roles = server.roles.cache;

    // Get all members of the server
    const members = server.members.cache;

    // Create an object to store the backup data
    const backupData = {
      server: {
        name: server.name,
        iconURL: server.iconURL(),
        channels: [],
        roles: [],
        members: [],
        emojis: [],
        stickers: [],
        bans: [],
      },
    };

    // Store channel settings
    channels.forEach((channel) => {
      if (channel.type === ChannelType.GuildCategory) {
        return; // Skip category channels, they will be processed separately
      }

      let category = null;
      if (channel.parentId) {
        const parent = channels.get(channel.parentId);
        if (parent && parent.type === ChannelType.GuildCategory) {
          category = {
            id: parent.id,
            name: parent.name,
            permissions: parent.permissionOverwrites.cache.toJSON(),
          };
        }
      }

      if (channel.type === ChannelType.GuildText) {
        backupData.server.channels.push({
          id: channel.id,
          name: channel.name,
          type: "text",
          category: category,
          permissions: channel.permissionOverwrites.cache.toJSON(),
        });
      } else if (channel.type === ChannelType.GuildVoice) {
        backupData.server.channels.push({
          id: channel.id,
          name: channel.name,
          type: "voice",
          category: category,
          permissions: channel.permissionOverwrites.cache.toJSON(),
        });
      } else if (channel.type === ChannelType.GuildAnnouncement) {
        backupData.server.channels.push({
          id: channel.id,
          name: channel.name,
          type: "announcement",
          category: category,
          permissions: channel.permissionOverwrites.cache.toJSON(),
        });
      } else if (channel.type === ChannelType.PublicThread) {
        backupData.server.channels.push({
          id: channel.id,
          name: channel.name,
          type: "thread",
          category: category,
          permissions: channel.permissionOverwrites.cache.toJSON(),
        });
      }
    });

    // Store category channels separately
    const categoryChannels = channels.filter(
      (channel) => channel.type === ChannelType.GuildCategory
    );

    categoryChannels.forEach((categoryChannel) => {
      const channelsInCategory = channels.filter(
        (channel) => channel.parentId === categoryChannel.id
      );

      backupData.server.channels.push({
        id: categoryChannel.id,
        name: categoryChannel.name,
        type: "category",
        permissions: categoryChannel.permissionOverwrites.cache.toJSON(),
        channels: channelsInCategory.map((channel) => channel.name),
      });
    });

    // Store role settings
    roles.forEach((role) => {
      // Skip bot roles and @everyone role
      if (role.managed || role.id === server.id) {
        console.log(`Skipping role backup for ${role.name}`);
        return;
      }

      backupData.server.roles.push({
        id: role.id,
        name: role.name,
        color: role.color,
        permissions: role.permissions,
        position: role.position,
        hoist: role.hoist,
        mentionable: role.mentionable,
      });
    });

    // Store member data
    members.forEach((member) => {
      const memberRoles = member.roles.cache.map((role) => role.id);
      backupData.server.members.push({
        id: member.id,
        nickname: member.nickname,
        roles: memberRoles,
      });
    });

    // Store emoji data
    server.emojis.cache.forEach((emoji) => {
      backupData.server.emojis.push({
        id: emoji.id,
        name: emoji.name,
        url: emoji.url,
        animated: emoji.animated,
      });
    });

    // Store sticker data
    server.stickers.cache.forEach((sticker) => {
      backupData.server.stickers.push({
        id: sticker.id,
        name: sticker.name,
        url: sticker.url,
        format: sticker.format,
      });
    });

    // Store banlist data
    server.bans.cache.forEach((ban) => {
      backupData.server.bans.push({
        user: ban.user.id,
        reason: ban.reason,
      });
    });

    // Convert backupData to JSON
    const backupJSON = JSON.stringify(backupData, null, 2);

    // Create a temporary JSON file
    const tempFilePath = "./data/server_backup.json";
    fs.writeFileSync(tempFilePath, backupJSON, "utf8");

    // Create a MessageAttachment from the file
    const attachment = new AttachmentBuilder(tempFilePath);

    // Respond to the user and upload the backup file as an attachment
    await interaction.reply({
      content: "Server backup has been created successfully!",
      files: [attachment],
    });

    // Delete the temporary file after uploading
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    console.error("Error while creating backup:", error);
    await interaction.reply("An error occurred while creating the backup.");
  }
}

module.exports = handleBackupCreate;
