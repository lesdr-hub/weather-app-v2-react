import { WeatherIcon } from "./WeatherIcon";
import { formatTemp } from "../utils/units";
import { formatHour } from "../utils/datetime";

// forecast per hour (notably in 3 hour gaps due to free tier restrictions with open weather map api)
export function HourlyForecast({ forecast, unitSystem }) {
    if (!forecast?.list?.length) return null;

    const timezoneOffset = forecast.city?.timezone ?? 0;
    const upcoming = forecast.list.slice(0, 12);

    return (
        <section className="hourly-forecast">
            <h2>Hourly Forecast</h2>
            <div className="hourly-forecast__scroll">
                {upcoming.map((step) => (
                    <div key={step.dt} className="hourly-forecast__item">
                        <span className="hourly-forecast__time">
                            {formatHour(step.dt, timezoneOffset)}
                        </span>
                        <WeatherIcon owmIconCode={step.weather?.[0]?.icon} size={36} />
                        <span className="hourly-forecast__temp">
                            {formatTemp(step.main?.temp, unitSystem)}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
