export type TypesOnAirPlace = {
    buildingName: string;
    floor: string;
    placeName: string;
    placeType: string;
    vote: number;
    result: number;
    like: boolean;
}

export type TypesBuildingFilterType = 'buildingName' | 'type';

export type TypesBuildingFilter = {
    type: TypesBuildingFilterType;
    value: string;
}