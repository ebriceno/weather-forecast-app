import React, { Component } from 'react';
import { AutoComplete, Spin } from 'antd';
import './styles/App.css';
import CurrentForecast from './components/CurrentForecast';
import DayForecast from './components/DayForecast';
import WeekForecast from './components/WeekForecast';

class App extends Component {
  constructor(props) {
    super();
    this.props = props;

    this.state = {
      forecastData: '',
      cities: [],
      filteredCities: [],
      cityName: '',
      cityData: [],
      weekWeatherList: [],
      dailyWeatherList: [],
      selectedDay: '',
      loading: true,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount() {
    this.makeRequest();

    this.interval = setInterval(() =>
      this.makeRequest(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  makeRequest() {
    this.callApi()
      .then(res => this.setState({
        loading: false,
        forecastData: res,
        cities: res.map(city => `${city.name} (${city.country})`),
      },))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/forecast');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSelect(value) {
    const cityd = this.state.forecastData.filter(
      item => item.name.toLowerCase() === value.split(' (')[0].toLowerCase()
    );

    this.setState({
      cityName: value,
      cityData: cityd || [],
    });
  }

  onDaySelect(val) {
    this.setState({
      selectedDay: val,
    });
  }

  handleSearch(value) {
    const { cities: currentCities } = this.state;
    this.setState({
      filteredCities: currentCities.filter(item => item.includes(value))
    });
  }

  render() {
    const { cityData, selectedDay, loading } = this.state;

    if (loading) {
      return (
        <div className="App">
          <header className="App-header">
            <Spin />
          </header>
        </div>
      );
    }

    let rawCityData;
    let weeklyWeather;
    let dailyWeather;

    if(cityData.length > 0) {
      rawCityData= cityData[0];
      weeklyWeather = rawCityData.list.filter(item => item.dt_txt.includes('00:00:00'));

      if(selectedDay !== '') {
        dailyWeather = rawCityData.list.filter(item => item.dt_txt.includes(selectedDay.split('T')[0]));
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <AutoComplete
            dataSource={this.state.filteredCities || this.state.cities}
            style={{ width: 200 }}
            onSelect={value => this.handleSelect(value)}
            onSearch={value => this.handleSearch(value)}
            placeholder="Enter city name"
          />
          <span className={'city-count'}>{`Count: ${this.state.cities.length}`}</span>
        </header>
        { cityData.length > 0 ?
          (
            <div>
              <CurrentForecast
                cityName={rawCityData.name}
                countryCode={rawCityData.country}
                currentWeather={rawCityData.list[0]}
              />
              <WeekForecast
                weatherList={weeklyWeather}
                onDaySelect={this.onDaySelect}
              />
            </div>
          ) : null
        }
        { selectedDay !== '' ? <DayForecast weatherDayList={dailyWeather}/> : null}
      </div>
    );
  }
}
export default App;
