import { Session } from "next-auth";
import { TypeResponseOnAirPlace, TypesBuildingFilter, TypesCafeDetail, TypesOnAirPlace, TypesLoungeDetail } from './onAir.d';
import Request from "@/lib/fetch";
import LoginError from "./CustomError";
import { getCurrentLocation } from "@/hooks/useGeoLocations";
import { getCurrentTime } from "@/lib/date";

export const fetchOnAirPlaceList = (filterType: TypesBuildingFilter | undefined, session: Session | null
): Promise<TypeResponseOnAirPlace> => {
    const request = new Request(session?.accessToken);
    if (filterType === undefined) {
        return request.get('/api/realTime/places');
    }
    else {
        return request.get(`/api/realTime/places?${filterType.type}=${filterType.value}`);
    }
};

export const getOnAirPlace = (placeName: string | null, session: Session | null
): Promise<TypesOnAirPlace> => {
    if (!placeName) throw new Error('없는 장소 입니다.')

    const request = new Request(session?.accessToken);
    return request.get(`/api/realTime?place=${placeName}`);
}

export const getPlaceDetail = <T extends '카페' | '라운지'>(buildingName: string | null, placeName: string | null, type: T): Promise<T extends '카페' ? TypesCafeDetail : TypesLoungeDetail> => {
    const request = new Request();
    if (!placeName || !buildingName) throw new Error('올바르지 않은 대상입니다.')
    if (type === '카페') {
        return request.get(`/f/cafe?buildingName=${buildingName}&facilityName=${placeName}`);
    }
    else if (type === '라운지') {
        return request.get(`/f/lounge?buildingName=${buildingName}&facilityName=${placeName}`);
    } else {
        throw new Error('Invalid Type')
    }
};

export const fetchVote = async (value: number, placeName: string, session: Session | null): Promise<any> => {
    const { longitude, latitude } = await getCurrentLocation();


    if (!session) throw new LoginError('로그인이 필요합니다.');
    const request = new Request(session.accessToken);

    const currentTimeISO = getCurrentTime();
    if (value == -1) throw new Error('값을 설정해주세요!');

    return request.post('/secured/realTime/vote', {
        voteTime: currentTimeISO,
        placeName: placeName,
        figure: value,
        longitude: longitude,
        latitude: latitude
    });
}

export const fetchLike = (placeName: string, session: Session | null): Promise<boolean> => {
    if (!session) throw new LoginError('로그인이 필요합니다.');
    const request = new Request(session.accessToken);
    console.log(placeName);
    return request.post(`/secured/user/favoritePlace?place=${placeName}`);
}

export const buildingList = ['SK미래관', '과학도서관', '백주년기념관', '중앙광장 지하'] as const;
export const typeList = ['카페', '라운지'] as const;
export const detailCategoryMap: ReadonlyMap<string, string> = new Map([
    ['weekdayAvailableTime', '주중시간'],
    ['weekendAvailableTime', '주말시간'],
    ['conversation', '대화'],
    ['mood', '분위기'],
    ['socket', '콘센트']
]);
