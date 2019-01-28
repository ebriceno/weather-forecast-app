import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { WiCelsius } from 'weather-icons-react';
import { forecastIcons } from '../utils/forecastIcons';
import { forecastIconsSmall } from '../utils/forecastIcons.jsx';

const DayForecast = (props) => {
  const {
    weatherDayList,
  } = props;

  const weatherDayListWidget = weatherDayList.map(info => (
    <div className={'day-widget-item'} key={info.dt} title={(info.weather[0].description)}>
      <div className={'date'}>
        <div>{moment(info.dt_txt).format('LT')}</div>
      </div>
      <div className={'main-icon'}>
        {forecastIconsSmall[info.weather[0].description] || forecastIconsSmall['default']}
      </div>
      <div className={'temp'}>
        <div className={'temp'}>{`${Math.round(info.main.temp)}`}</div>
        <WiCelsius size={32}/>
      </div>
    </div>
  ));

  return (
    <>
      <h4>{`Hourly weather forecast for ${moment(weatherDayList[0].dt_txt).format('dddd MMM Do')}`}</h4>
      <div className={'day-widget-container'}>
        {weatherDayListWidget}
      </div>
    </>
  );
};

DayForecast.propTypes = {
  weatherDayList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DayForecast;
