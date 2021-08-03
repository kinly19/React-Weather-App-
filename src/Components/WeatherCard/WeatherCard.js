import { useState, useEffect } from 'react';
import DailyForecast from '../DailyForecast/DailyForecast';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './WeatherCard.scss';

const WeatherCard = () => {

    const [weather, setWeather] = useState(null); //api data object
    const [currentWeather, setCurrentWeather] = useState(null);
    const [weekday, setweekday] = useState(null); //object property - res.forcaste.forecastday[current].date
    const [current, setCurrent] = useState(0);//change the arrays index inside of res.forecast.forecasteday[current] when user selects between different days
    const [showHours, setshowHours] = useState(null);// we will use this to show us the "hour" array inside of res.forecaste.forecasteday[current].hours

    const locationKey = 'London'; //api location

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(weekday); // weekday = res.forecast.forecasteday[current].date. 
    let localtime = new Date(); //we are going to use the local device time for splicing through an array 

    const handleClick = (index) => { //comes from .map
        setCurrent(index);
        setweekday(weather.[index].date);
    }

    useEffect(() => {

        fetch(`http://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=${locationKey}&days=5&aqi=no&alerts=no`) //fetch data from api 

            .then(res => {
                if (!res.ok) {
                    throw Error('Error could not fetch data for that resourse'); //fetch and handle any errors
                };

                return res.json(); //if there are no errors we return json.
            })

            .then((res) => { //we set the weather state by .mapping through our res (api data) and returning our own object(seen below), we only use what we need and not the whole object from api. 
                setWeather(res.forecast.forecastday.map(fcd => {
                    return {
                        date: fcd.date, //our object property values 
                        min: Math.floor(fcd.day.mintemp_c),
                        max: Math.floor(fcd.day.maxtemp_c),
                        avg: Math.floor(fcd.day.avgtemp_c),
                        avghumidity: fcd.day.avghumidity,
                        condition: fcd.day.condition.text,
                        uv: fcd.day.uv,
                        rain: fcd.day.daily_chance_of_rain,
                        snow: fcd.day.daily_chance_of_snow,
                        icon: fcd.day.condition.icon,
                        hourly: fcd.hour,
                        sunrise: fcd.astro.sunrise,
                        sunset: fcd.astro.sunset,
                        moonrise: fcd.astro.moonrise,
                        moonset: fcd.astro.moonset,
                        moonphrase: fcd.astro.moon_phase
                    }
                }))

                setCurrentWeather({ //for current forecast info
                    temp: res.current.temp_c + degreeSign,
                    feelslike: res.current.feelslike_c + degreeSign,
                    humidity: res.current.humidity
                });

                if (d.getDate() === localtime.getDate()) { // using the date from (weekday) we check if the date coming from the api data is the same as present (todays)date 
                    setshowHours(res.forecast.forecastday[current].hour.slice(localtime.getHours())) //for the present day we show hourly forecast from current time onwards
                } else {
                    setshowHours(res.forecast.forecastday[current].hour.slice(0, 24));
                }

                setweekday(res.forecast.forecastday[current].date) //gives us a date value we can pass into d 
            })

    }, [current, weekday]);

    return (
        <div>
            {weather && (

                <div className="w-card">
                    <div className="w-card__main">

                        <div className="cw">{/* currentWeather container top*/}
                            <div className="cw__contentTop">
                                <h1 className="cw__location">London</h1>
                                <div className="cw__contentTd">
                                    <h1 className="cw__currentTemp">{weather[current].max}&#176;C</h1>
                                    <img className="cw__icon" src={`${weather[current].icon}`}></img>
                                </div>

                                <h2 className="cw__condition">{weather[current].condition}</h2>
                                <h2 className="cw__weekday">{days[d.getDay()]} {d.getDay()}/{d.getMonth() + 1}/{d.getFullYear()}</h2>
                                <h2 className="cw__lastUpdate">last updated 07-08-2021 00:15</h2>
                            </div>

                            <div class="cw__contentBottom"> {/* current weather container bottom*/}

                                <div className="cw__info"> {/* inner container*/}
                                    <div className="cw__infoItem">
                                        <h2 className="cw__title"> Max</h2>
                                        <p className="cw__text">{weather[current].max}&#176;C</p>
                                    </div>

                                    <div className="cw__infoItem">
                                        <h2 className="cw__title">Min</h2>
                                        <p className="cw__text">{weather[current].min}&#176;C</p>
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
                                        <p className="cw__text">{weather[current].avghumidity}%</p>
                                    </div>

                                    <div className="cw__infoItem">
                                        <h2 className="cw__title">Feels like</h2>
                                        <p className="cw__text">test</p>
                                    </div>
                                </div>

                                <div className="cw__info">{/* inner container*/}
                                    <div className="cw__infoItem">
                                        <h2 className="cw__title">Sunrise</h2>
                                        <p className="cw__text">{weather[current].sunrise}</p>
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

                        {showHours && (

                            <div className="w-card__slider">

                                {showHours.map((hour, index) => { //we take our array and map through and return template
                                    let d = new Date(hour.time); //we need this to change where d should get its time data from so we can take just the time 
                                    return (
                                        <HourlyForecast
                                            d={d} hourlyTemp={Math.floor(hour.temp_c)}
                                            hourlyFeelTemp={hour.feelslike_c}
                                            hourlyCond={hour.condition.text}
                                            hourlyRain={hour.chance_of_rain}
                                        />
                                    )
                                })}

                            </div>
                        )}

                        <div className="w-card__sCard">
                            {weather.map((map, index) => {

                                let d = new Date(map.date); // map.date = weather.forecast.forecaste[].date
                                const dayName = days[d.getDay()]; // we use the getDay() which would return the index of a day and we use that value to select in our days array what day to show :)

                                return (

                                    <DailyForecast
                                        index={index} //index comes from the .map()
                                        handleClick={handleClick}
                                        dailyIcon={map.icon}
                                        dailyWeekday={dayName}
                                        dailyTemp={Math.floor(map.max)}
                                        dailyMin={Math.floor(map.min)}
                                        dailyRain={map.rain}
                                    />
                                )
                            })}

                        </div>

                    </div>

                </div>
            )}

        </div >
    )

}

export default WeatherCard