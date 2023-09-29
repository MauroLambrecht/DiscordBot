const nsfwjs = require("nsfwjs");
const jimp = require("jimp");
const { createCanvas, loadImage } = require("canvas");

// Load the NSFW model
async function loadModel() {
  return nsfwjs.load();
}

// Function to load an image using jimp and convert it to compatible format
async function loadImageAndConvert(imageUrl) {
  const image = await jimp.read(imageUrl);
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  // Create a canvas and draw the image on it
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(image.bitmap.data);
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

// Function to detect NSFW content in an image
async function detectNSFW(imageUrl) {
  try {
    const model = await loadModel();

    const canvas = await loadImageAndConvert(imageUrl);
    const predictions = await model.classify(canvas);

    return predictions.find(
      (prediction) =>
        prediction.className === "Porn" ||
        prediction.className == "Hentai" ||
        prediction.className == "Sexy"
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  detectNSFW,
};
