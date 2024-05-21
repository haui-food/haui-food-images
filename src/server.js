const cors = require('cors');
const xss = require('xss-clean');
const express = require('express');
const compression = require('compression');

const env = require('./config');
const uploadImage = require('./api');
const limiter = require('./middlewares/limiter.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(xss());
app.use(cors());
app.use(compression());
app.use(express.json());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Service image for HaUI Food');
});

app.use('/api/v1', limiter, uploadImage);

app.all('*', (req, res) => {
  return res.status(404).send({
    status: 404,
    message: 'Not found.',
  });
});

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Example app listening on port ${env.port}`);
});
