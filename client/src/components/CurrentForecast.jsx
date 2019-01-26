import PropTypes from 'prop-types';
import React from 'react';

const CurrentForecast = (props) => {
  const {
    cityName,
    countryCode,
    currentWeather,
  } = props;

  const {
    temp,
    humidity,
  } = currentWeather.main;

  const sky = currentWeather.weather[0].description;

  const details = (
    <div>
      <h2>{`Weather in ${cityName}, ${countryCode}`}</h2>
      <h3>{sky}</h3>
      <div>
        <p>{`Temperature: ${Math.round(temp)}`}</p>
        <p>{`Humidity: ${humidity}`}</p>
      </div>
    </div>
  );

  return (
    <div className="upload-widget-container">
      {details}
    </div>
  );
};

CurrentForecast.propTypes = {
  cityName: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentWeather: PropTypes.shape({}).isRequired,
};

export default CurrentForecast;
