import { TypesCafeProperty, TypesDetailBase, TypesLoungeProperty } from "../../types";

export type TypeResponseOnAirPlace = {
    closestResetTime: string;
    specificUserRealTimeDTOArr: TypesOnAirPlace[];
}

export type TypeResponseOnAirVotePlaceList = {
    closestResetTime: string;
    voteTabInfoDtos: TypesOnAirVotePlace[];
}

export type TypesOnAirVotePlace = {
    buildingName: string;
    floor: string;
    placeName: string;
    like: boolean;
    voteAvailable: boolean;
}


export type TypesOnAirPlace = {
    buildingName: string;
    floor: string;
    placeName: string;
    placeType: string;
    vote: number;
    result: number;
    like: boolean;
    voteAvailable: boolean;
    refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<T, Error>>;
}

export type TypesBuildingFilterType = 'buildingName' | 'type';

export type TypesBuildingFilter = {
    type: TypesBuildingFilterType;
    value: string;
}


export interface TypesOnAirPlaceDetail extends TypesDetailBase {
    buildingNum: string;
}

export type TypesLoungeDetail = TypesOnAirPlaceDetail & TypesLoungeProperty;
export type TypesCafeDetail = TypesOnAirPlaceDetail & TypesCafeProperty;