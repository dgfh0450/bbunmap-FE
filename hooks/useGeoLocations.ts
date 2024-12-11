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

export const getCurrentLocation = (options?: PositionOptions): Promise<ILocation> => {
    return new Promise((resolve, reject) => {
        const handleSuccess = (pos: GeolocationPosition) => {
            const { latitude, longitude } = pos.coords;
            resolve({ latitude, longitude });
        };

        const handleError = (err: GeolocationPositionError) => {
            if (err.PERMISSION_DENIED) {
                reject(new Error("설정에서 위치정보 수집을 허용으로 변경해주세요."))
            }
            else reject(err);
        };

        const { geolocation } = navigator;
        if (!geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }

        geolocation.getCurrentPosition(handleSuccess, handleError, options);
    });
};
