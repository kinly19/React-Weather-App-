import './DailyForecastSm.scss'

const DailyForecastSm = ({ index, handleClick, dailyWeekday, avgTemp, dailyMin, dailyRain, dailyTemp, dailyIcon }) => {
    return (
        <div className="dailyForecastSm" onClick={() => (handleClick(index))}>

            <div className="dailyForecastSm__contentLeft">
                <h2 className="dailyForecastSm__weekday">{dailyWeekday}</h2>
                <div className="dailyForecastSm__infoContent">

                    <div className="dailyForecastSm__info">
                        <h1 className="dailyForecastSm__infoTitle">Avg</h1>
                        <p className="dailyForecastSm__infoText">{avgTemp}</p>
                    </div>

                    <div className="dailyForecastSm__info">
                        <h1 className="dailyForecastSm__infoTitle">Min</h1>
                        <p className="dailyForecastSm__infoText">{dailyMin}</p>
                    </div>
                    <div className="dailyForecastSm__info">
                        <h1 className="dailyForecastSm__infoTitle">Rain</h1>
                        <p className="dailyForecastSm__infoText">{dailyRain}%</p>
                    </div>
                </div>
            </div>

            <div className="dailyForecastSm__contentRight">
                <img className="dailyForecastSm__icon" src={dailyIcon} alt="weather icon" />
                <p className="dailyForecastSm__maxTemp">{dailyTemp}</p>
            </div>
        </div>
    )
}

export default DailyForecastSm;