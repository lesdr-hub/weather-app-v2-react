// ===============
// imports
import { useState } from "react";
import "./App.css";

// ===============
// components
import { SearchBar } from "./components/SearchBar";
import { Hero } from "./components/Hero";
import { HourlyForecast } from "./components/HourlyForecast";
import { DailyForecast } from "./components/DailyForecast";
import { UnitToggle } from "./components/UnitToggle";
import { LoadingView, ErrorView } from "./components/StatusView";
import { useWeatherData } from "./hooks/useWeatherData";
import { useUnitPreference } from "./hooks/useUnitPreference";

// ===============
// main

// set default location to vancouver
const DEFAULT_LOCATION = { lat: 49.2827, lon: -123.1207, name: "Vancouver, BC, CA" };

function App() {
    const [location, setLocation] = useState(DEFAULT_LOCATION); // location state
    const { unitSystem, toggleUnitSystem } = useUnitPreference(); // update unit preference
    const { current, forecast, loading, error } = useWeatherData(
        location,
        unitSystem,
    ); //

    return (
        <div className="app">
            <header className="app__header">
                <SearchBar onSelect={setLocation} />
                <UnitToggle unitSystem={unitSystem} onToggle={toggleUnitSystem} />
            </header>

            <main className="app__main">
                {loading && <LoadingView />}
                {!loading && error && <ErrorView message={error} />}
                {!loading && !error && current && (
                    <>
                        <Hero
                            current={current}
                            unitSystem={unitSystem}
                            locationName={location.name}
                        />
                        <HourlyForecast forecast={forecast} unitSystem={unitSystem} />
                        <DailyForecast forecast={forecast} unitSystem={unitSystem} />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
