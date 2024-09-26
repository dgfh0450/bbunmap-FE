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

interface test { building: string, place: string, value: number }

// const response = await fetch(
// `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilityList?buildingName=${buildingName}`
// );
// return response.json();
const fetchCategoryData = async (place: string
): Promise<test[]> => {
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_INTERNAL_URL + `/api/test`
    );
    return response.json();
};

const buildingList = ['SK미래관', '과학도서관', '백주년기념관', '중앙광장 지하']
const typeList = ['카페', '라운지']

const OnAir = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { isPlaceModalOpen, setIsPlaceModalOpen, handlePlaceModalOpen, selectedPlace, setSelectedPlace } = useOnAirModal();
    const { data, error, isLoading } = useQuery<test[]>({
        queryKey: ['buildingCategory', selectedCategory],
        queryFn: () => fetchCategoryData(selectedCategory),
        staleTime: 300000,
        refetchInterval: 300000,
    });

    const handleCategory = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        if (value == selectedCategory) setSelectedCategory('');
        else setSelectedCategory(value);
    }


    return (
        <div className="w-full max-w-[450px] h-full left-0 top-0 p-[15px]" >
            <div className="relative flex flex-col justify-start items-center" >
                <div className="w-full pl-[22px]">
                    <div className="w-full flex mt-[50px] mb-[25px] flex items-start" >
                        <h1 className="text-[24px] font-bold">실시간</h1>
                    </div>
                </div>
                <div className="w-full overflow-scroll">
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
                                        <button value={data} onClick={handleCategory} className={`flex items-center border px-[13px] py-[8px] rounded-full border-gray-100 text-gray-400 text-[13px] ${selectedCategory == data && 'bg-[black]'}`} >
                                            {data} {selectedCategory == data && <Image className="ml-1.5" src={'/onAir/close.svg'} width={15} height={15} alt='disable' />}
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
                                        <button value={data} onClick={handleCategory} className={`flex items-center border px-[13px] py-[8px] rounded-full border-gray-100 text-gray-400 text-[13px] ${selectedCategory == data && 'bg-[black]'}`} >
                                            {data} {selectedCategory == data && <Image className="ml-1.5" src={'/onAir/close.svg'} width={15} height={15} alt='disable' />}
                                        </button>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div className="w-full flex flex-col justify-start items-center" >
                        <p className="w-full font-semibold text-xl text-black mb-5 mt-8 ml-[3px]">남은 자리를 확인해보세요</p>
                        {data && data.map((data: test, index: number) => {
                            return (
                                <OnAirPlaceCard key={index} value={data.value} placeName={data.place} buildingName={data.building} />
                            )
                        })}
                    </div>
                    {isPlaceModalOpen &&
                        <OnAirPlaceModal />
                    }
                </div>
            </div>
        </div>
    );
};

export default OnAir;