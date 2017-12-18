const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('port', process.env.PORT || 5000);

const TOKEN = process.env.ACCESS_TOKEN || config.get('access_token');

app.use(express.static(path.resolve(__dirname, '../client/build')));


// Add a random delay to all requests.
// Set SHOULD_DELAY to false for a more responsive server.
const SHOULD_DELAY = true;
const RANGE = [250, 2000];
app.use((req, res, next) => {
  if (SHOULD_DELAY) {
    const delay = Math.random() * (RANGE[1] - RANGE[0]) + RANGE[0];
    const start = Date.now();
    while (Date.now() - start < delay) {}
  }
  next();
});

app.get('/api', function (req, res) {
  res.send({"message":"Aerolab's Coding Challenge 2017"});
});

app.post('/api/auth', function (req, res) {
  // simulate getting data from database;
  const USERNAME = process.env.USERNAME || config.get('creds.username');
  const PASSWORD = process.env.PASSWORD || config.get('creds.password');
  const data = req.body;

  if (!data) return res.sendStatus(400);

  if (data.username === USERNAME && data.password === PASSWORD) {
    res.status(200).send({"accessToken": TOKEN});
  } else {
    res.status(401).send({"message": "Invalid credentials"});
  }
});

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log('Server app is running on port', app.get('port'));
});

