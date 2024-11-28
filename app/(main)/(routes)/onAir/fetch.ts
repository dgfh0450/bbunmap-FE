import { Session } from "next-auth";
import { TypesBuildingFilter, TypesOnAirPlace } from './onAir.d';
import Request from "@/lib/fetch";
import LoginError from "./CustomError";

export const fetchOnAirPlaceList = (filterType: TypesBuildingFilter | undefined, session: Session | null
): Promise<TypesOnAirPlace[]> => {
    const request = new Request(session?.accessToken);
    if (filterType === undefined) {
        return request.get('/api/realTime/places');
    }
    else {
        return request.get(`/api/realTime/places?${filterType.type}=${filterType.value}`);
    }
};

export const fetchVote = (value: number, placeName: string, session: Session | null): Promise<any> => {
    if (!session) throw new LoginError('로그인이 필요합니다.');
    const request = new Request(session?.accessToken);
    if (value == -1) throw new Error('값을 설정해주세요!');
    return request.post('/api/test', { key: '과학도서관 !nfinity 라운지', vote: value });
}