const axios = require('axios');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const fetchImage = async (imageUrl) => {
  let imageBuffer = null;

  try {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      imageBuffer = Buffer.from(response.data, 'binary');
    } else if (imageUrl.startsWith('data:image')) {
      const base64Data = imageUrl.split(';base64,').pop();

      imageBuffer = Buffer.from(base64Data, 'base64');
    }
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid image URL.');
  }

  return imageBuffer;
};

module.exports = fetchImage;
