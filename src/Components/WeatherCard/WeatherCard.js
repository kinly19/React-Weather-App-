import { useState, useEffect } from 'react';
import CurrentWeather from '../CurrentWeather';
import DailyForecastSm from '../DailyForecastSm/DailyForecastSm';
import Footer from '../Footer';
import Form from '../Form/Form';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './WeatherCard.scss';

const WeatherCard = () => {

    const [weather, setWeather] = useState(null); //api data object for daily forecaste
    const [currentWeather, setCurrentWeather] = useState(null);//api data object for current forecast
    const [weekday, setweekday] = useState(null); //object property - res.forcaste.forecastday[current].date
    const [lastUpdate, setLastUpdate] = useState(null) //show last updated time and date from res.current.last_updated
    const [current, setCurrent] = useState(0);//change the arrays index inside of res.forecast.forecasteday[current] when user selects between different days
    const [showHours, setshowHours] = useState(null);// we will use this to show us the "hour" array inside of res.forecaste.forecasteday[current].hours

    const [locationKey, setLocationKey] = useState('London');//api location
    const [inputValue, setInputValue] = useState('');//this will take the users input value to setLocationKey(inputValue)
    const degreeSign = '\u00B0' + "C" //unicode symbol
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(weekday); // weekday = res.forecast.forecasteday[current].date. 
    let localtime = new Date(); //we are going to use the local device time for splicing through an array
    let lastUpdated = new Date(lastUpdate);

    const [error, setError] = useState(null); //use this to output any errors to user

    const handleClick = (index) => { //index comes from .map
        setCurrent(index);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLocationKey(inputValue);
        setInputValue("")//so form input value reverts back to blank
    }

    const handleCurrentInfo = (currentVal, value) => { //return either current property values from api or values from forecastday[current]
        if (d.getDay() === localtime.getDay()) {
            return currentWeather[currentVal];
        } else {
            return weather[current][value];
        }
    };

    const ScrollToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => { //useEffect for api call, locationKey as dependency to re-render api call when changed

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=${locationKey}&days=5&aqi=no&alerts=no`) //fetch data from api 

            .then(res => {
                if (!res.ok) {
                    throw Error('Error could not fetch data for that resourse'); //fetch and handle any errors
                };
                return res.json(); //if there are no errors we return json.
            })

            .then((res) => { //we set the weather state by .mapping through our res (api data) and returning our own object(seen below), we only use what we need and not the whole object from api. 
                setError(null)
                setWeather(res.forecast.forecastday.map(fcd => { //daily weather info
                    return {
                        date: fcd.date, //our object property values 
                        min: Math.floor(fcd.day.mintemp_c) + degreeSign,
                        max: Math.floor(fcd.day.maxtemp_c) + degreeSign,
                        avg: Math.floor(fcd.day.avgtemp_c) + degreeSign,
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
                        moonphrase: fcd.astro.moon_phase,
                        feelslike: "N/A"
                    }
                }))

                setCurrentWeather({ //for current forecast info
                    temp: res.current.temp_c + degreeSign,
                    feelslike: res.current.feelslike_c + degreeSign,
                    humidity: res.current.humidity,
                    lastupdate: res.current.last_updated,
                    country: res.location.country,
                    locationName: res.location.name,
                    region: res.location.region,
                })
            })

            .catch(err => { //catch any error
                setError(err.message);
            });

    }, [locationKey]);

    useEffect(() => { //serperate useEffect to set and update our states without rendering api call again.

        if (weather && currentWeather) {

            if (d.getDate() === localtime.getDate()) { // using the date from (weekday) we check if the date coming from the api data is the same as present (todays)date 
                setshowHours(weather[current].hourly.slice(localtime.getHours())) //for the present day we show hourly forecast from current time onwards
            } else {
                setshowHours(weather[current].hourly.slice(0, 24));
            }

            setweekday(weather[current].date); //gives us a date value we can pass into d 
            setLastUpdate(currentWeather.lastupdate);
        }

    }, [weather, currentWeather, current, weekday]);

    return (

        <div className="w-card">
            <div className="w-card__form">
                <Form
                    handleSubmit={handleSubmit}
                    error={error}
                    inputValue={inputValue}
                    weather={weather}
                    setInputValue={setInputValue}
                />
            </div>
            {weather, currentWeather && (
                <div className="w-card__main">

                    <CurrentWeather
                        currentWeather={currentWeather}
                        weather={weather}
                        handleCurrentInfo={handleCurrentInfo}
                        current={current}
                        lastUpdated={lastUpdated}
                        d={d}
                    />

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

                    <div className="w-card__sCard" onClick={ScrollToTop}>
                        {weather.map((map, index) => {

                            let d = new Date(map.date); // map.date = weather.forecast.forecaste[].date
                            const dayName = days[d.getDay()]; // we use the getDay() which would return the index of a day and we use that value to select in our days array what day to show :)

                            return (

                                <DailyForecastSm
                                    index={index} //index comes from the .map()
                                    handleClick={handleClick}
                                    dailyIcon={map.icon}
                                    dailyWeekday={dayName}
                                    avgTemp={map.avg}
                                    dailyTemp={map.max}
                                    dailyMin={map.min}
                                    dailyRain={map.rain}
                                />
                            )
                        })}

                    </div>

                </div>
            )}

            <Footer />
        </div>


    )

}

export default WeatherCard