import { useState, useEffect } from "react";

export interface ILocation {
    latitude: number;
    longitude: number;
}

export const useGeoLocation = (options?: PositionOptions) => {
    const [location, setLocation] = useState<ILocation>({ latitude: 37.5665, longitude: 126.9780 });
    const [error, setError] = useState("");

    const handleSuccess = (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;

        setLocation({
            latitude,
            longitude,
        });
    };

    const handleError = (err: GeolocationPositionError) => {
        setError(err.message);
    };

    useEffect(() => {
        const { geolocation } = navigator;

        if (!geolocation) {
            setError("Geolocation is not supported.");
            return;
        }

        geolocation.getCurrentPosition(handleSuccess, handleError, options);
    }, [options]);

    return { location, error };
};

export const useWatchPosition = (options?: PositionOptions) => {
    const [location, setLocation] = useState<ILocation>({ latitude: 37.5665, longitude: 126.9780 });
    const [error, setError] = useState<string>("");

    const handleSuccess = (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;

        setLocation({
            latitude,
            longitude,
        });
    }

    const handleError = (err: GeolocationPositionError) => {
        setError(err.message);
    };


    useEffect(() => {
        const { geolocation } = navigator;

        if (!geolocation) {
            setError("Geolocation is not supported.");
            return;
        }

        geolocation.watchPosition(handleSuccess, handleError, options)
    }, [options]);

    return { location, error };

}