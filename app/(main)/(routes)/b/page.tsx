"use client";

import { FloorFactilities } from "@/app/(main)/_components/floor-factilities";
import TopToggleMenu from "@/app/(main)/_components/list-floor-top-bar";
import RouterBar from "@/app/(main)/_components/router-bar";
import TitleImage from "@/app/(main)/_components/title-image";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchKeywordConvi } from "@/hooks/useSearchKeywordConvi";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
import Arrow from '@/public/Arrow.svg';
import Document from "@/public/icons/document.svg";

export type Facility = {
    type: string;
    name: string;
    image_src: string;
};

interface FacResponse {
    id: number;
    buildingName: string;
    type: string;
    //
    loungeName?: string;
    readingRoomName?: string;
    studyRoomName?: string;
    cafeName?: string;
    restaurantName?: string;
    convenienceStoreName?: string;
    restRoomName?: string;
    stationeryStoreName?: string;
    //
    keyword: string;
    mood: string;
    conversation: string;
    socket: string;
    feature: string;
    picFile: string;
    placeExplain: string;
}

export interface BuildingInfo {
    buildingName: string;
    floor: string;
    [key: string]: any;
    lounge: FacResponse[];
    readingRoom: FacResponse[];
    studyRoom: FacResponse[];
    cafe: FacResponse[];
    restaurant: FacResponse[];
    convenienceStore: FacResponse[];
    restRoom: FacResponse[];
    stationeryStoreName: FacResponse[];
}

type TopMenu = "list" | "floormap";

