import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { forecastIcons } from '../utils/forecastIcons';
import { forecastIconsSmall } from '../utils/forecastIcons.jsx';

const DayForecast = (props) => {
  const {
    weatherDayList,
  } = props;

  console.log('DL', weatherDayList);

  const weatherDayListWidget = weatherDayList.map(info => (
    <div className={'day-widget-item'} key={info.dt}>
      <div className={'date'}>
        <div>{moment(info.dt_txt).format('LT')}</div>
      </div>
      {forecastIconsSmall[info.weather[0].description]}
      {(info.weather[0].description)}
      <div className={'temp'}>
        <div className={'temp'}>{`${Math.round(info.main.temp)}`}</div>
      </div>
    </div>
  ));

  return (
    <div className={'day-widget-container'}>
      {weatherDayListWidget}
    </div>
  );
};

DayForecast.propTypes = {
  weatherDayList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DayForecast;
