import { useCallback, useEffect, useState } from "react";
import { UNIT_SYSTEMS } from "../utils/units";

const STORAGE_KEY = "weather-app:unit-system";

// check unit keys
function readStoredUnit() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored in UNIT_SYSTEMS ? stored : null;
    } catch {
        return null;
    }
}

// use unit preference logic
export function useUnitPreference() {
    const [unitSystem, setUnitSystem] = useState(
        () => readStoredUnit() ?? "metric",
    );

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, unitSystem);
        } catch {
            // don"t use local storage if failure
        }
    }, [unitSystem]);

    const toggleUnitSystem = useCallback(() => {
        const keys = Object.keys(UNIT_SYSTEMS);
        setUnitSystem((prev) => {
            const nextIndex = (keys.indexOf(prev) + 1) % keys.length;
            return keys[nextIndex];
        });
    }, []);

    return { unitSystem, setUnitSystem, toggleUnitSystem };
}