const fetchBuildingFacilities = async (buildingName: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilities?buildingName=${buildingName}`
    );
    return response.json();
};

const Building = () => {
    const router = useRouter();
    const params = useSearchParams();
    const buildingName: string = params.get("building") || "default";
    const toggleMenuHide: boolean = params.get("menuHide") === "true";
    const onlyFloor: boolean = params.get("onlyFloor") === "true";
    const fromOnAir: boolean = params.get("fromOnAir") === "true";
    const fromBuildingDetail: boolean =
        params.get("fromBuildingDetail") === "true";
    const urlType: string = params.get("type") || "";
    const urlTypes: string[] = urlType.split(";");
    const [selectedMenu, setSelectedMenu] = useState<TopMenu>("list");
    const { isSearchKeywordConvi } = useSearchKeywordConvi();

    const isOnlyConvenienceType =
        urlTypes.length === 1 && urlType === "convenience";

    // const isConvenienceType =
    //   urlTypes.includes("convenience") || isSearchKeywordConvi;
    const isConvenienceType = isSearchKeywordConvi;

    const {
        isPending: facilityIsPending,
        error: facilityError,
        data: facilityData,
    } = useQuery<BuildingInfo[]>({
        queryKey: ["facilityList", buildingName],
        queryFn: () => fetchBuildingFacilities(buildingName),
    });


    //OnAir에서 넘어온 경우, Floor Map을 시작으로 설정
    useEffect(() => {
        if (fromOnAir)
            setSelectedMenu("floormap");
    }, [])

    useEffect(() => {
        if (
            isConvenienceType ||
            onlyFloor ||
            (fromBuildingDetail && isOnlyConvenienceType)
        ) {
            setSelectedMenu("floormap");
        }
        // console.log(urlTypes, urlTypes.length);
        console.log("fetched data...", facilityData);
        console.log("is", isSearchKeywordConvi);
    }, [
        facilityData,
        isConvenienceType,
        isSearchKeywordConvi,
        urlTypes,
        onlyFloor,
    ]);

    const facilitiesTypes = [
        "lounge",
        "readingRoom",
        "studyRoom",
        "cafe",
        "restaurant",
        "convenienceStore",
        "restRoom",
        "stationeryStoreName",
    ];


    const groupedFacilities = facilityData?.reduce(
        (acc: any, buildingInfo: BuildingInfo) => {
            if (!acc[buildingInfo.floor]) {
                const newType =
                    urlTypes.length === 2
                        ? urlType.includes("carrel")
                            ? "carrel&studyRoom"
                            : "cafe&restaurant"
                        : urlType === "carrel"
                            ? "carol"
                            : isSearchKeywordConvi
                                ? "convenience"
                                : isOnlyConvenienceType
                                    ? fromBuildingDetail
                                        ? "convenience"
                                        : "onlyConvenience"
                                    : urlType;
                console.log(
                    "newType...",
                    newType,
                    isSearchKeywordConvi,
                    fromBuildingDetail,
                    isOnlyConvenienceType
                );
                const floorKey = `${buildingInfo.floor}층`; // '층'을 붙여서 키를 문자열로 만듦
                if (!acc[floorKey]) {
                    // acc 객체에서 floorKey를 사용
                    acc[floorKey] = {
                        buildingName: buildingInfo.buildingName,
                        floor: buildingInfo.floor,
                        facilities: [],
                        floorMap: {
                            floor: buildingInfo.floor,
                            image: `/floorMap/${buildingInfo.buildingName}/${buildingInfo.floor}/${newType}.png`,
                        },
                    };
                }
            }
            facilitiesTypes.forEach((type) => {
                buildingInfo[type].forEach((fac: FacResponse) => {
                    urlTypes.forEach((urlType) => {
                        if (urlType === "" || isEnglishAndKoreanSame(fac.type, urlType)) {
                            // fac.type이 type과 동일한 경우에만 추가
                            acc[`${buildingInfo.floor}층`].facilities.push({
                                type: fac.type,
                                name: getFacilityName(type, fac),
                                image_src: `/fac-img/${fac.buildingName}/${buildingInfo.floor
                                    }/${fac.picFile?.split(",")[0].trim()}.jpg`,
                            });
                        }
                    });
                });
            });
            return acc;
        },
        {}
    );

    const facilitiesByFloor = groupedFacilities
        ? Object.values(groupedFacilities)
        : [];

    return (
        <div className='w-full max-w-[450px] h-full py-[51px] relative flex flex-col justify-start'>
            <div className='mx-4'>
                <div className='flex flex-row justify-between items-center mb-[11px]'>
                    <button onClick={() => router.back()}><Arrow stroke='#000000' width={12} height={22.5} strokeWidth={0.6} className=' rotate-180 translate-x-[20%]' /></button>
                    <Link className="bg-[#E9EBED] font-semibold text-xs flex items-center px-[10px] py-[7px] rounded-full" href={`/home?buildingName=${buildingName}`}><Document className="mr-1.5" />건물 위치보기</Link>
                </div>
                <div className="w-full flex">
                    <button onClick={() => { setSelectedMenu('list') }} className={cn('w-full py-[9px] rounded-[7px]', selectedMenu == 'list' ? 'bg-black text-white font-medium text-[15px]' : 'bg-white text-gray-500 text-[15px]')} >공간목록</button>
                    <button onClick={() => { setSelectedMenu('floormap') }} className={cn('w-full py-[9px] rounded-[7px]', selectedMenu == 'floormap' ? 'bg-black text-white font-medium text-[15px]' : 'bg-white text-gray-500 text-[15px]')} >실내지도</button>
                </div>
            </div>
            {
                facilityIsPending ?
                    <div>
                        <div className="flex flex-col justify-start mt-4">
                            {selectedMenu === "list" ?
                                <>
                                    {
                                        Array(3).fill(0).map((el, index) =>
                                            <div key={`b-list-skeleton-${index}`}>
                                                <Skeleton className="h-[40px] w-full rounded-none" />
                                                <div className="flex flex-row justify-between items-center flex-wrap px-4 pt-[10px] mb-[14px]">
                                                    <div
                                                        className="flex-col flex items-start justify-start w-[48%] overflow-hidden cursor-pointer mb-9"
                                                    >
                                                        <Skeleton className="relative w-full h-[120px] rounded-[5px] overflow-hidden mb-2" />
                                                        <Skeleton className="h-[24.5px] w-[50%] font-medium overflow-hidden whitespace-nowrap text-overflow-ellipsis mb-1" />
                                                        <Skeleton className="h-[23px] w-[30%] text-[#A0A4A8]" />
                                                    </div>
                                                    <div
                                                        className="flex-col flex items-start justify-start w-[48%] overflow-hidden cursor-pointer mb-9"
                                                    >
                                                        <Skeleton className="relative w-full h-[120px] rounded-[5px] overflow-hidden mb-2" />
                                                        <Skeleton className="h-[24.5px] w-[50%] font-medium overflow-hidden whitespace-nowrap text-overflow-ellipsis mb-1" />
                                                        <Skeleton className="h-[23px] w-[30%] text-[#A0A4A8]" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                                :
                                <>
                                    {
                                        Array(3).fill(0).map((el, index) =>
                                            <div key={`b-floor-skeleton-${index}`}>
                                                <div className="flex flex-col justify-start items-start " >
                                                    <Skeleton className="h-[40px] w-full rounded-none" />
                                                    <Skeleton className="w-full h-[200px] flex flex-col px-4 mb-[60px] mt-3 justify-start rounded-none" />
                                                </div>
                                            </div>
                                        )
                                    }
                                </>

                            }

                        </div >
                    </div >
                    :
                    <div>
                        {selectedMenu === "list" &&
                            facilitiesByFloor.map((buildingInfo: any, index: number) => {
                                console.log(index, buildingInfo);
                                return (
                                    <FloorFactilities
                                        buildingName={buildingInfo.buildingName}
                                        floor={buildingInfo.floor}
                                        facilities={buildingInfo.facilities}
                                        key={`${buildingInfo.floor} ${buildingName}`}
                                        urlType={urlType}
                                        facFloor={buildingInfo.floor}
                                    />
                                );
                            })}
                        {selectedMenu === "floormap" &&
                            facilitiesByFloor.map((value: any, index) => {
                                console.log(index, value);
                                return (
                                    <TitleImage
                                        key={index}
                                        titleImage={[
                                            {
                                                title: `${value.floorMap.floor}층`,
                                                imageSrc: value.floorMap.image,
                                            },
                                        ]}
                                        titleBackground={true}
                                    />
                                );
                            })}
                    </div>
            }
        </div >
    );
};

const FacSkeleton = () => {
    return (
        <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-auto my-0">
            <Skeleton className="flex flex-col justify-end mt-8 mb-2 ml-3">
                <Skeleton className="h-6 bg-gray-300 rounded animate-pulse"></Skeleton>
                <Skeleton className="flex flex-row justify-evenly items-center mt-4">
                    <Skeleton className="w-24 h-6 bg-gray-300 rounded animate-pulse"></Skeleton>
                    <Skeleton className="w-24 h-6 bg-gray-300 rounded animate-pulse"></Skeleton>
                </Skeleton>
                <Skeleton className="mt-4">
                    {[...Array(5)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-24 bg-gray-300 rounded mt-4 animate-pulse"
                        ></Skeleton>
                    ))}
                </Skeleton>
            </Skeleton>
        </div>
    );
};

const getFacilityName = (type: string, fac: FacResponse) => {
    switch (type) {
        case "lounge":
            return fac.loungeName;
        case "readingRoom":
            return fac.readingRoomName;
        case "studyRoom":
            return fac.studyRoomName;
        case "cafe":
            return fac.cafeName;
        case "restaurant":
            return fac.restaurantName;
        case "convenienceStore":
            return fac.convenienceStoreName;
        case "restRoom":
            return fac.restRoomName;
        case "stationeryStoreName":
            return fac.stationeryStoreName;
        default:
            return "";
    }
};

export default Building;

function englishToKorean(type: string) {
    switch (type) {
        case "cafe":
            return "카페";
        case "convenience":
            return "편의점";
        case "lounge":
            return "라운지";
        case "readingRoom":
            return "열람실";
        case "restaurant":
            return "식당";
        case "restRoom":
            return "수면실";
        case "stationery":
            return "문구점";
        case "studyRoom":
            return "그룹스터디룸";
        case "sleepingRoom":
            return "수면실";
        case "carrel":
            return "캐럴";
        default:
            return type; // 알 수 없는 type에 대해서는 그대로 반환
    }
}

function isEnglishAndKoreanSame(facType: string, urlType: string) {
    // fac.type === englishToKorean(urlType)
    const urlTypeToKorean = englishToKorean(urlType);
    if (urlTypeToKorean === "그룹스터디룸") {
        return (
            facType === urlTypeToKorean ||
            facType === "스터디룸" ||
            facType === "그룹룸"
        );
    }
    return facType === urlTypeToKorean;
}
