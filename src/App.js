import "./App.scss";
import { useState, useEffect, Fragment} from "react";
//custom hook
import useFetch from "./hooks/fetch-api";
//components
import Form from "./Components/Form/Form";
import CurrentWeather from "./Components/CurrentWeather";
import HourlyForecast from "./Components/HourlyForecast/HourlyForecast";
import DailyForecastSm from "./Components/DailyForecastSm/DailyForecastSm";
import Footer from "./Components/Footer";
//assets
import MorningBeach from "./Assets/Images/MorningBeach.jpg";
import NightMountain from "./Assets/Images/NightMountain.jpg";

function App() {
  const [weather, setWeather] = useState(null); //api data object for daily forecaste
  const [currentWeather, setCurrentWeather] = useState(null); //api data object for current forecast
  const [weekday, setweekday] = useState(null); //res.forcaste.forecastday[current].date
 
  const [current, setCurrent] = useState(0); //change the arrays index inside of res.forecast.forecasteday[current] when user selects between different days
  const [hourlyForecast, sethourlyForecast] = useState(null); // we will use this to show us the "hour" array inside of weather.hourly

  const [locationKey, setLocationKey] = useState(""); //set api location
  const [isLocationKeyEmpty, setIsLocationKeyEmpty] = useState(true);
  const [inputValue, setInputValue] = useState(""); //this will take the users input value to setLocationKey(inputValue)

  const degreeSign = "\u00B0 C"; //unicode symbol
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  let d = new Date(weekday); // weekday = res.forecast.forecasteday[current].date
  let localtime = new Date(); //we are going to use the local device time for splicing through an array
  const [isToday, setIsToday] = useState(false);
  
  const img = [MorningBeach, NightMountain];
  const [BackgroundImage, setBackgroundImage] = useState("");
  const backGround = {
    //background styling for main container
    backgroundImage: `linear-gradient(181deg, #1d1d1da6, #00000061),url(${BackgroundImage})`,
  };

  //Handlers ======================================================================
  const handleClick = (index) => {
    //index comes from .map
    setCurrent(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLocationKeyEmpty(false);
    setLocationKey(inputValue);
    setInputValue(""); //form input value reverts back to empty
  };

  const setTodayHandler = (status) => {
    setIsToday(status)
  }

  const ScrollToTop = () => {
    //scroll back to top of page onClick
    window.scrollTo(0, 0);
  };
  //===============================================================================

  //custom hook
  const { data, error } = useFetch ( //pass error down to our form component
    `https://api.weatherapi.com/v1/forecast.json?key=ef6993d763d541b4812225535211807&q=${locationKey}&days=5&aqi=no&alerts=no`,
    isLocationKeyEmpty
  );

  useEffect(() => {
    if (data) {
      setWeather(
        //we set the weather state by .mapping through our data (api data) and returning our own object(seen below), we only use what we need and not the whole object from api.
        data.forecast.forecastday.map((fcd) => {
          return {
            max: Math.floor(fcd.day.maxtemp_c) + degreeSign,
            min: Math.floor(fcd.day.mintemp_c) + degreeSign,
            rain: `${fcd.day.daily_chance_of_rain}%`,
            snow: `${fcd.day.daily_chance_of_snow}%`,
            uv: fcd.day.uv,
            humidity: isToday
              ? `${data.current.humidity}%`
              : `${fcd.day.avghumidity}%`, 
            ["Feels Like"]: isToday
              ? data.current.feelslike_c + degreeSign
              : "N/A",
            sunrise: fcd.astro.sunrise,
            sunset: fcd.astro.sunset,
            moonrise: fcd.astro.moonrise,
            moonset: fcd.astro.moonset,
            ["moon Phase"]: fcd.astro.moon_phase,
            avg: Math.floor(fcd.day.avgtemp_c) + degreeSign,
            condition: fcd.day.condition.text,
            icon: fcd.day.condition.icon,
            hourly: fcd.hour,
            date: fcd.date,
          };
        })
      );

      setCurrentWeather({
        //current forecast
        temp: data.current.temp_c + degreeSign,
        feelslike: data.current.feelslike_c + degreeSign,
        humidity: data.current.humidity,
        lastupdate: data.current.last_updated,
        country: data.location.country,
        locationName: data.location.name,
        region: data.location.region,
      });
    }
  }, [data, isToday]);

  useEffect(() => {
    //useEffect for updating states
    if (weather && currentWeather) {
      if (d.getDate() === localtime.getDate()) {
        // using the date from (weekday) we check if the date coming from the api is the same as present (todays)date
        sethourlyForecast(weather[current].hourly.slice(localtime.getHours()));
      } else {
        //for the present day we show hourly forecast from the current time onwards
        sethourlyForecast(weather[current].hourly.slice(0, 24));
      }
      setweekday(weather[current].date); //gives us a date value we can pass into d
      ScrollToTop();
    }
  }, [weather, currentWeather, current, weekday]);

  useEffect(() => {
    //change background Image, depending on time of day between sunset and sunrise
    if (weather) {
      let TodaysTime = localtime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }); //show only hours and minutes

      const sunset = `${parseInt(weather[current].sunset) + 12}:${weather[
        current
      ].sunset
        .split(":")[1]
        .replace("PM", "")
        .replace(/\s/, "")}`;
      //changes the time string value from 12hr format to 24hr format
      //we take the string value from weather[current].sunset and turn it into an interger so we can add 12 to change the string time format from 12hr to 24hr (8+12=20)
      //then we build the string back up using split() and replace() methods, to choose and replace from what we need. eg (08:00 PM) parseInt(08:00 PM)=8+12=20 split(':')=[08, 00 PM] [1]replace(PM, '')removes "PM" replace(/\s\,'')removes white space. End result=(20:00)
      const sunrise = weather[current].sunrise;

      if (TodaysTime > sunset || TodaysTime < sunrise) {
        setBackgroundImage(img[1]);
      } else if (TodaysTime > sunrise || TodaysTime < sunset) {
        setBackgroundImage(img[0]);
      }
    }
  }, [weather]);

  useEffect(() => {
    //get current position of users location with Geolocation, using lat and long values to be passed into LocationKey()
    const success = (position) => {
      const userPosition = position.coords;
      setIsLocationKeyEmpty(false);
      setLocationKey(`${userPosition.latitude},${userPosition.longitude}`);
    };

    const onError = (position) => {
      console.log(`${position.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, onError);
  }, []);

  return (
    <div className="App" style={backGround}>
      {!weather && (
        <div className="forecast_form">
          <Form
            className="form--large"
            handleSubmit={handleSubmit}
            error={error}
            inputValue={inputValue}
            weather={weather}
            setInputValue={setInputValue}
          ></Form>
        </div>
      )}

      {weather && currentWeather && hourlyForecast && (
        <Fragment>
          <div className="current_forecast">
            <CurrentWeather
              currentWeather={currentWeather}
              weather={weather}
              localtime={localtime}
              current={current}
              d={d}
              onLastUpdate={data.current.last_updated}
              onToday={setTodayHandler}
            />
          </div>

          <div className="hourly_forecast">
            {hourlyForecast.map((hour, index) => {
              let d = new Date(hour.time); //we need this to change where d should get its time data from so we can take just the time
              return (
                <HourlyForecast
                  key={index}
                  d={d}
                  hourlyTemp={Math.floor(hour.temp_c)}
                  hourlyFeelTemp={hour.feelslike_c}
                  hourlyCond={hour.condition.text}
                  hourlyRain={hour.chance_of_rain}
                />
              );
            })}
          </div>

          <div className="daily_forecast" onClick={ScrollToTop}>
            {weather.map((map, index) => {
              let d = new Date(map.date); // map.date = weather.forecast.forecaste[].date
              const dayName = days[d.getDay()]; // we use the getDay() which would return the index of a day and we use that value to select in our days array what day to show :)
              return (
                <DailyForecastSm
                  key={index}
                  index={index} //index comes from the .map()
                  handleClick={handleClick}
                  dailyIcon={map.icon}
                  dailyWeekday={dayName}
                  avgTemp={map.avg}
                  dailyTemp={map.max}
                  dailyMin={map.min}
                  dailyRain={map.rain}
                />
              );
            })}
          </div>

          <Footer />
        </Fragment>
      )}
    </div>
  );
}

export default App;
