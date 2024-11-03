"use client";

import { useGeoLocation, useWatchPosition } from "@/hooks/useGeoLocations";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
};

const Weather = () => {
    const { location, error } = useGeoLocation(geolocationOptions);
    const { location: watch, error: watchError } = useWatchPosition(geolocationOptions);

    return (
        <div>
            <h1>Weather</h1>
            <p>Latitude: {location?.latitude}</p>
            <p>Longitude: {location?.longitude}</p>
            <p>Error: {error}</p>


            <h1>Weather</h1>
            <p>Latitude: {watch?.latitude}</p>
            <p>Longitude: {watch?.longitude}</p>
            <p>Error: {error}</p>
        </div>
    );
};

export default Weather;
