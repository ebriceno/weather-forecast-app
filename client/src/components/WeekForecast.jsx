import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { WiCelsius, WiHumidity } from 'weather-icons-react';
import { forecastIcons } from '../utils/forecastIcons.jsx';

const WeekForecast = (props) => {
  const {
    weatherList,
    onDaySelect,
  } = props;

  const weatherListWidget = weatherList.map(info => (
    <div className={'week-widget-item'} key={info.dt} onClick={() => onDaySelect(info.dt_txt.split(' ')[0])}>
      <div className={'date'}>
        <div className={'weekday'}>{moment(info.dt_txt).format('dddd')}</div>
        <div className={'weekdate'}>{moment(info.dt_txt).format("MMM Do")}</div>
      </div>
      <div className={'main-icon'} title={info.weather[0].description}>
        <span>{forecastIcons[info.weather[0].description] || forecastIcons['default']}</span>
      </div>
      <div className={'extra-info'}>
        <div className={'temp'}>
          <span>{'Temp.'}</span>
          <div className={'max'}>{`${Math.round(info.main.temp_max)}`}<WiCelsius size={36}/></div>
          <div className={'min'}>{`Low ${Math.round(info.main.temp_min)}`}<WiCelsius size={22}/></div>
        </div>
        <div className={'humidity'}>
          <span>{'Humidity'}</span>
          <div className={'hum'}>{`${info.main.humidity}`}<WiHumidity size={32}/></div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <h3 className={'weekly-title'}>{`${weatherListWidget.length} day weather forecast`}</h3>
      <div className={'week-widget-container'}>
        {weatherListWidget}
      </div>
    </>
  );
};

WeekForecast.propTypes = {
  weatherList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDaySelect: PropTypes.func.isRequired,
};

export default WeekForecast;
