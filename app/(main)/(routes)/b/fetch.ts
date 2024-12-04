import Request from "@/lib/fetch";
import { TypesBuildingLocation, TypesFacilityBuildingName } from "./data";

export const getBuildingFacilities = (buildingName: string): Promise<TypesFacilityBuildingName> => {
    const request = new Request();
    return request.get(`/facilities?buildingName=${buildingName}`)
};
