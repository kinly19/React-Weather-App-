import './CurrentWeather.scss'
import CurrentWeatherItems from './CurrentWeatherItems';

const CurrentWeather = ({ currentWeather, weather, handleCurrentInfo, current, lastUpdated, d }) => {
  
  const currentWeatherArr = Object.entries(weather[current]);//turn currentWeather into an array 
  const weatherList1 = currentWeatherArr.slice(0, 7)
  const weatherList2 = currentWeatherArr.slice(7, 12)

    return (
        <div className="cw">{/* currentWeather container top*/}
            <div className="cw__contentTop">
                <h1 className="cw__location">{currentWeather.locationName}</h1> {/* currentWeather */}
                <p className="cw__region">{currentWeather.region}</p>{/* currentWeather */}
                <div className="cw__contentTd">
                    <h1 className="cw__currentTemp">{handleCurrentInfo("temp", "max")}</h1>
                    <img className="cw__icon" src={`${weather[current].icon}`} alt="weather-icon"></img> {/*Weather */}
                </div>

                <h2 className="cw__condition">{weather[current].condition}</h2>{/*Weather */}
                <h2 className="cw__weekday">{d.toDateString()}</h2>
                <h2 className="cw__lastUpdate">Last updated {lastUpdated.toUTCString()}</h2>
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

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Rain</h2>
                        <p className="cw__text">{weather[current].rain}%</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Snow</h2>
                        <p className="cw__text">{weather[current].snow}%</p>
                    </div>
    );
}

export default CurrentWeather;