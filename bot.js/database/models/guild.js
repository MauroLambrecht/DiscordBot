const { Schema, model } = require("mongoose");

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                    🌟 Automoderation Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const automodSchema = new Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  bannedWords: {
    type: [String],
    default: [],
  },
  maxCapsPercentage: {
    type: Number,
    default: 80,
  },
  maxEmojisPerMessage: {
    type: Number,
    default: 5,
  },
  maxMentionsPerMessage: {
    type: Number,
    default: 5,
  },
  maxRepeatedCharacters: {
    type: Number,
    default: 5,
  },
  spamDetectionEnabled: {
    type: Boolean,
    default: true,
  },
  // in seconds
  maxMessageInterval: {
    type: Number,
    default: 5,
  },
  antiInvitesEnabled: {
    type: Boolean,
    default: true,
  },
  allowedLinks: {
    type: [String],
    default: [],
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                       🌟 Economy Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const economySettingsSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  currencyName: {
    type: String,
    default: "Coins",
  },
  currencySymbol: {
    type: String,
  },
  currencyDecimalPlaces: {
    type: Number,
    default: 2,
  },
  dailyRewardAmount: {
    type: Number,
    default: 100,
  },
  workRewardAmount: {
    type: Number,
    default: 50,
  },
  gambleOdds: {
    type: Number,
    default: 50,
  },
  gambleLimit: {
    type: Number,
    default: 1000,
  },
  lotteryChance: {
    type: Number,
    default: 10,
  },
  lotteryLimit: {
    type: Number,
    default: 1000,
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                       🌟 Channel Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const ChannelsSchema = new Schema({
  LogChannel: {
    type: String,
    default: null,
  },
  memberJoinLogChannel: {
    type: String,
    default: null,
  },
  memberLeaveLogChannel: {
    type: String,
    default: null,
  },
  announcementChannel: {
    type: String,
    default: null,
  },
  botChannels: {
    type: [String],
    default: [],
  },
  mediaChannels: {
    type: [String],
    default: [],
  },
  verificationChannel: {
    type: String,
    default: null,
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                       🌟 Levelrole Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const levelRoleSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  levelRoles: {
    type: [
      {
        level: Number,
        roleId: String,
      },
    ],
    default: [],
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                         🌟 Role Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const RolesSchema = new Schema({
  Owner: {
    type: String,
    default: null,
  },
  Admin: {
    type: String,
    default: null,
  },
  Mod: {
    type: String,
    default: null,
  },
  Mute: {
    type: String,
    default: null,
  },
  LevelRole: {
    type: levelRoleSchema,
    default: () => ({}),
  },
  verificationRole: {
    type: String,
    default: null,
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                       🌟 Setting Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const SettingSchema = new Schema({
  prefix: {
    type: String,
    default: "/",
  },
  language: {
    type: String,
    default: "en",
  },
  timezone: {
    type: String,
    default: "UTC+2",
  },
  automod: {
    type: automodSchema,
    default: () => ({}),
  },
  economy: {
    type: economySettingsSchema,
    default: () => ({}),
  },
  toggleLogs: {
    type: Boolean,
    default: false,
  },
  ToggleVerification: {
    type: Boolean,
    default: false,
  },
  verificationMessage: {
    type: String,
    default: null,
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                        🌟 level Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const levelSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  levelMessages: {
    type: [
      {
        level: Number,
        message: String,
      },
    ],
    default: [],
  },
  xpRate: {
    type: Number,
    default: 1,
  },
  maxLevel: {
    type: Number,
    default: 100,
  },
  prestigeLevel: {
    type: Number,
    default: 100,
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                        🌟 ticket Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const ticketSchema = new Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    default: null,
  },
  channelId: {
    type: String,
    default: null,
  },
  userIds: {
    type: [String],
    default: [],
  },
  claimedBy: {
    type: String,
    default: null,
  },
  priority: {
    type: String,
    default: "Normal",
  },
  status: {
    type: String,
    default: "Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date,
    default: null,
  },
  mutedUntil: {
    type: Date,
    default: null,
  },
  notes: {
    type: String,
    default: "",
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                          🌟 Fun Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const funSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  tictactoeGames: {
    type: Map,
    of: String,
    default: {},
  },
  hangmanGames: {
    type: Map,
    of: String,
    default: {},
  },
  triviaGames: {
    type: Map,
    of: String,
    default: {},
  },
  quizzes: {
    type: Map,
    of: String,
    default: {},
  },
  musicQueue: {
    type: [String],
    default: [],
  },
  musicVolume: {
    type: Number,
    default: 50,
  },
  musicRepeat: {
    type: Boolean,
    default: false,
  },
});

// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────
// *                       🌟 main guild Schema 🌟
// * ────────────────────── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ──────────────────────

const guildSettingsSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  memberCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  moderation: {
    type: Schema.Types.Mixed,
    default: {},
  },
  BackupChannelMessages: {
    type: [String],
    default: [],
  },
  Channels: {
    type: ChannelsSchema,
    default: () => ({}),
  },
  Roles: {
    type: RolesSchema,
    default: () => ({}),
  },
  Settings: {
    type: SettingSchema,
    default: () => ({}),
  },
  Leveling: {
    type: levelSchema,
    default: () => ({}),
  },
  Tickets: {
    type: ticketSchema,
    default: () => ({}),
  },
  Fun: {
    type: funSchema,
    default: () => ({}),
  },
});

const GuildSettings = model("GuildSettings", guildSettingsSchema);

module.exports = GuildSettings;
