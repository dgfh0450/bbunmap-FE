"use client";

import { Button } from "@/components/ui/button";
import { useTabBarStore } from "@/hooks/useTabBar";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import OnAirPlaceCard from "../../_components/onair-place/onair-place-card";
import { useOnAirModal } from "@/hooks/useOnAirModal";
import OnAirPlaceModal from "../../_components/onair-place/onair-place-modal";
import { useStoreLoginState } from "@/hooks/useStoreLoginState";
import Request from "@/lib/fetch";
import { TypesOnAirPlace } from "./onAir";
import { useSession } from "next-auth/react";

type TypesBuildingFilterType = 'buildingName' | 'type';

type TypesBuildingFilter = {
    type: TypesBuildingFilterType;
    value: string;
}

const fetchCategoryData = (filterType: TypesBuildingFilter | undefined
): Promise<TypesOnAirPlace[]> => {
    const request = new Request();
    if (filterType === undefined) {
        return request.get('/api/realTime/places');
    }
    else {
        return request.get(`/api/realTime/places?${filterType.type}=${filterType.value}`);
    }
};

const buildingList = ['SK미래관', '과학도서관', '백주년기념관', '중앙광장 지하']
const typeList = ['카페', '라운지']

const OnAir = () => {
    const [selectedCategory, setSelectedCategory] = useState<TypesBuildingFilter | undefined>();
    const { isPlaceModalOpen, setIsPlaceModalOpen, resetPlaceModal, selectedPlace, setSelectedPlace } = useOnAirModal();
    const { isSaving, setIsSaving, state, setState, resetState } = useStoreLoginState();
    const { update, data: session, status } = useSession();
    console.log(session);

    // const [places, setPlaces] = useState([]);

    const { data: places, error, isLoading } = useQuery<TypesOnAirPlace[]>({
        queryKey: ['buildingCategory', selectedCategory?.value],
        queryFn: () => fetchCategoryData(selectedCategory),
        staleTime: 300000,
        refetchInterval: 300000,
    });

    // const getPlace = async () => {
    //     console.log(session);
    //     const request = new Request();
    //     const response = await request.get('/api/realTime/places');
    //     console.log(response);
    // }


    const handleCategory = (e: MouseEvent<HTMLButtonElement>, type: TypesBuildingFilterType) => {
        const value = e.currentTarget.value;
        if (value == selectedCategory?.value) setSelectedCategory(undefined);
        else setSelectedCategory({ type: type, value: value });
    }

    useEffect(() => {
        // getPlace();
        if (isSaving) {
            setIsPlaceModalOpen(true);
            setSelectedPlace(state['selectedPlace'])
        }
    }, [])


    return (
        <div className="w-full max-w-[450px] h-full left-0 top-0 py-[15px] relative flex flex-col justify-start items-center mb-[68px]" >
            <div className="w-full px-[15px] pl-[22px]">
                <div className="w-full flex mt-[50px] mb-[25px] flex items-start" >
                    <h1 className="text-[24px] font-bold">실시간</h1>
                </div>
            </div>
            <div className="w-full flex-1  px-[15px] overflow-y-scroll scrollbar-hide">
                <div className="w-full flex flex-col justify-start items-center mb-5" >
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
                                        {data} {selectedCategory?.value == data && <Image className="ml-1.5" src={'/onAir/close.svg'} width={15} height={15} alt='disable' />}
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-5" >
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
                                        {data} {selectedCategory?.value == data && <Image className="ml-1.5" src={'/onAir/close.svg'} width={15} height={15} alt='disable' />}
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="w-full flex flex-col justify-start items-center" >
                    <p className="w-full font-semibold text-xl text-black mb-5 mt-8 ml-[3px]">남은 자리를 확인해보세요</p>
                    {
                        places && places.map((data: TypesOnAirPlace, index: number) => {
                            return (
                                <OnAirPlaceCard key={index} {...data} />
                            )
                        })
                    }

                </div>
                {isPlaceModalOpen &&
                    <OnAirPlaceModal />
                }
            </div>
        </div>
    );
};

export default OnAir;