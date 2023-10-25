const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
const PORT = 3001;


app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Shopping List",
  });
});

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});