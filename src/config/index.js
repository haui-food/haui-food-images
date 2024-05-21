require('dotenv').config();

const env = {
  port: +process.env.PORT || 3000,
  urlUpload: process.env.URL_UPLOAD,
  tiktokCookie: process.env.TIKTOK_COOKIE,
  maxFileSize: +process.env.MAX_FILE_SIZE || 5,
};

module.exports = env;
