"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Request from "@/lib/fetch";
import { TypesOnAirPlace } from "./onAir";
import { useQuery } from "@tanstack/react-query";
import OnAirVoteCard from "../../_components/onair/vote/onair-vote-card";


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


const OnAirVote = () => {
    const { data: places, error, isLoading } = useQuery<TypesOnAirPlace[]>({
        queryKey: ['buildingCategory',],
        queryFn: () => fetchCategoryData(undefined),
        staleTime: 300000,
        refetchInterval: 300000,
    });

    return (
        <div className="w-full flex-1 overflow-y-scroll scrollbar-hide">
            <div className="w-auto flex flex-col items-center justify-between mt-5 px-6 mb-10">
                <div className="w-full flex flex-row justify-between">
                    <div className="h-auto flex flex-col justify-around py-2">
                        <p className="self-start text-gray-500 font-regular rounded-full text-[11px] px-[7px] py-[6px] bg-gray-50">누적 투표 횟수</p>
                        <p className="font-bold text-[25px]">🗳️ 10회</p>
                        <p className="font-regular text-[13px] text-gray-500">5번 더 투표하면 Level 2</p>
                    </div>
                    <Image src='/onAir/vote_header.png' width={140} height={132} alt="vote header" className="translate-y-[15px] translate-x-[-15px]" />
                </div>
                <div className="w-full h-[12px] rounded-full bg-[#ededed] relative">
                    <div className={cn("absolute border-[6px] rounded-full border-[#EFED63]",
                        "w-[50%]"
                    )} />
                    <p className="absolute right-0 bottom-0 text-gray-500 font-regular text-[11px] translate-y-[100%]" >15/20</p>
                </div>
            </div>
            <ul className="w-full min-h-full bg-[#F8F8F8] overflow-y-scroll rounded-[30px] p-[15px]">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(data =>
                    <OnAirVoteCard />
                )}
            </ul>
        </div>
    );
};

export default OnAirVote;