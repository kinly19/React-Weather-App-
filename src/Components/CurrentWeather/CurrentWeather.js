import './CurrentWeather.scss'
import CurrentWeatherItems from './CurrentWeatherItems';

const CurrentWeather = ({ currentWeather, weather, current, d, onLastUpdate, localtime, onToday}) => {
  
  const currentWeatherArr = Object.entries(weather[current]);//turn currentWeather into an array 
  const weatherList1 = currentWeatherArr.slice(0, 7)
  const weatherList2 = currentWeatherArr.slice(7, 12)
  const lastUpdate = new Date(onLastUpdate); //show last updated time and date from res.current.last_updated

  const handleCurrentInfo = (currentForecastValue, dailyForecastValue) => {
    //return either current forecast value or value from forecastday[current]
    if (d.getDay() === localtime.getDay()) {
      onToday(true);
      return currentWeather[currentForecastValue];//bracket notation when passing in object names currentWeather["humidity"]
    } else {
      onToday(false);
      return weather[current][dailyForecastValue];
    };
  };

  return (
    <div className="cw"> {/* currentWeather container top*/}
      <div className="cw__contentTop">
        <h1 className="cw__location">{currentWeather.locationName}</h1>
        <p className="cw__region">{currentWeather.region}</p>

        <div className="cw__contentTd">
          <h1 className="cw__currentTemp">
            {handleCurrentInfo("temp", "max")}
          </h1>
          <img
            className="cw__icon"
            src={`${weather[current].icon}`}
            alt="weather-icon"
          ></img>
        </div>

        <h2 className="cw__condition">{weather[current].condition}</h2>
        <h2 className="cw__weekday">{d.toDateString()}</h2>
        <h2 className="cw__lastUpdate">
          Last updated {lastUpdate.toUTCString()}
        </h2>
      </div>

      <div className="cw__contentBottom"> {/* current weather container bottom*/}
        <div className="cw__info">
          {weatherList1.map((currentInfo) => (
            <CurrentWeatherItems
              title={currentInfo[0]}
              info={currentInfo[1]}
              onCurrentInfo={handleCurrentInfo}
            />
          ))}
        </div>
        <div className="cw__info">
          {weatherList2.map((currentInfo) => (
            <CurrentWeatherItems
              title={currentInfo[0]}
              info={currentInfo[1]}
              onCurrentInfo={handleCurrentInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );  
}

export default CurrentWeather;