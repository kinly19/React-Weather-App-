import './Footer.scss'

const Footer = () => {
    return (
        <div className="linkBack">
            <div className="linkBack__items">
                <p>Powered By </p>
                <a target="_blank" href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></img></a>
            </div>
        </div>
    )

}

export default Footer;