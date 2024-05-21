const path = require('path');
const express = require('express');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const uploadImage = require('../services/tiktok.service');
const upload = require('../middlewares/multer.middleware');
const fetchImage = require('../services/fetch-image.service');

const uploadRoute = express.Router();

uploadRoute.post('/uploads', upload.single('image'), async (req, res, next) => {
  try {
    let imageFile, imageBuffer;
    const { imageUrl } = req.body;
    let imageExt = path.extname(req.file?.originalname || '.jpg').toLowerCase();

    if (req.file) {
      imageFile = req.file.buffer;
    }

    if (!imageFile && !imageUrl) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No image file or image URL provided.');
    }

    if (imageFile) imageBuffer = imageFile;
    else if (imageUrl) imageBuffer = await fetchImage(imageUrl);
    else throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid image URL.');

    const response = await uploadImage(imageBuffer, imageExt);

    if (response.code) {
      throw new ApiError(httpStatus.BAD_REQUEST, response.msg);
    }

    res.send({
      code: httpStatus.OK,
      message: 'Uploaded successfully to TikTok.',
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = uploadRoute;
