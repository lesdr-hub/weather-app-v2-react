// ============
// imports
import { useState } from "react";
import { useLocationSearch } from "../hooks/useLocationSearch";

// ============
// search bar
export function SearchBar({ onSelect }) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { results, loading, error } = useLocationSearch(query);

    function handleSelect(place) {
        const label = place.state
            ? `${place.name}, ${place.state}, ${place.country}`
            : `${place.name}, ${place.country}`;

        onSelect({
            lat: place.lat,
            lon: place.lon,
            name: label,
        });
        setQuery("");
        setIsOpen(false);
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                placeholder="Search for a city..."
                onChange={(event) => {
                    setQuery(event.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                aria-label="Search for a city"
            />

            {isOpen && query.trim().length >= 2 && (
                <ul className="search-results">
                    {loading && <li className="search-results__hint">Searching...</li>}
                    {error && <li className="search-results__hint">{error}</li>}
                    {!loading && !error && results.length === 0 && (
                        <li className="search-results__hint">No matches found.</li>
                    )}
                    {results.map((place, index) => (
                        <li key={`${place.lat}-${place.lon}-${index}`}>
                            <button type="button" onMouseDown={() => handleSelect(place)}>
                                {place.name}
                                {place.state ? `, ${place.state}` : ""}, {place.country}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
