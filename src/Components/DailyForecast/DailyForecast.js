import './DailyForecast.scss'



const DailyForecast = ({ index, handleClick, dailyIcon, dailyWeekday, dailyTemp, dailyMin, dailyRain }) => { // Destructuring Props

    return (

        <div className="dailyForecast" onClick={() => (handleClick(index))}>

            <div className="dailyForecast__contentTop">
                <h2 className="dailyForecast__weekday">{dailyWeekday}</h2>
                <p className="dailyForecast__maxTemp">{dailyTemp}</p>
                <img className="dailyForecast__icon" src={dailyIcon} alt="weather icon" />
            </div>

            <div className="dailyForecast__contentBottom">
                <div className="dailyForecast__info">
                    <h1 className="dailyForecast__infoTitle">Min</h1>
                    <p className="dailyForecast__infoText">{dailyMin}</p>
                </div>
                <div className="dailyForecast__info">
                    <h1 className="dailyForecast__infoTitle">Rain</h1>
                    <p className="dailyForecast__infoText">{dailyRain}%</p>
                </div>
            </div>
        </div>
    )
}

export default DailyForecast