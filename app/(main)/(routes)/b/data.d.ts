import {
    TypesCafeProperty,
    TypesDetailBase,
    TypesLoungeProperty,
    TypeStudyRoomProperty,
    TypesRestaurantProperty,
    TypesRestRoomProperty,
    TypesReadingRoomProperty
} from '../../types';

type Feature = {
    feature: string;
};

export interface TypesFacilitiesBase extends TypesDetailBase {
    id: number;
}

export type TypesFacilityCafe = TypesFacilitiesBase & TypesCafeProperty & Feature;
export type TypesFacilityLounge = TypesFacilitiesBase & TypesLoungeProperty & Feature;
export type TypesFacilityStudyRoom = TypesFacilitiesBase & TypesStudyRoomProperty & Feature;
export type TypesFacilityRestaurant = TypesFacilitiesBase & TypesRestaurantProperty & Feature;
export type TypesFacilityRestRoom = TypesFacilitiesBase & TypesRestRoomProperty;
export type TypesFacilityReadingRoom = TypesFacilitiesBase & TypesReadingRoomProperty & Feature;


export interface TypesFacilityBuildingName {
    buildingName: string;
    floor: string;
    lounge: TypesFacilityLounge[];
    readingRoom: TypesFacilityReadingRoom[];
    studyRoom: TypesFacilityStudyRoom[];
    cafe: TypesFacilityCafe[];
    restaurant: TypesFacilityRestaurant[];
    convenienceStore: [],
    restRoom: TypesFacilityRestRoom[],
    stationeryStoreName: []
}

export type TypesBuildingLocation = {
    lat: number;
    lon: number;
    buildingName: string;
}