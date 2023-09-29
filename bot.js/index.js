const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const eventhandler = require("./app/handlers/eventHandler.js");
require("dotenv/config");

// const { REST } = require("@discordjs/rest");
// const { Routes } = require("discord-api-types/v9");

// const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

// Start your Discord bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  ws: { properties: { browser: "Discord iOS" } },
});

// rest
//   .put(Routes.applicationCommands("1127674277290852353"), { body: [] })
//   .then(() => console.log("Successfully deleted all application commands."))
//   .catch(console.error);

eventhandler(client);

client.login(process.env.TOKEN);

// routes/routes.js
const express = require("express");
const cors = require("cors");
const port = 8080;

const app = express();
const router = express.Router();

// Start the Express API server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman) and requests from the allowed origin
      if (!origin || origin === "http://localhost:3000") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (e.g., cookies, HTTP authentication)
  })
);

app.use(router);

const _publicController = require("./api/controllers/_public.js");
const _bot = require("./api/controllers/_bot.js");
const guildController = require("./api/controllers/guildController");

router.get("/", _publicController.getPublicCommands);
router.get("/botstats", _bot.getBotStats);
router.get("/guilds/:guildId", (req, res) =>
  guildController.getGuildInfo(req, res, client)
);

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
