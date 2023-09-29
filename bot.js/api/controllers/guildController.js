require("dotenv").config();
const Discord = require("discord.js");
const getLocalCommands = require("../../app/utils/getLocalCommands");

// Function to fetch the bot's registered commands
async function fetchBotCommands(client) {
  try {
    // Use an empty array as the exceptions parameter
    const commands = getLocalCommands([]);
    const commandsArray = commands.map((command) => ({
      name: command.name,
      description: command.description,
    }));

    return commandsArray;
  } catch (error) {
    console.error("Error fetching bot commands:", error);
    return [];
  }
}

// Function to fetch guild info
async function fetchGuildInfo(client, guildId) {
  try {
    const guild = await client.guilds.fetch(guildId);

    if (!guild) {
      return null;
    }

    const guildInfo = {
      id: guild.id,
      name: guild.name,
      memberCount: guild.memberCount,
      channels: guild.channels.cache.map((channel) => ({
        id: channel.id,
        name: channel.name,
        type: channel.type,
      })),
      roles: guild.roles.cache.map((role) => ({
        id: role.id,
        name: role.name,
        color: role.color,
      })),
    };

    if (guild.owner) {
      guildInfo.owner = {
        id: guild.ownerID,
        username: guild.owner.user ? guild.owner.user.username : "Unknown",
        discriminator: guild.owner.user
          ? guild.owner.user.discriminator
          : "Unknown",
      };
    } else {
      guildInfo.owner = {
        id: "Unknown",
        username: "Unknown",
        discriminator: "Unknown",
      };
    }

    // Fetch the bot's registered commands
    const botCommands = await fetchBotCommands(client);
    guildInfo.enabledFeatures = botCommands;

    return guildInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to fetch guild info
async function getGuildInfo(req, res, client) {
  const { guildId } = req.params;

  console.log("getGuildInfo Called on discord bot");

  try {
    // Fetch guild info using the API request function from your frontend
    const guildInfo = await fetchGuildInfo(client, guildId);
    if (guildInfo) {
      res.json(guildInfo); // Respond with the guild info if it exists
    } else {
      res
        .status(404)
        .json({ error: "Guild not found or bot not in the guild." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getGuildInfo,
};
