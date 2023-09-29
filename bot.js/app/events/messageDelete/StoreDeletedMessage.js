const { Client, Message } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message, channel) => {
  client.snipes = new Map();
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
};
