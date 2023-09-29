const analyzeURL = require("../../utils/analyzeLinks");
const analyzeFile = require("../../utils/analyzeFile");

module.exports = async (client, message) => {
  if (
    (!message.content.match(/(https?:\/\/[^\s]+)/g) &&
      message.attachments.size === 0) ||
    message.author.bot ||
    message.content.includes("png") ||
    message.content.includes("jpg") ||
    message.content.includes("gif")
  ) {
    return;
  }

  try {
    const urls = message.content.match(/(https?:\/\/[^\s]+)/g) || [];
    const attachments = Array.from(message.attachments.values());

    const fetch = (await import("node-fetch")).default;

    const files = attachments.map((attachment) => ({
      name: attachment.name,
      file: fetch(attachment.url).then((response) => response.arrayBuffer()),
    }));

    for (const url of urls) {
      await analyzeURL(url, message);
    }

    for (const file of files) {
      await analyzeFile(file, message);
    }
  } catch (error) {
    console.log(error);
  }
};
