const botStatsModel = require("../../database/models/bot.js");

const getBotStats = async (req, res) => {
  try {
    // Fetch the bot statistics from the database
    const botStats = await botStatsModel.findOne({});

    // If botStats is found in the database, return the data
    if (botStats) {
      res.status(200).json(botStats);
    } else {
      // If botStats is not found in the database, return an empty response
      res.status(200).json({});
    }
  } catch (error) {
    console.error("Error fetching bot statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getBotStats,
};
