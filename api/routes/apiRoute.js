module.exports = function(app) {
  const forecast = require('../controllers/apiController');

  app.route('/forecast')
    .get(forecast.listAllForecast)
    .post(forecast.createForecast)
    .delete(forecast.deleteAllForecast);

  app.route('/forecasts/:cityId')
    .get(forecast.getCityForecast);
};
