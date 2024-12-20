"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
    redirect,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import ShareButton from "../../../_utils/onShareSns";
import RouterBar from "@/app/(main)/_components/router-bar";
import { Facility } from "@/app/_const/facility";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import FacilityDetailContent from "@/app/(main)/_components/facilitiy-detail/facility-detail-content";
import { Button } from "@/components/ui/button";
import Share from "@/public/icons/share.svg";
import { toast } from "sonner";
import { useSearchKeywordConvi } from "@/hooks/useSearchKeywordConvi";
import { koreanToEnglish } from "@/app/(main)/_components/image-title-description";
import { cn } from "@/lib/utils";
import CarouselIndicator from "@/components/ui/carousel-indicator";

const fetchBuildingFacility = async (
    buildingName: string,
    type: string,
    facName: string
) => {
    const newType = type === "carrel" ? "studyRoom" : type;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/f/${newType}?buildingName=${buildingName}&facilityName=${facName}`
    );
    return response.json();
};

export interface ResponseFacilityDetail {
    buildingName?: string;
    buildingNum?: string;
    type?: string;
    //라운지용
    loungeName?: string;
    //그룹스터디룸용
    reservation?: string;
    reservationSite?: string;
    studentIdCardTagging?: string;
    studyRoomName?: string;
    //카페용
    cafeName?: string;
    weekdayAvailableTime?: string;
    weekendAvailableTime?: string;
    //
    keyword?: string;
    mood?: string;
    conversation?: string;
    socket?: string;
    feature?: string;
    picFile?: string;
    placeExplain?: string;
    floorFacilityImage?: string;
}

const Detail = () => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const type: string = params.get("type") || "";
    const facName: string = params.get("facName") || "";
    const facFloor: string = params.get("facFloor") || "";
    const facility: Facility = type as Facility;
    const building = params.get("building");
    const shareString: string | null = params.get("share");
    const fromRecommend = params.get("fromRecommend") === "true";
    const share: boolean | null =
        shareString !== null ? shareString.toLowerCase() === "true" : null;
    const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;

    const shareUrl = `${mainURL}${pathname}?type=${type}&facName=${facName}&facFloor=${facFloor}&building=${building}&share=true`;

    if (!type || !building) redirect("/home");

    const {
        isPending: facilityIsPending,
        error: facilityError,
        data: facilityData,
    } = useQuery<ResponseFacilityDetail>({
        queryKey: ["facilityDetailInfo", building, facName],
        queryFn: () =>
            fetchBuildingFacility(building, koreanToEnglish(type), facName),
    });

    let images = facilityData?.picFile?.split(",").map((value) => value.trim());

    const justOne = !fromRecommend || facilityError;
    const isHaksik = facName.includes("학식");

    useEffect(() => {
        console.log("images... ", images);
        console.log("fetch Data... ", facilityData);
        console.log("building", building, "type", type, "facName", facName);
    }, [facilityData, images]);

    return (
        <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0 relative">
            <div className="flex flex-col justify-start  mt-8 mb-2 mx-3">
                <RouterBar share={share} fromRecommend={fromRecommend} />
                <p className="font-mono text-2xl mt-6 mx-3">
                    {building} {facName}
                </p>
                <p className="font-mono text-sm mt-2 mx-3">
                    {facilityData?.placeExplain}
                </p>
                {
                    images &&
                    <CarouselIndicator srcSet={images.map(el => `/fac-img/${building}/${facFloor}/${el}.jpg`)}
                        alts={images}
                        className='mx-5 my-6 rounded-[10px]' />
                }
                <FacilityDetailContent facilityData={facilityData!} />
                <div className="bg-white mt-5" />
                {justOne && (
                    <ShareButton title={`${building} ${type}`} url={shareUrl} size="lg" />
                )}
                {fromRecommend && !facilityError && (
                    <div className="absolute bottom-20 w-full px-3 flex flex-row items-center justify-center ">
                        <ShareButton title="" url={shareUrl} size={"sm"} />
                        <Button
                            className={cn(
                                isHaksik ? "bg-gray-400" : "bg-[#FFF0F3]",
                                "w-full mx-3"
                            )}
                            onClick={() => {
                                if (!isHaksik) {
                                    router.push(
                                        `/b?type=${type}&building=${building}&onlyFloor=${true}`
                                    );
                                }
                            }}
                        >
                            <span className={cn(isHaksik ? "text-black" : "text-main")}>
                                위치 보기
                            </span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Detail;
