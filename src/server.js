const express = require('express');

const env = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(env.port, () => {
  console.log(`Example app listening on port ${env.port}`);
});
