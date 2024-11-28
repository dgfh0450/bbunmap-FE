"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TypesOnAirPlace } from '../onAir';
import Request from '@/lib/fetch';

import styles from '../../../_components/onair-place/gradient.module.css';

import SpaceNone from '@/public/onAir/space_none.svg';
import SpaceLow from '@/public/onAir/space_low.svg';
import SpaceNormal from '@/public/onAir/space_normal.svg';
import SpaceEnough from '@/public/onAir/space_enough.svg';
import SpacePlenty from '@/public/onAir/space_plenty.svg';
import Arrow from '@/public/Arrow.svg';
import Star from '@/public/onAir/Star_fill.svg';
import StarNone from '@/public/onAir/Star_none.svg';
import Link from 'next/link';
import { getOnAirPlace } from '../fetch';
import { useSession } from 'next-auth/react';



export default function OnAirResultDetail() {
    const params = useSearchParams();
    const queryPlace = params.get("place");

    const { status: statusSession, data: session } = useSession();
    const { status, data: place, error } = useQuery({ queryKey: [queryPlace], queryFn: () => getOnAirPlace(queryPlace, session) });

    if (!queryPlace || !place || error) return <div>no place</div>

    const { buildingName, floor, placeName, placeType, vote, result, like, voteAvailable } = place;

    return (
        <div className='w-full max-w-[450px] h-full py-[51px] relative flex flex-col justify-start'>
            <div className='mx-5'>
                <div className='flex flex-row justify-between mb-5'>
                    <Link href={'/onAir/result'}><Arrow stroke='#000000' width={12} height={22.5} strokeWidth={0.6} className=' rotate-180 translate-x-[20%]' /></Link>
                    <button className=''>
                        {like ?
                            <Star /> :
                            <StarNone />
                        }
                    </button>
                </div>
                <h2 className='font-bold text-[21px]'>{place.buildingName} {placeName}</h2>
                <p className='font-regular text-[13px] text-gray-500'>{place.buildingName} {place.floor}층</p>
            </div>
            <div className='relative my-16 mx-5'>
                {(() => {
                    switch (true) {
                        case vote <= 20:
                            return <SpaceNone />;
                        case vote <= 40:
                            return <SpaceLow className='relative left-[25%] translate-x-[-50%]' />;
                        case vote <= 60:
                            return <SpaceNormal className='relative left-[50%] translate-x-[-50%]' />;
                        case vote <= 80:
                            return <SpaceEnough className='relative left-[75%] translate-x-[-50%]' />;
                        default:
                            return <SpacePlenty className='relative left-[100%] translate-x-[-100%]' />;
                    }
                })()}
                <div className={`${styles.gradient_bar} w-full h-[15px] border border-[#E4E4E4] rounded-full mt-2 mb-2`} />
                <div className='flex justify-between'>
                    <span className='text-[13px]'>다 차 있어요</span>
                    <span className='text-[13px]'>빈 자리 많아요</span>
                </div>
            </div>
            <Link href={'/onAir'} className='w-auto border border-gray-100 mx-5 my-8 px-4 py-[11px] rounded-[5px] text-sm flex flex-row justify-between items-center'>
                <span><span className='text-point font-bold'>실시간 정보</span>는 어떻게 수집되나요</span>
                <Arrow stroke='rgb(209 213 219)' className='' width={8} height={15} />
            </Link>
            <div className='w-full h-[8px] bg-gray-50' />
            <div className='px-5 py-[18px]'>
                <div className='flex flex-row justify-between'>
                    <p className='font-semibold text-lg'>상세정보</p>
                    <Link href={'/'} className='flex flex-row items-center font-semibold text-[13px]'>공간 위치보기 <Arrow className='ml-2' stroke='#000000' width={6.4} height={12} /></Link>
                </div>
                <div className='w-[full] h-[180px]'></div>
                <div>
                    <p className='text-sm mb-[11px]'><span className='inline-block text-gray-500 w-[45px] mr-1 font-medium'>분위기</span> <span className='text-sm font-regular'>자는 분위기</span></p>
                    <p className='text-sm mb-[11px]'><span className='inline-block text-gray-500 w-[45px] mr-1 font-medium'>분위기</span> <span className='text-sm font-regular'>자는 분위기</span></p>
                    <p className='text-sm mb-[11px]'><span className='inline-block text-gray-500 w-[45px] mr-1 font-medium'>분위기</span> <span className='text-sm font-regular'>자는 분위기</span></p>
                    <p className='text-sm mb-[11px]'><span className='inline-block text-gray-500 w-[45px] mr-1 font-medium'>분위기</span> <span className='text-sm font-regular'>자는 분위기</span></p>
                </div>
            </div>
        </div >
    )
}
