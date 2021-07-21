import { useState, useEffect } from 'react';
import './WeatherCard.scss';

const WeatherCard = () => {

    const [weather, setWeather] = useState(null);
    const [current, setCurrent] = useState(0);
    const [weekday, setweekday] = useState("");

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(weekday); // weekday = weather.forecast.forecaste[].date
    // const dayName = days[d.getDay()]; // we use the getDay() which would return the index of a day and we use that value to selete in our days array what day to show :)

    const handleClick = (index) => {
        setCurrent(index);
        setweekday(weather.forecast.forecastday[current].date);
    }

    useEffect(async () => {

        const respon = await fetch('http://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=London&days=5&aqi=no&alerts=no');
        const data = await respon.json();

        setWeather(data);
        setweekday(data.forecast.forecastday[current].date); //use the value inside of current to choose which index values we want to use inside of forecastday.date 
        console.log('effect called')

    }, [])

    return (
        <div>
            {weather && (
                <div className="w-card">

                    <h1 className="w-card__title">3 day Weather forecast</h1>

                    <div className="w-card__main">
                        <div className="w-card__leftContent">

                            <img src={`${weather.forecast.forecastday[current].day.condition.icon}`}></img>
                            {/* <h1>{weather.forecast.forecastday[current].date}</h1> */}
                            <h1>{days[d.getDay()]}</h1>
                            <p>{d.getDay()}/{d.getMonth() + 1}/{d.getFullYear()} </p>
                            <h2>{weather.location.name}</h2>
                            <p>{weather.forecast.forecastday[current].day.maxtemp_c} &#8451;</p>
                            <p>{weather.forecast.forecastday[current].day.condition.text}</p>

                        </div>

                        <div className="w-card__rightContent">
                            <h1>right content goes here </h1>
                        </div>

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

                        {/* {weather.forecast.forecastday.map((map, index) => (


                            <div className="w-card__sContent" onClick={() => (handleClick(index))}>
                                <p>{d}</p>
                                <img className="w-card__sIcon" src={`${map.day.condition.icon}`} alt="weather icon" />
                                <h2 className="w-card__sTitle">{map.date}</h2>
                                <div className="w-card__sInfo">
                                    <p className="w-card__sInfoContent">{map.day.mintemp_c}&#8451;</p>
                                    <p className="w-card__sInfoContent">{map.day.maxtemp_c}&#8451;</p>
                                    <p></p>
                                </div>

                                {/* <p>{map.day.condition.text}</p> */}
                        {/* <span>{index}</span>accessing .map index */}
                        {/* </div> */}

                        {/* ))} */}

                    </div>

                </div>
            )}

        </div>
    )
}

export default WeatherCard