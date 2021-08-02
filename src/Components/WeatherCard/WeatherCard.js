import { useState, useEffect } from 'react';
import DailyForecast from '../DailyForecast/DailyForecast';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './WeatherCard.scss';

const WeatherCard = () => {

    const [weather, setWeather] = useState(null); //api data object
    const [weekday, setweekday] = useState(null); //object property - res.forcaste.forecastday[current].date
    const [current, setCurrent] = useState(0);//change the arrays index inside of res.forecast.forecasteday[current] when user selects between different days
    const [showHours, setshowHours] = useState(null);// we will use this to show us the "hour" array inside of res.forecaste.forecasteday[current].hours

    const locationKey = 'London'; //api location

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(weekday); // weekday = res.forecast.forecasteday[current].date. 

    let localtime = new Date(); //we are going to use the local device time for splicing through an array 

    const handleClick = (index) => {
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
                        min: fcd.day.mintemp_c,
                        max: fcd.day.maxtemp_c,
                        avg: fcd.day.avgtemp_c,
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
                        moonset: fcd.astro.moonset
                    }
                }))

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
                        <div className="w-card__current">
                            <div className="w-card__currentInfo1">
                                <h2 className="w-card__Location">{locationKey}</h2>
                                <img className="w-card__icon" src={`${weather[current].icon}`}></img>
                                <p className="w-card__Condition">{weather[current].condition}</p>
                                <h1 className="w-card__Temp">{weather[current].max} &#8451;</h1>
                            </div>

                            <div className="w-card__currentInfo2">
                                <h1 className="w-card__Day">{days[d.getDay()]}</h1>
                                <p className="w-card__Date">{d.getDay()}/{d.getMonth() + 1}/{d.getFullYear()} </p>
                                <p className="w-card__maxTemp">Chance of rain {weather[current].rain}%</p>
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