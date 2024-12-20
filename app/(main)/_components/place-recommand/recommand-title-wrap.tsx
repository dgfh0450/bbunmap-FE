import { title } from "process";
import { RecommandedPlace } from "../../(routes)/recommend/place/page";
import {
    ImageTitleDescription,
    koreanToEnglish,
} from "../image-title-description";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { usePlaceRecommand } from "@/hooks/usePlaceRecommand";
import Arrow from '@/public/Arrow.svg';

interface RecommandTitleWrapProps {
    data: RecommandedPlace[] | undefined;
}

const RecommandTitleWrap = ({ data }: RecommandTitleWrapProps) => {
    const { isFullRecommand, setFullRecommandOpen, setKeyword } =
        usePlaceRecommand();

    useEffect(() => {
        console.log("rec Fetch data...", data);
    }, []);

    return (
        <>
            {data?.map((value, index) => (
                <div className="flex-1 flex flex-col justify-start mt-8" key={index}>
                    <p className="font-bold text-base py-1 rounded-md  flex justify-between items-center">
                        {value.title}
                        <button onClick={() => {
                            setFullRecommandOpen();
                            setKeyword(value.title);
                        }}><Arrow stroke='#000000' width={12} height={16} strokeWidth={0.6} className='' /></button>
                    </p>
                    <div className="flex flex-row justify-between items-center flex-wrap">
                        {value.places.length > 2
                            ? [...value.places]
                                .sort(() => 0.5 - Math.random())
                                .slice(0, 2)
                                .map((fac) => (
                                    <ImageTitleDescription
                                        key={
                                            fac.buildingName +
                                            fac.description +
                                            fac.placeName +
                                            fac.placeType
                                        }
                                        title={fac.placeName}
                                        description={fac.description}
                                        buildingName={fac.buildingName}
                                        image={fac.picFile ?? "/sample2.jpg"}
                                        route={`/f/detail?building=${fac.buildingName}&facName=${fac.placeName
                                            }&type=${koreanToEnglish(fac.placeType)}&facFloor=${fac.floor ?? "1"
                                            }&fromRecommend=${true}`}
                                        recommandTitle={value.title}
                                    />
                                ))
                            : value.places.map((fac) => (
                                <ImageTitleDescription
                                    key={
                                        fac.buildingName +
                                        fac.description +
                                        fac.placeName +
                                        fac.placeType
                                    }
                                    title={fac.placeName}
                                    description={fac.description}
                                    buildingName={fac.buildingName}
                                    image={fac.picFile ?? "/sample2.jpg"}
                                    route={`/f/detail?building=${fac.buildingName}&facName=${fac.placeName
                                        }&type=${koreanToEnglish(fac.placeType)}&facFloor=${fac.floor ?? "1"
                                        }&fromRecommend=${true}`}
                                    recommandTitle={value.title}
                                />
                            ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default RecommandTitleWrap;
