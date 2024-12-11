"use client";

import { Button } from "@/components/ui/button";
import { useTabBarStore } from "@/hooks/useTabBar";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import OnAirPlaceCard from "@/app/(main)/_components/onair/result/onair-place-card";
import Request from "@/lib/fetch";
import { TypeResponseOnAirPlace, TypesBuildingFilter, TypesBuildingFilterType, TypesOnAirPlace } from "../../onAir";
import { useSession } from "next-auth/react";
import { fetchOnAirPlaceList } from "../../fetch";
import Close from '@/public/onAir/close.svg';
import Clock from '@/public/onAir/clock.svg';
import DotMenu from '@/public/vertical-dots.svg';
import FullModal from "@/app/(main)/_components/FullModal";
import Moon from '@/public/onAir/Moon.svg';
import Connector from '@/public/onAir/connector.svg';
import { buildingList, typeList } from "../../fetch";
import { LoadingComponent, RefetchComponent } from "@/app/(main)/_components/fetch-component";
import { getUserInfo } from "../../../my/fetch";
import { calculateLevel } from "@/lib/userLevel";
import OnAirNight from "@/app/(main)/_components/onair/onair-night";
import OnAirTimeInfoModal from "@/app/(main)/_components/onair/onair-timeinfo-modal";

const OnAirResult = () => {
    const [selectedCategory, setSelectedCategory] = useState<TypesBuildingFilter | undefined>();
    const [modalOpenInfo, setModalOpenInfo] = useState<boolean>(false);
    const { update, data: session, status: statusSession } = useSession();
    const { data: userInfo, status: statusUserInfo, error: errorUserInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => getUserInfo(session, update),
        enabled: statusSession === 'authenticated'
    })
    const { data: response, error, status, refetch } = useQuery<TypeResponseOnAirPlace>({
        queryKey: ['buildingCategory', selectedCategory],
        queryFn: () => fetchOnAirPlaceList(selectedCategory, session),
        staleTime: 300000,
        refetchInterval: 300000,
        enabled: statusSession !== 'loading'
    });

    const handleCategory = (e: MouseEvent<HTMLButtonElement>, type: TypesBuildingFilterType) => {
        const value = e.currentTarget.value;
        if (value == selectedCategory?.value) setSelectedCategory(undefined);
        else setSelectedCategory({ type: type, value: value });
    }

    const handleModalOpen = () => {
        setModalOpenInfo(!modalOpenInfo);
    }


    const [level, remain] = calculateLevel(userInfo?.numOfRealTimeVote);
    return (

        <div className="w-full flex-1 overflow-y-scroll scrollbar-hide relative">
            <div className="w-auto flex flex-row items-center justify-between mx-4  px-[15px]">
                <p className="font-semibold text-xl">지금 이곳에 있는<br />학생들의 답변이에요!</p>
                <Image src={`/my/result-face/face-lv${level}.png`} width={120} height={120} alt="vote face" />
            </div>
            <div className="border-b-[6px] border-gray-50 bg-white px-5 py-[14px]">
                <div className="w-full flex flex-col justify-start items-center pb-[14px]" >
                    <p className="w-full font-semibold text-sm text-gray-500 mb-2 ml-[3px]">건물로 검색</p>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full self-center"
                    >
                        <CarouselContent>
                            {buildingList.map((data, index) => (
                                <CarouselItem className="basis-auto" key={index}>
                                    <button value={data} onClick={(e) => handleCategory(e, 'buildingName')} className={`flex items-center border px-[13px] py-[8px] rounded-full border-gray-100 text-gray-400 text-[13px] ${selectedCategory?.value == data && 'bg-[black]'}`} >
                                        {data} {selectedCategory?.value == data && <Close className="ml-1.5" width={15} height={15} fill="#E5E5E5" />}
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="w-full flex flex-col justify-start items-center" >
                    <p className="w-full font-semibold text-sm text-gray-500 mb-2 ml-[3px]">유형으로 검색</p>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full self-center"
                    >
                        <CarouselContent>
                            {typeList.map((data, index) => (
                                <CarouselItem className="basis-auto" key={index}>
                                    <button value={data} onClick={(e) => handleCategory(e, 'type')} className={`flex items-center border px-[13px] py-[8px] rounded-full border-gray-100 text-gray-400 text-[13px] ${selectedCategory?.value == data && 'bg-[black]'}`} >
                                        {data} {selectedCategory?.value == data && <Close className="ml-1.5" width={15} height={15} fill="#E5E5E5" />}
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

            </div>
            <div className="w-full flex flex-col justify-start items-center  px-[15px] pb-[100px]" >
                <p className="w-full font-semibold text-xl text-black mt-[42px] mb-[6px] ml-l">지금 빈 공간</p>
                {
                    response?.closestResetTime === 'none' ?
                        <div className="w-full flex flex-col items-center mt-2">
                            <OnAirNight handleModalOpen={handleModalOpen} />
                        </div> :

                        {
                            'error': <RefetchComponent message="결과 목록을 불러오지 못했어요" refetch={refetch} className="pt-[10%]" />,
                            'success':
                                <>
                                    <button
                                        onClick={handleModalOpen}
                                        className="w-full bg-[#F3F4F5] rounded-lg flex justify-between p-[10px] mt-[5px] font-regular text-gray-500 text-xs">
                                        <span className="flex items-center"><Clock className="m-[3px]" />{response?.closestResetTime}부터 현재까지 집계된 결과에요</span> <DotMenu />
                                    </button>
                                    <ul className="w-full">
                                        {
                                            response && response.specificUserRealTimeDTOArr.map((data: TypesOnAirPlace, index: number) => {
                                                return (
                                                    <li key={`onair-place-card-${index}`} className="mt-3"><OnAirPlaceCard {...data} /></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </>,
                            'pending': <LoadingComponent message="결과 목록을 불러오고 있어요" className="pt-[10%]" />
                        }[status]
                }
            </div>
            <OnAirTimeInfoModal
                modalOpen={modalOpenInfo}
                handleModalOpen={handleModalOpen}
            />
        </div>
    );
};

export default OnAirResult;