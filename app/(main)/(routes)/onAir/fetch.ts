import { Session } from "next-auth";
import { TypeResponseOnAirPlace, TypesBuildingFilter, TypesOnAirPlace } from './onAir.d';
import Request from "@/lib/fetch";
import LoginError from "./CustomError";

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

export const fetchVote = (value: number, placeName: string, session: Session | null): Promise<any> => {
    if (!session) throw new LoginError('로그인이 필요합니다.');
    const request = new Request(session?.accessToken);
    if (value == -1) throw new Error('값을 설정해주세요!');
    return request.post('/api/test', { key: placeName, vote: value });
}

export const buildingList = ['SK미래관', '과학도서관', '백주년기념관', '중앙광장 지하'] as const;
export const typeList = ['카페', '라운지'] as const;

