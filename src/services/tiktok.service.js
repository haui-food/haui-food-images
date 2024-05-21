const axios = require('axios');
const FormData = require('form-data');

const env = require('../config');
const sanitizeCookies = require('../utils/sanitize-cookie');

const cookie = sanitizeCookies(env.tiktokCookie);

function generateRandomString() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return randomString;
}

const uploadImage = async (imageBuffer, imageExt) => {
  const formData = new FormData();
  formData.append('Filedata', imageBuffer, {
    filename: generateRandomString() + imageExt,
    contentType: 'image/jpeg',
  });

  const headers = {
    dnt: '1',
    cookie,
    accept: '*/*',
    priority: 'u=1, i',
    'sec-fetch-mode': 'cors',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-site': 'same-origin',
    origin: 'https://ads.tiktok.com',
    'sec-ch-ua-platform': '"Windows"',
    'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
    'x-csrftoken': 'v721HCeikPdyf4vjwT6aihVbClSi3q3T',
    'sec-ch-ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
    ...formData.getHeaders(),
  };

  const response = await axios.post(env.urlUpload, formData, {
    headers,
  });

  return response.data;
};

module.exports = uploadImage;
