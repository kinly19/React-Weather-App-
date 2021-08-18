import './CurrentWeather.scss'

const CurrentWeather = ({ currentWeather, weather, handleCurrentInfo, current, lastUpdated, d }) => {
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

                <div className="cw__info"> {/* inner container*/}
                    <div className="cw__infoItem">
                        <h2 className="cw__title"> Max</h2>
                        <p className="cw__text">{weather[current].max}</p> {/*Weather */}
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Min</h2>
                        <p className="cw__text">{weather[current].min}</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Rain</h2>
                        <p className="cw__text">{weather[current].rain}%</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Snow</h2>
                        <p className="cw__text">{weather[current].snow}%</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">UV</h2>
                        <p className="cw__text">{weather[current].uv}</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Humidity</h2>
                        <p className="cw__text">{handleCurrentInfo("humidity", "avghumidity")}%</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Feels like</h2>
                        <p className="cw__text">{handleCurrentInfo("feelslike", "feelslike")}</p>
                    </div>
                </div>

                <div className="cw__info">{/* inner container*/}
                    <div className="cw__infoItem">
                        <h2 className="cw__title">Sunrise</h2>
                        <p className="cw__text">{weather[current].sunrise}</p> {/*Weather */}
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Sunset</h2>
                        <p className="cw__text">{weather[current].sunset}</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Moonrise</h2>
                        <p className="cw__text">{weather[current].moonrise}</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Moonset</h2>
                        <p className="cw__text">{weather[current].moonset}</p>
                    </div>

                    <div className="cw__infoItem">
                        <h2 className="cw__title">Moon phase</h2>
                        <p className="cw__text">{weather[current].moonphrase}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;