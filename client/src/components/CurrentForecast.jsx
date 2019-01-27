import PropTypes from 'prop-types';
import React from 'react';
import { WiCelsius } from 'weather-icons-react';
import { forecastIcons } from '../utils/forecastIcons';

const CurrentForecast = (props) => {
  const {
    cityName,
    countryCode,
    currentWeather,
  } = props;

  const {
    temp,
  } = currentWeather.main;

  const details = (
    <div className={'current-widget'}>
      <h2>{`Current weather in ${cityName}, ${countryCode}`}</h2>
      <div className={'current-widget-info'}>
        <div>{forecastIcons[currentWeather.weather[0].description]}</div>
        <div className={'temp'}><span>{`${Math.round(temp)}`}</span><WiCelsius size={36}/></div>
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
