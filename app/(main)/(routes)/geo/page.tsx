"use client";

import { ILocation, useGeoLocation, useWatchPosition } from "@/hooks/useGeoLocations";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
};


const toRadians = (degree: number) => (degree * Math.PI) / 180;

const getDistanceFromLatLonInKm = (location1: ILocation, location2: ILocation) => {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = toRadians(location2.latitude - location1.latitude);
    const dLon = toRadians(location2.longitude - location1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(location1.latitude)) * Math.cos(toRadians(location2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 점 사이 거리 (단위: km)

    return [distance, distance * 1000, distance * 1000 * 100];
};


const Weather = () => {
    const { location, error } = useGeoLocation(geolocationOptions);
    const { location: watch, error: watchError } = useWatchPosition(geolocationOptions);
    const [km, m, cm] = getDistanceFromLatLonInKm(location, watch)
    return (
        <div>
            <h1>Weather</h1>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Error: {error}</p>


            <h1>Weather</h1>
            <p>Latitude: {watch.latitude}</p>
            <p>Longitude: {watch.longitude}</p>
            <p>Error: {error}</p>

            <p> Distance : {km}km, {m}m, {cm}m </p>
        </div>
    );
};

export default Weather;
