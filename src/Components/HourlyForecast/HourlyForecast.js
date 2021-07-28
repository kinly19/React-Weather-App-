import "./HourlyForecast.scss";

const HourlyForecast = ({ d, hourlyTemp, hourlyFeelTemp, hourlyCond, hourlyRain }) => {

    //destructuring 
    //const d = props.d
    //const hourlyTemp = props.hourlyemp
    //const hourlyCond = props.hourlyCond

    return (
        <div className="hourlyForecast">

            <div className="hourlyForecast__contentTop">
                <h2 className="hourlyForecast__hour">{d.toLocaleString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false })}</h2> {/* dynamic hour need to come from weather component */}
                <p className="hourlyForecast__text">{hourlyCond}</p> {/* {hour.condition.text} */}
            </div>

            <div className="hourlyForecast__contentBottom">

                <div className="hourlyForecast__info">
                    <h1 className="hourlyForecast__infoTitle">Max</h1>
                    <p className="hourlyForecast__infoText">{hourlyTemp}&#176;C</p>
                </div>
                {/* <div className="hourlyForecast__info">
                    <h1 className="hourlyForecast__infoTitle">Feel</h1>
                    <p className="hourlyForecast__infoText">{hourlyFeelTemp}<span className="hourlyForecast__span">&#8451;</span></p>
                </div> */}
                <div className="hourlyForecast__info">
                    <h1 className="hourlyForecast__infoTitle">Rain</h1>
                    <p className="hourlyForecast__infoText">{hourlyRain}%</p>
                </div>
            </div>
        </div>
    )
}

export default HourlyForecast