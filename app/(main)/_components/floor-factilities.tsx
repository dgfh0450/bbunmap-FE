import { useEffect } from "react";
import { BuildingInfo, Facility } from "../(routes)/b/page";
import { ImageTitleDescription } from "./image-title-description";

interface FloorFacilitiesProps {
    floor: number | string;
    facilities: Facility[];
    buildingName: string;
    buildInfo?: BuildingInfo;
    urlType: string;
    facFloor: string;
}

export const FloorFactilities = ({
    floor,
    facilities,
    buildingName,
    buildInfo,
    urlType,
    facFloor,
}: FloorFacilitiesProps) => {
    // useEffect(() => {
    //   console.log(
    //     "1234",
    //     floor,
    //     facilities,
    //     buildingName,
    //     buildInfo,
    //     urlType,
    //     facFloor
    //   );
    // }, [buildInfo, buildingName, facFloor, facilities, floor, urlType]);

    return (
        <div className="flex flex-col justify-start mt-4">
            <p className="font-medium flex justify-between items-center text-gray-500 py-2 w-full text-base bg-gray-50 pl-[22px]">{floor}층</p>
            <div className="flex flex-row justify-between items-center flex-wrap px-4 pt-[10px]">
                {facilities.map((fac) => {
                    return (
                        <ImageTitleDescription
                            key={fac.name}
                            title={fac.name}
                            description={fac.type}
                            buildingName={buildingName}
                            image={fac.image_src}
                            urlType={urlType}
                            facFloor={facFloor}
                        />
                    );
                })}
            </div>
        </div >
    );
};
