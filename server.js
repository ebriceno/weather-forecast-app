const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Forecast = require('./api/models/apiModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_24fzlm7k:s23et5m2j414a8t2pos9enu00k@ds213755.mlab.com:13755/heroku_24fzlm7k');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./api/routes/apiRoute');
routes(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
