const axios = require("axios");

async function validateLink(link) {
  try {
    const apiEndpoint = `https://urlscan.io/api/v1/scan/`;
    const apiKey = "c0b816c2-b84f-4b8f-9a2b-6b0100ed6bee"; // Replace this with your API key

    const response = await axios.post(
      apiEndpoint,
      { url: link },
      { headers: { "API-Key": apiKey } }
    );
    const scanResultsUrl = response.data.api;

    return scanResultsUrl;
  } catch (error) {
    console.error("Error validating link:", error);
    return null;
  }
}

module.exports = validateLink;
