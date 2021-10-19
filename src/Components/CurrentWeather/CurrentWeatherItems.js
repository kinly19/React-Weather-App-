import './CurrentWeatherItems.scss';

const CurrentWeatherItems = ({title, info}) => {
  return (
    <div className="currentInfo">
        <h2 className="currentInfo__title">{title}</h2>
        <p className="currentInfo__text">{info}</p>
    </div>
  );
};

export default CurrentWeatherItems;