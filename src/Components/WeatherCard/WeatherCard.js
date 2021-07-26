import { useState, useEffect } from 'react';
import './WeatherCard.scss';

const WeatherCard = () => {

    //
    const [weather, setWeather] = useState(null); //api data object
    const [weekday, setweekday] = useState(null); //object properties - weather.forcaste.forecastday[current].date
    const [condition, setCondition] = useState(null)
    const [icon, setIcon] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [rain, setRain] = useState(null);


    const [current, setCurrent] = useState(0);//change the array index inside of weather.forecast.forecasteday[current] when user selects between different days



    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(weekday); // weekday = weather.forecast.forecaste[current].date

    const handleClick = (index) => {
        setCurrent(index);
        setweekday(weather.forecast.forecastday[index].date);

    }

    useEffect(() => {

        fetch('http://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=London&days=5&aqi=no&alerts=no')
            .then(res => {
                if (!res.ok) {
                    throw Error('Error could not fetch data for that resourse'); //fetch and handle any errors
                };

                return res.json(); //if there are no errors we return json.
            })
            .then((data) => { //take the data from api url and set it to our weather state setWeather
                setWeather(data)
                console.log(data)
                setweekday(data.forecast.forecastday[current].date);
                setCondition(data.forecast.forecastday[current].day.condition.text);
                setIcon(data.forecast.forecastday[current].day.condition.icon);
                setMaxTemp(data.forecast.forecastday[current].day.maxtemp_c)
                setRain(data.forecast.forecastday[current].day.daily_chance_of_rain)
                console.log(weekday)

            })

    }, [current])


    return (
        <div>
            {weather && (

                <div className="w-card">
                    <div className="w-card__main">

                        <div className="w-card__current">

                            <div className="w-card__currentInfo1">
                                <h2 className="w-card__Location">{weather.location.name}</h2>
                                <img className="w-card__icon" src={`${icon}`}></img>
                                <p className="w-card__Condition">{condition}</p>
                                <h1 className="w-card__Temp">{maxTemp} &#8451;</h1>
                            </div>

                            <div className="w-card__currentInfo2">
                                <h1 className="w-card__Day">{days[d.getDay()]}</h1>
                                <p className="w-card__Date">{d.getDay()}/{d.getMonth() + 1}/{d.getFullYear()} </p>
                                <p className="w-card__maxTemp">Chance of rain {rain}%</p>
                            </div>

                        </div>

                        <div className="w-card__slider" >
                            {weather.forecast.forecastday[current].hour.map((hour, index) => {
                                let d = new Date(hour.time);
                                return (
                                    <div className="w-card__hourInfo" key={index}>  {/* style={{ transform: `translateX(${x}px)` }} */}

                                        <h2 className="w-card__hour">{d.getHours()}:00</h2>
                                        <h3 className="w-card__temp">{hour.temp_c}&#8451;</h3>

                                        <p className="w-card__text">{hour.condition.text}</p>
                                        <p className="w-card__rain">Rain {hour.chance_of_rain} %</p>
                                    </div>
                                )
                            })}
                            {/* <button className="w-card__btn w-card__btn--right" onClick={handleRightClick}>right</button>
                            <button className="w-card__btn w-card__btn--left" onClick={handleLeftClick}>left</button> */}
                        </div>

                        <div className="w-card__sCard">
                            {weather.forecast.forecastday.map((map, index) => {

                                let d = new Date(map.date); // map.date = weather.forecast.forecaste[].date
                                const dayName = days[d.getDay()]; // we use the getDay() which would return the index of a day and we use that value to select in our days array what day to show :)

                                return (

                                    <div className="w-card__sContent" key={index} onClick={() => (handleClick(index))}>

                                        <img className="w-card__sIcon" src={`${map.day.condition.icon}`} alt="weather icon" />
                                        <h2 className="w-card__sTitle">{dayName}</h2>

                                        <div className="w-card__sInfo">
                                            <p className="w-card__sInfoContent">{map.day.mintemp_c}&#8451;</p>
                                            <p className="w-card__sInfoContent">{map.day.maxtemp_c}&#8451;</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default WeatherCard