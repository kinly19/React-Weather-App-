const Test = () => {

    let d;

    d = new Date(); //calling constructor for the date

    // d = new Date(1626739200000);
    // d = new Date("2019-08-02T11:30:00+01:00"); //iso8641 format 
    d = new Date(2021, 7, 20, 18, 56, 0, 0); //local time zone from the device 

    console.log(d.toString())
    // console.log(d.getFullYear()) //gives us full Year only
    // console.log(d.getMonth()) // will give you the month index 0-11 (not 1 - 12)
    // console.log(d.getDate())
    // console.log(d.getMinutes())
    // console.log(d.getSeconds())
    // console.log(d.getUTCHours())
    // console.log(d.toLocaleString())
    console.log(d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear())
    // console.log(d.toLocaleTimeString())
    // console.log(d.getDay())




    // d.setDate(21);
    // d.setMonth(6);
    // d.setFullYear(2021);
    // console.log(d.toString())

    // d.setUTCHours(4)
    // console.log(d.toString())

    // console.log(d.toISOString())
    // console.log(d.toLocaleString("en-UK"))
    // console.log(d.toLocaleString("en-US"))

    // useEffect(async () => {

    //     const respon = await fetch('http://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=London&days=5&aqi=no&alerts=no');
    //     const data = await respon.json();
    //     setWeather(data);
    //     setweekday(data.forecast.forecastday[current].date); //use the value inside of current to choose which index values we want to use inside of forecastday.date 
    //     setCondition(data.forecast.forecastday[current].day.condition);
    //     // setCondition(data.forecast.forecastday[current].day.condition.text)
    //     console.log("effects" + condition);
    //     // console.log(weather);
    //     console.log("effect weekdays" + weekday);
    //     console.log('effect called');

    // }, [])


    // {currentHours && (
    //     <div className="w-card__slider" >

    //         {weather.forecast.forecastday[current].hour.map((hour, index) => {

    //             if (Math.floor(localtime.getHours()) == currentWeatherTime.getHours()) {
    //                 let d = new Date(hour.time);

    //                 return (
    //                     currentHours.map((hour, index) => {
    //                         <div className="w-card__hourInfo" key={index}>

    //                             <h2 className="w-card__hour">{d.getHours()}:00</h2>
    //                             <h3 className="w-card__temp">{hour.temp_c}&#8451;</h3>

    //                             <p className="w-card__text">{hour.condition.text}</p>
    //                             <p className="w-card__rain">Rain {hour.chance_of_rain} %</p>
    //                         </div>
    //                     })
    //                 )

    //             }
    //             return (
    //                 <div className="w-card__hourInfo" key={index}>

    //                     <h2 className="w-card__hour">{d.getHours()}:00</h2>
    //                     <h3 className="w-card__temp">{hour.temp_c}&#8451;</h3>

    //                     <p className="w-card__text">{hour.condition.text}</p>
    //                     <p className="w-card__rain">Rain {hour.chance_of_rain} %</p>
    //                 </div>
    //             )
    //         })}

    //     </div>
    // )}

    {/* <div className="w-card__slider" >
                            {weather.forecast.forecastday[current].hour.map((hour, index) => {
                                let d = new Date(hour.time);
                                return (
                                    <div className="w-card__hourInfo" key={index}> 

                                        <h2 className="w-card__hour">{d.getHours()}:00</h2>
                                        <h3 className="w-card__temp">{hour.temp_c}&#8451;</h3>

                                        <p className="w-card__text">{hour.condition.text}</p>
                                        <p className="w-card__rain">Rain {hour.chance_of_rain} %</p>
                                    </div>
                                )
                            })}
                            <button className="w-card__btn w-card__btn--right" onClick={handleRightClick}>right</button>
                            <button className="w-card__btn w-card__btn--left" onClick={handleLeftClick}>left</button>
                        </div> */}



    //old states for weatherCard
    // const [hours, setHours] = useState(null);
    // const [weatherTime, setWeatherTime] = useState(null)//api current time 
    // let currentWeatherTime = new Date(weatherTime)

    //useEffect
    // setHours(data.forecast.forecastday[current].hour)
    // setWeatherTime(data.location.localtime)

    // setshowHours(data.forecast.forecastday[current].hour.slice(localtime.getHours(), 24))



    return (
        <div style={{ height: "50rem" }}>
            Test
        </div>
    )
}

export default Test;