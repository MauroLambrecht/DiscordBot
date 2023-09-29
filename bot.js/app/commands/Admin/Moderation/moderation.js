const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const handleBan = require("./Sub/ban");
const handleKick = require("./Sub/kick");
const handleClearWarns = require("./Sub/clearwarns");
const handleLock = require("./Sub/lock");
const handleLockdown = require("./Sub/lockdown");
const handleMoveAll = require("./Sub/moveall");
const handleMoveMember = require("./Sub/movemember");
const handleMute = require("./Sub/mute");
const handlePurge = require("./Sub/purge");
const handlePurgeAll = require("./Sub/purgeall");
const handlePurgeUser = require("./Sub/purgeuser");
const handleSlowmode = require("./Sub/slowmode");
const handleTimeout = require("./Sub/timeout");
const handleUnban = require("./Sub/unban");
const handleUnmute = require("./Sub/unmute");
const handleWarn = require("./Sub/warn");
const handleWarnings = require("./Sub/warnings");

module.exports = {
  /**
   * Handle interactions for the "moderation" command, which allows
   * users with the "Administrator" permission to perform various moderation actions.
   * The command supports subcommands like ban, kick, mute, etc.
   *
   * @param {Client} client - The Discord.js client.
   * @param {Interaction} interaction - The interaction triggered by the user.
   *
   * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
   */

  callback: async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "ban":
        const banUser = interaction.options.getMember("user");
        const banReason = interaction.options.getString("reason");
        handleBan(client, interaction, banUser, banReason);
        break;

      case "kick":
        const kickUser = interaction.options.getMember("user");
        const kickReason = interaction.options.getString("reason");
        handleKick(client, interaction, kickUser, kickReason);
        break;

      case "clearwarns":
        const userToClear = interaction.options.getMember("user");
        handleClearWarns(client, interaction, userToClear);
        break;

      case "lock":
        handleLock(client, interaction);
        break;

      case "lockdown":
        handleLockdown(client, interaction);
        break;

      case "moveall":
        const sourceChannel = interaction.options.getChannel("channel");
        const destinationChannel =
          interaction.options.getChannel("destination");
        handleMoveAll(client, interaction, sourceChannel, destinationChannel);
        break;

      case "movemember":
        const User = interaction.options.getMember("user");
        const destination = interaction.options.getChannel("destination");
        handleMoveMember(client, interaction, User, destination);
        break;

      case "mute":
        const muteUser = interaction.options.getMember("user");
        const muteReason = interaction.options.getString("reason");
        handleMute(client, interaction, muteUser, muteReason);
        break;

      case "purge":
        const purgeAmount = interaction.options.getInteger("amount");
        handlePurge(client, interaction, purgeAmount);
        break;

      case "purgeall":
        handlePurgeAll(client, interaction);
        break;

      case "purgeuser":
        const purgeUser = interaction.options.getMember("user");
        const purgeUserAmount = interaction.options.getInteger("amount");
        handlePurgeUser(client, interaction, purgeUser, purgeUserAmount);
        break;

      case "slowmode":
        const slowmodeDuration = interaction.options.getInteger("duration");
        handleSlowmode(client, interaction, slowmodeDuration);
        break;

      case "timeout":
        const timeoutUser = interaction.options.getMember("user");
        const timeoutDuration = interaction.options.getInteger("duration");
        handleTimeout(client, interaction, timeoutUser, timeoutDuration);
        break;

      case "unban":
        const unbanUser = interaction.options.getUser("user");
        handleUnban(client, interaction, unbanUser);
        break;

      case "unmute":
        const unmuteUser = interaction.options.getMember("user");
        handleUnmute(client, interaction, unmuteUser);
        break;

      case "warn":
        const warnUser = interaction.options.getMember("user");
        const warnReason = interaction.options.getString("reason");
        handleWarn(client, interaction, warnUser, warnReason);
        break;

      case "warnings":
        const warningsUser = interaction.options.getMember("user");
        handleWarnings(client, interaction, warningsUser);
        break;

      default:
        interaction.reply(
          "Invalid subcommand. Please choose a valid subcommand."
        );
        break;
    }
  },

  name: "moderation",
  description: "Perform moderation actions.",
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  options: [
    {
      name: "ban",
      description: "Ban a user",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user to ban",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for the ban",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
    {
      name: "kick",
      description: "Kick a user",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user to kick",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: "clearwarns",
      description: "Clear warns for a user",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user to clear warns for",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: "lock",
      description: "Lock a channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "lockdown",
      description: "Lockdown a channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "moveall",
      description: "Move all members in a voice channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel",
          description: "The voice channel to move all members from",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
        {
          name: "destination",
          description: "The destination voice channel",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
    {
      name: "movemember",
      description: "Move a member to a voice channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The member to move",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "destination",
          description: "The destination voice channel",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
    {
      name: "mute",
      description: "Mute a member in a voice channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The member to mute",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for the mute",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
    {
      name: "purge",
      description: "Purge messages in a text channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "amount",
          description: "The number of messages to purge",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: "purgeall",
      description: "Purge all messages in a text channel",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "purgeuser",
      description: "Purge messages from a specific user in a text channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user whose messages will be purged",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "amount",
          description: "The number of messages to purge",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: "slowmode",
      description: "Set slowmode for a text channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel",
          description: "The text channel to set slowmode",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
        {
          name: "duration",
          description: "The duration of slowmode in seconds",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: "timeout",
      description: "Timeout a member in a voice channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The member to timeout",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "duration",
          description: "The duration of the timeout in seconds",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: "unban",
      description: "Unban a user",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The user to unban",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: "unmute",
      description: "Unmute a member in a voice channel",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The member to unmute",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: "warn",
      description: "Warn a member",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The member to warn",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Reason for the warn",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
    {
      name: "warnings",
      description: "View warnings for a member",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user",
          description: "The member to view warnings for",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
  ],
};

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
