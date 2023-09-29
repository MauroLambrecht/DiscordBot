const {
  Client,
  CommandInteraction,
  WebhookClient,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "sudo",
  description: "Execute a command as another user",
  options: [
    {
      name: "user",
      description: "The user to execute the command as",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "text",
      description: "Text",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  callback: async (client, interaction) => {
    const user = interaction.options.getUser("user");
    const command = interaction.options.getString("text");

    console.log("User:", user);
    console.log("Command:", command);

    const channel = interaction.channel;
    const webhooks = await channel.fetchWebhooks();
    let webhook = webhooks.find((wh) => wh.token);

    if (!webhook) {
      webhook = await channel.createWebhook({
        name: user.username,
        avatar: user.displayAvatarURL({ dynamic: true }),
      });
    }

    console.log("Webhook:", webhook);

    await webhook.send(command, {
      username: user.username,
      avatarURL: user.displayAvatarURL({ dynamic: true }),
    });

    console.log("Command sent via webhook");

    setTimeout(async () => {
      await webhook.delete();
      console.log("Webhook deleted");
    }, 3000);

    await interaction.reply({
      content: "Command executed as " + user.tag,
      ephemeral: true,
    });
    console.log("Interaction reply sent");
  },
};
