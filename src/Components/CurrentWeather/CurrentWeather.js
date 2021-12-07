import './CurrentWeather.scss'
import CurrentWeatherItems from './CurrentWeatherItems';

const CurrentWeather = ({ currentWeather, weather, current, d, onLastUpdate, localtime, onToday}) => {
  
  const weatherArrayList = Object.entries(weather[current]);//turn currentWeather into an array 
  const weatherList1 = weatherArrayList.slice(0, 7);
  const weatherList2 = weatherArrayList.slice(7, 12);

  const lastUpdate = new Date(onLastUpdate).toUTCString(); //show last updated time and date from res.current.last_updated
  const date = d.toDateString();
  const currentWeatherInfo = d.getDay() === localtime.getDay();
  let temperature;

  if (currentWeatherInfo){
    temperature = currentWeather.temp
    onToday(true);
  } else {
    temperature = weather[current].max
    onToday(false);
  };

  return (
    <div className="cw"> {/* currentWeather container top*/}
      <div className="cw__contentTop">
        <h1 className="cw__location">{currentWeather.locationName}</h1>
        <p className="cw__region">{currentWeather.region}</p>

        <div className="cw__contentTd">
          <h1 className="cw__currentTemp">
            {temperature}
          </h1>
          <img
            className="cw__icon"
            src={`${weather[current].icon}`}
            alt="weather-icon"
          ></img>
        </div>

        <h2 className="cw__condition">{weather[current].condition}</h2>
        <h2 className="cw__weekday">{date}</h2>
        <h2 className="cw__lastUpdate">
          Last updated {lastUpdate}
        </h2>
      </div>

      <div className="cw__contentBottom"> {/* current weather container bottom*/}
        <div className="cw__info">
          {weatherList1.map((currentInfo, index) => (
            <CurrentWeatherItems
              key={index}
              title={currentInfo[0]}
              info={currentInfo[1]}
            />
          ))}
        </div>
        <div className="cw__info">
          {weatherList2.map((currentInfo, index) => (
            <CurrentWeatherItems
              key={index}
              title={currentInfo[0]}
              info={currentInfo[1]}
            />
          ))}
        </div>
      </div>
    </div>
  );  
}

export default CurrentWeather;