const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Forecast = require('./api/models/apiModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Forecastdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./api/routes/apiRoute');
routes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
