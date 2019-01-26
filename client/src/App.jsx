import React, { Component } from 'react';
import { Input } from 'antd';
import logo from './assets/logo.svg';
import './styles/App.css';
import CurrentForecast from './components/CurrentForecast';
import DayForecast from './components/DayForecast';
import WeekForecast from './components/WeekForecast';
import cityData from './utils/mock';

class App extends Component {
  constructor(props) {
    super();
    this.props = props;

    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      cityName: '',
      cityData: [],
      weekWeatherList: [],
      dailyWeatherList: [],
      selectedDay: '',
    };

    this.onSearch = this.onSearch.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
  }


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  onSearch(value) {
    const cityd = cityData.filter(cityData => cityData.city.name === value);
    console.log(cityd);

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

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    const Search = Input.Search;
    const { cityData, selectedDay } = this.state;
    let rawCityData;
    let weeklyWeather;
    let dailyWeather;

    if(cityData.length > 0) {
      rawCityData= cityData[0];
      weeklyWeather = rawCityData.list.filter(item => item.dt_txt.includes('00:00:00'));

      if(selectedDay !== '') {
        dailyWeather = rawCityData.list.filter(item => item.dt_txt.includes(selectedDay));
      }
    }

    return (
      <div className="App">
        { /* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p> */}

        <Search
          placeholder="Enter city name"
          onSearch={value => this.onSearch(value)}
          style={{ width: 200 }}
        />

        { cityData.length > 0 ?
          (
            <div>
              <CurrentForecast
                cityName={rawCityData.city.name}
                countryCode={rawCityData.city.country}
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
