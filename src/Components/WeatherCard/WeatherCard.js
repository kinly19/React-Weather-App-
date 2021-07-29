import { useState, useEffect } from 'react';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './WeatherCard.scss';

const WeatherCard = () => {

    const [weather, setWeather] = useState(null); //api data object
    const [weekday, setweekday] = useState(null); //object properties - weather.forcaste.forecastday[current].date
    const [condition, setCondition] = useState(null);
    const [icon, setIcon] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [rain, setRain] = useState(null);


    const [current, setCurrent] = useState(0);//change the array index inside of weather.forecast.forecasteday[current] when user selects between different days
    const [showHours, setshowHours] = useState(null);// we will use this to show us the hours array inside of weather.forecaste.forecasteday[current].hours

    const locationKey = 'London'; //api location

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(weekday); // weekday = weather.forecast.forecaste[current].date

    let localtime = new Date(); //we are going to use the local device time for splicing through an array 

    const handleClick = (index) => {
        setCurrent(index);
        setweekday(weather.forecast.forecastday[index].date);
    }


    useEffect(() => {

        fetch(`http://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=${locationKey}&days=5&aqi=no&alerts=no`)
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

                // console.log(d.getHours(weekday))
                console.log("useEffect")
                console.log(d.toLocaleString('en-UK', { hour: 'numeric', hour12: true }))

                if (d.getDate() === localtime.getDate()) { //if the date coming from weather.forecast.forecastday[current].date is equal to devices local time
                    //we set the value of our state to (weather.forecast.forecasteday[current].hour) we use the slice method to copy a portion of that array and use the value from localtime.getHours() as our starting point 
                    setshowHours(data.forecast.forecastday[current].hour.slice(localtime.getHours()))
                } else {
                    setshowHours(data.forecast.forecastday[current].hour.slice(0, 24));
                }

                // if (d.getDate() === localtime.getDate()) {
                //     console.log("return spliced hours here ")

                // } else if (d.getDate() !== localtime.getDate()) {
                //     console.log("return all hours here")
                // }
            })

    }, [current, weekday])

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

                        {showHours && (

                            <div className="w-card__slider">

                                {showHours.map((hour, index) => { //we take our array and map through and return template
                                    let d = new Date(hour.time); //we need this to change where d should get its time data from so we can take just the time 
                                    return (

                                        <HourlyForecast d={d} hourlyTemp={Math.floor(hour.temp_c)} hourlyFeelTemp={hour.feelslike_c} hourlyCond={hour.condition.text} hourlyRain={hour.chance_of_rain} />
                                    )
                                })}

                            </div>
                        )}

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

        </div >
    )

}

export default WeatherCard