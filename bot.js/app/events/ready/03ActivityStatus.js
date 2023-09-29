const { ActivityType } = require("discord.js");
const botStatsSchema = require("../../../database/models/bot.js");

module.exports = async (client) => {
  console.log("'Rewind' is online!");
  console.log(`Logged in as ${client.user.tag}!`);

  // Activity
  client.user.setActivity({
    name: "/help",
    type: ActivityType.Playing,
  });
};
