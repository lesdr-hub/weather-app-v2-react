import { WeatherIcon } from "./WeatherIcon";
import { formatTemp, formatWindSpeed, formatPercent } from "../utils/units";
import { formatDateReadable } from "../utils/datetime";

// main current weather component 
export function Hero({ current, unitSystem, locationName }) {
    if (!current) return null;

    const weather = current.weather?.[0];
    const timezoneOffset = current.timezone ?? 0;

    return (
        <section className="hero">
            <p className="hero__location">{locationName}</p>
            <p className="hero__date">
                {formatDateReadable(current.dt, timezoneOffset)}
            </p>

            <div className="hero__main">
                <WeatherIcon owmIconCode={weather?.icon} size={96} />
                <span className="hero__temp">
                    {formatTemp(current.main?.temp, unitSystem)}
                </span>
            </div>

            <p className="hero__description">{weather?.description}</p>

            <div className="hero__stats">
                <div className="hero__stat">
                    <span className="hero__stat-label">Feels like</span>
                    <span className="hero__stat-value">
                        {formatTemp(current.main?.feels_like, unitSystem)}
                    </span>
                </div>
                <div className="hero__stat">
                    <span className="hero__stat-label">Humidity</span>
                    <span className="hero__stat-value">
                        {formatPercent(current.main?.humidity)}
                    </span>
                </div>
                <div className="hero__stat">
                    <span className="hero__stat-label">Wind</span>
                    <span className="hero__stat-value">
                        {formatWindSpeed(current.wind?.speed, unitSystem)}
                    </span>
                </div>
            </div>
        </section>
    );
}
