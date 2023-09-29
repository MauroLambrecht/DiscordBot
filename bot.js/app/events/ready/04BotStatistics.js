const botStatsModel = require("../../../database/models/bot.js");
const getLocalCommands = require("../../utils/getLocalCommands.js");

module.exports = async (client) => {
  const localCommands = getLocalCommands();

  // After all commands are processed, update the totalCommands field in the database
  const totalCommands = localCommands.length;

  // Ensure a successful database connection
  try {
    await botStatsModel.init(); // Initialize the model to ensure the connection

    const botStats = await botStatsModel.findOne({});
    if (botStats) {
      botStats.totalCommands = totalCommands;
      botStats.totalServers = client.guilds.cache.size; // Update totalServers
      await botStats.save();
    } else {
      // If botStats is not found in the database, create a new entry with totalCommands and totalServers
      const newBotStats = new botStatsModel({
        totalCommands,
        totalServers: client.guilds.cache.size,
      });
      await newBotStats.save();
    }

    // Update botUptime
    const botUptime = client.readyAt;
    if (botUptime) {
      botStats.botUptime = botUptime;
      await botStats.save();
    } else {
      // If botStats is not found in the database, create a new entry with botUptime
      const newBotStats = new botStatsModel({
        botUptime,
      });
      await newBotStats.save();
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
