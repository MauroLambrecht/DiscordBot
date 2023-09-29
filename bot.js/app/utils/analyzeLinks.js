const apiKey =
  "69d297fc26e6a7f4e1ca43c8d53873017f47001ac669d8b37c41ac8f0136d4bd";

async function analyzeURL(url, message) {
  const scanResult = await scanURL(url);

  if (scanResult.esPeligrosa) {
    message.reply(`
    The URL "${url}" can be dangerous, be careful.`);
  } else {
    message.reply(`The URL "${url}" is safe.`);
  }
}

async function scanURL(url) {
  const apiUrl = `https://www.virustotal.com/vtapi/v2/url/report?apikey=${apiKey}&resource=${url}`;

  const fetch = (await import("node-fetch")).default;
  const response = await fetch(apiUrl);
  const data = await response.json();

  const esPeligrosa = data.positives > 0;

  return {
    esPeligrosa,
    scanDate: new Date(data.scan_date),
    scanId: data.scan_id,
    totalScans: data.total,
    positives: data.positives,
  };
}

module.exports = analyzeURL;
