const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const fs = require("fs");
const axios = require("axios");

// Subcommand Handlers
const handleAddStaff = require("./Sub/addstaff");
const handleAnnounce = require("./Sub/announce");
const handleAutoRole = require("./Sub/autorole");
const handleBackupCreate = require("./Sub/backupcreate");
const handleBackupDelete = require("./Sub/backupdelete");
const handleBackupList = require("./Sub/backuplist");
const handleBackupUpload = require("./Sub/backupload");
const handleBirthdayMessage = require("./Sub/birthdaymessage");
const handleClearNick = require("./Sub/clearnick");
const handleGiveRoleAll = require("./Sub/giveroleall");
const handleInRole = require("./Sub/inrole");
const handleLeave = require("./Sub/leave");
const handleRemind = require("./Sub/remind");
const handleSay = require("./Sub/say");
const handleSetNick = require("./Sub/setnick");
const handleSettingReset = require("./Sub/settingreset");
const handleSetUsername = require("./Sub/setusername");
const handleSnipe = require("./Sub/snipe");
const handleSudo = require("./Sub/sudo");

module.exports = {
  callback: async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "addstaff":
        handleAddStaff(client, interaction);
        break;

      case "announce":
        handleAnnounce(client, interaction);
        break;

      case "autorole":
        handleAutoRole(client, interaction);
        break;

      case "backupcreate":
        handleBackupCreate(client, interaction);
        break;

      case "backupdelete":
        handleBackupDelete(client, interaction);
        break;

      case "backuplist":
        handleBackupList(client, interaction);
        break;

      case "backupload":
        const Attachment = interaction.options.get("attachement");

        // Ensure the uploaded file is a JSON file
        if (!Attachment || !Attachment.attachment.name.endsWith(".json")) {
          await interaction.reply("Please upload a valid JSON backup file.");
          return;
        }

        // Read the content of the uploaded file
        const response = await axios.get(Attachment.attachment.attachment, {
          responseType: "json",
        });
        const backupData = response.data;

        handleBackupUpload(client, interaction, backupData);
        break;

      case "birthdaymessage":
        handleBirthdayMessage(client, interaction);
        break;

      case "clearnick":
        handleClearNick(client, interaction);
        break;

      case "giveroleall":
        handleGiveRoleAll(client, interaction);
        break;

      case "inrole":
        handleInRole(client, interaction);
        break;

      case "leave":
        handleLeave(client, interaction);
        break;

      case "remind":
        handleRemind(client, interaction);
        break;

      case "say":
        handleSay(client, interaction);
        break;

      case "setnick":
        handleSetNick(client, interaction);
        break;

      case "settingreset":
        handleSettingReset(client, interaction);
        break;

      case "setusername":
        handleSetUsername(client, interaction);
        break;

      case "snipe":
        handleSnipe(client, interaction);
        break;

      case "sudo":
        handleSudo(client, interaction);
        break;
      case "createtheme":
        const promt = interaction.options.get("userpromt");
        handleCreateTheme(client, interaction, userpromt);
        break;

      default:
        interaction.reply(
          "Invalid subcommand. Please choose a valid subcommand."
        );
        break;
    }
  },

  name: "utils",
  description: "Perform utils actions.",
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  options: [
    {
      name: "addstaff",
      description: "Add staff to the server.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "addstaff" subcommand, if any
      ],
    },
    {
      name: "announce",
      description: "Make an announcement.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "announce" subcommand, if any
      ],
    },
    {
      name: "autorole",
      description: "Set up auto-roles.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "autorole" subcommand, if any
      ],
    },
    {
      name: "backupcreate",
      description: "Create a backup of the server.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "backupdelete",
      description: "Delete a backup of the server.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "backupdelete" subcommand, if any
      ],
    },
    {
      name: "backuplist",
      description: "List all available backups of the server.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "backupload",
      description: "Upload a backup of the server.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachement",
          description: "The object you want to restore from",
          type: ApplicationCommandOptionType.Attachment,
        },
      ],
    },
    {
      name: "createtheme",
      description: "Create a custom theme",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "promt",
          description: "Explain the theme",
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
    {
      name: "birthdaymessage",
      description: "Set a birthday message for users.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "birthdaymessage" subcommand, if any
      ],
    },
    {
      name: "clearnick",
      description: "Clear the nickname of a user.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "clearnick" subcommand, if any
      ],
    },
    {
      name: "giveroleall",
      description: "Give a role to all members in the server.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "giveroleall" subcommand, if any
      ],
    },
    {
      name: "inrole",
      description: "List all members in a role.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "inrole" subcommand, if any
      ],
    },
    {
      name: "leave",
      description: "Make the bot leave the server.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "remind",
      description: "Set a reminder.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "remind" subcommand, if any
      ],
    },
    {
      name: "say",
      description: "Make the bot say something.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "say" subcommand, if any
      ],
    },
    {
      name: "setnick",
      description: "Set the nickname of a user.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "setnick" subcommand, if any
      ],
    },
    {
      name: "settingreset",
      description: "Reset a setting to its default value.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "settingreset" subcommand, if any
      ],
    },
    {
      name: "setusername",
      description: "Set the bot's username.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "setusername" subcommand, if any
      ],
    },
    {
      name: "snipe",
      description: "Snipe recently deleted messages.",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "sudo",
      description: "Run a command as another user.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        // Add options for the "sudo" subcommand, if any
      ],
    },
  ],
};
