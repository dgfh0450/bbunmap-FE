export type TypesDetailBase = {
    buildingName: s
    type: string;
    picFile: string | null;
    placeExplain: string;
    [key: string]: string;
}

export type TypesCafeProperty = {
    cafeName: string;
    location: string;
    weekdayAvailableTime: string;
    weekendAvailableTime: string;
    keyword: string;
    floorFacilityImage: string | null;
}

export type TypesLoungeProperty = {
    loungeName: string;
    mood: string;
    conversation: string;
    socket: string;
    keyword: string;
    floorFacilityImage: string | null;
}

export type TypesStudyRoomProperty = {
    studyRoomName: string;
    locationExplain: string;
    weekdayAvailable: string;
    weekendAvailable: string;
    reservation: string;
    reservationSite: string;
    studentIdCardTagging: string;
}

export type TypesRestaurantProperty = {
    restaurantName: string;
    weekdayAvailableTime: string;
    weekendAvailableTime: string;
    location: string;
    keyword: string;
    floorFacilityImage: string | null;
}
export type TypesRestRoomProperty = {
    restRoomName: string;
    locationExplain: string;
    weekdayAvailable: string;
    weekendAvailable: string;
    examPeriodAvailable: string;
    reservation: string;
    reservationSite: string;
    studentIdCardTagging: string;
}

export type TypesReadingRoomProperty = {
    readingRoomName: string;
    keyword: string;
    electronicDevice: string;
    reservationSite: string;
    reservation: string;
    availableTime: string;
}