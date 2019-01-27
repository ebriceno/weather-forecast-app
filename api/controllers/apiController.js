const mongoose = require('mongoose');
const Forecast = mongoose.model('Forecast');

exports.listAllForecast = function(req, res) {
  Forecast.find({}, function (err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};

exports.createForecast = function(req, res) {
  const newForecast = new Forecast(req.body);
  newForecast.save(function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};

exports.deleteAllForecast = function(req, res) {
  Forecast.deleteMany({}, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Forecast data successfully deleted' });
  });
};

exports.getCityForecast = function(req, res) {
  console.log(req.params);
  Forecast.find({ id: req.params.cityId }, function(err, item) {
    if (err)
      res.send(err);
    res.json(item);
  });
};
