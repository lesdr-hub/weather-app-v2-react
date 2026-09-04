import { WeatherIcon } from "./WeatherIcon";
import { formatTemp } from "../utils/units";
import { formatDayLabel, groupForecastByDay } from "../utils/datetime";

// daily forecast 
function summarizeDay(entries) {
    const temps = entries.map((entry) => entry.main?.temp).filter(Number.isFinite);
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    const midday = entries.reduce((closest, entry) => {
        const hour = new Date(entry.dt * 1000).getUTCHours();
        const closestHour = new Date(closest.dt * 1000).getUTCHours();
        return Math.abs(hour - 12) < Math.abs(closestHour - 12) ? entry : closest;
    }, entries[0]);

    return { min, max, icon: midday.weather?.[0]?.icon, dt: midday.dt };
}

export function DailyForecast({ forecast, unitSystem }) {
    if (!forecast?.list?.length) return null;

    const timezoneOffset = forecast.city?.timezone ?? 0;
    const days = groupForecastByDay(forecast.list, timezoneOffset).slice(0, 7);

    return (
        <section className="daily-forecast">

            <h2>{days.length}-Day Forecast</h2>
            <ul className="daily-forecast__list">
                {days.map(({ dayKey, entries }) => {
                    const { min, max, icon, dt } = summarizeDay(entries);
                    return (
                        <li key={dayKey} className="daily-forecast__row">
                            <span className="daily-forecast__day">
                                {formatDayLabel(dt, timezoneOffset)}
                            </span>
                            <WeatherIcon owmIconCode={icon} size={32} />
                            <span className="daily-forecast__range">
                                <span className="daily-forecast__high">
                                    {formatTemp(max, unitSystem)}
                                </span>
                                <span className="daily-forecast__low">
                                    {formatTemp(min, unitSystem)}
                                </span>
                            </span>
                        </li>
                    );
                })}
            </ul>

        </section>
    );
}
