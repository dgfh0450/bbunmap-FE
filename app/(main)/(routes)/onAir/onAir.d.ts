export type TypeResponseOnAirPlace = {
    closestResetTime: string;
    specificUserRealTimeDTOArr: TypesOnAirPlace[];
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
}

export type TypesBuildingFilterType = 'buildingName' | 'type';

export type TypesBuildingFilter = {
    type: TypesBuildingFilterType;
    value: string;
}

export type TypesPlaceDetailBase = {
    buildingName: string;
    buildingNum: string;
    type: string;
    keyword: string;
    picFile: string | null;
    placeExplain: string;
    floorFacilityImage: string | null;
    [key: string]: string;
}

export interface TypesCafeDetail extends TypesPlaceDetailBase {
    cafeName: string;
    location: string;
    weekdayAvailableTime: string;
    weekendAvailableTime: string;
}

export interface TypesLoungeDetail extends TypesPlaceDetailBase {
    loungeName: string;
    mood: string;
    conversation: string;
    socket: string;
}