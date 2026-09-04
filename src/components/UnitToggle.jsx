
// unit toggle button
export function UnitToggle({ unitSystem, onToggle }) {
    const isMetric = unitSystem === "metric";

    return (
        <button
            type="button"
            className="unit-toggle"
            onClick={onToggle}
            aria-label="Toggle temperature units"
        >
            <span className={isMetric ? "unit-toggle__active" : ""}>METRIC (°C)</span>
            <span className="unit-toggle__divider">/</span>
            <span className={!isMetric ? "unit-toggle__active" : ""}>IMPERIAL (°F)</span>
        </button>
    );
}
