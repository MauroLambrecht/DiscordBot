const { Schema, model } = require("mongoose");

const botStatsSchema = new Schema({
  botUptime: {
    type: Date,
    default: null,
  },
  totalCommands: {
    type: Number,
    default: 0,
  },
  totalServers: {
    type: Number,
    default: 0,
  },
});

module.exports = model("BotStats", botStatsSchema);
