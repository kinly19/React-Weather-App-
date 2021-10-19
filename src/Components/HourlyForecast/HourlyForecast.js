import "./HourlyForecast.scss";

const HourlyForecast = ({ d, hourlyTemp, hourlyCond, hourlyRain }) => {
  return (
    <div className="hourlyForecast">
      <div className="hourlyForecast__contentTop">
        <h2 className="hourlyForecast__hour">
          {d.toLocaleString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </h2>
        <p className="hourlyForecast__text">{hourlyCond}</p>
      </div>
      <div className="hourlyForecast__contentBottom">
        <div className="hourlyForecast__info">
          <h1 className="hourlyForecast__infoTitle">Max</h1>
          <p className="hourlyForecast__infoText">{hourlyTemp}&#176;C</p>
        </div>
        <div className="hourlyForecast__info">
          <h1 className="hourlyForecast__infoTitle">Rain</h1>
          <p className="hourlyForecast__infoText">{hourlyRain}%</p>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast