const express = require('express');
const app = express();
const PORT = 3001;
const api = require('./api/items');

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Shopping List",
  });
});
app.use('/api', api);

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`);
  });