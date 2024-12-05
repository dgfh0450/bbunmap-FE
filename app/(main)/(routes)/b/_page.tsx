"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Arrow from '@/public/Arrow.svg';
import Document from "@/public/icons/document.svg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBuildingFacilities } from "./fetch";

export default function ReadQuery({ searchParams, }: {
    searchParams: { [key: string]: string };
}) {
    const router = useRouter();
    const [isFloor, setIsFloor] = useState<boolean>(false);
    const buildingName = searchParams.building;
    const type = searchParams.type;
    const { data: facilities, error: error, status } = useQuery({
        queryKey: ['facilities', buildingName, type],
        queryFn: () => getBuildingFacilities(buildingName)
    })

    useEffect(() => {
        if (searchParams.floor) {
            setIsFloor(Boolean(searchParams.floor));
        }
    }, [])

    return (
        <div className='w-full max-w-[450px] h-full py-[51px] relative flex flex-col justify-start'>
            <div className='mx-4'>
                <div className='flex flex-row justify-between items-center mb-[11px]'>
                    <button onClick={() => router.back()}><Arrow stroke='#000000' width={12} height={22.5} strokeWidth={0.6} className=' rotate-180 translate-x-[20%]' /></button>
                    <Link className="bg-[#E9EBED] font-semibold text-xs flex items-center px-[10px] py-[7px] rounded-full" href={'/home'}><Document className="mr-1.5" />건물 위치 보기</Link>
                </div>
                <div className="w-full flex">
                    <button onClick={() => { setIsFloor(false) }} className={cn('w-full py-[9px] rounded-[7px]', isFloor ? 'bg-white text-gray-500' : 'bg-black text-white font-medium text-[15px]')} >공간목록</button>
                    <button onClick={() => { setIsFloor(true) }} className={cn('w-full py-[9px] rounded-[7px]', !isFloor ? 'bg-white text-gray-500' : 'bg-black text-white font-medium text-[15px]')} >실내지도</button>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
