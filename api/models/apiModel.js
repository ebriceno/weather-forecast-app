const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForecastSchema = new Schema({
  id: Number,
  name: String,
  country: String,
  list: [{
    dt: Number,
    dt_txt: Date,
    main: {
      temp: Number,
      temp_min: Number,
      temp_max: Number,
      humidity: Number,
    },
    weather:[
      {
        description: String,
      },
    ],
  }],
});

module.exports = mongoose.model('Forecast', ForecastSchema);
