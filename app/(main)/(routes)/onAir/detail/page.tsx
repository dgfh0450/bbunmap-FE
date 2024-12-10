"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TypesOnAirPlace } from '../onAir';
import Request from '@/lib/fetch';

import styles from '../../../_components/onair/gradient.module.css';

import SpaceNone from '@/public/onAir/space_none.svg';
import SpaceLow from '@/public/onAir/space_low.svg';
import SpaceNormal from '@/public/onAir/space_normal.svg';
import SpaceEnough from '@/public/onAir/space_enough.svg';
import SpacePlenty from '@/public/onAir/space_plenty.svg';
import Arrow from '@/public/Arrow.svg';
import Star from '@/public/onAir/Star_fill.svg';
import StarNone from '@/public/onAir/Star_none.svg';
import Link from 'next/link';
import { BuildingTypeMap, detailCategoryMap, fetchLike, getOnAirPlace, getPlaceDetail } from '../fetch';
import { useSession } from 'next-auth/react';
import LoginError from '../CustomError';
import CarouselIndicator from '@/components/ui/carousel-indicator';
import { Skeleton } from '@/components/ui/skeleton';



export default function OnAirResultDetail() {
    const params = useSearchParams();
    const queryPlace = params.get("place");
    const { status: statusSession, data: session } = useSession();

    const { status: statusPlace, data: place, error, refetch } = useQuery({
        queryKey: [queryPlace],
        queryFn: () => getOnAirPlace(queryPlace, session),
        throwOnError: true,
    });

    const { status: statusDetail, data: detail, error: errorDetail } = useQuery({
        queryKey: ['detail', queryPlace],
        queryFn: () => {
            if (place && (place.placeType === '카페' || place.placeType === '라운지')) {
                return getPlaceDetail(place.buildingName, place.placeName, place.placeType);
            } else {
                throw new Error('Invalid placeType');
            }
        },
        throwOnError: true,
        enabled: !!place
    });

    const { data: responseLike, error: errorLike, status: statusLike, mutate } = useMutation({
        mutationFn: () => fetchLike(placeName, session),
        onSuccess: () => {
            refetch();
        },
        throwOnError: (e) => {
            if (e instanceof LoginError) return true;
            else return false;
        }
    })

    if (statusPlace == 'error' || statusDetail == 'error') throw new Error('Not Found')
    if (statusPlace == 'pending' || statusDetail == 'pending') return <DetailSkeleton />

    const { buildingName, floor, placeName, placeType, vote, result, like, voteAvailable } = place;

    return (
        <div className='w-full max-w-[450px] h-full py-[51px] relative flex flex-col justify-start'>
            <div className='mx-5'>
                <div className='flex flex-row justify-between mb-5'>
                    <Link href={'/onAir/result'}><Arrow stroke='#000000' width={12} height={22.5} strokeWidth={0.6} className=' rotate-180 translate-x-[20%]' /></Link>
                    <button className='' onClick={() => mutate()}>
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
                        case result <= 20:
                            return <SpaceNone />;
                        case result <= 40:
                            return <SpaceLow className='relative left-[25%] translate-x-[-50%]' />;
                        case result <= 60:
                            return <SpaceNormal className='relative left-[50%] translate-x-[-50%]' />;
                        case result <= 80:
                            return <SpaceEnough className='relative left-[75%] translate-x-[-50%]' />;
                        default:
                            return <SpacePlenty className='relative left-[100%] translate-x-[-100%]' />;
                    }
                })()}
                <div className={`${styles.gradient_bar} w-full h-[15px] border border-[#E4E4E4] rounded-full mt-2 mb-2`} />
                <div className='flex justify-between'>
                    <span className='text-[12px] font-regulars ml-[3px] text-gray-500'>다 차 있어요</span>
                    <span className='text-[12px] font-regulars mr-[3px] text-gray-500'>빈 자리 많아요</span>
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
                    <Link href={BuildingTypeMap.has(placeType) ? `/b?type=${BuildingTypeMap.get(placeType)}&building=${buildingName}&fromOnAir=true` : `/`} className='flex flex-row items-center font-semibold text-[13px]'>공간 위치보기 <Arrow className='ml-2' stroke='#000000' width={6.4} height={12} /></Link>
                </div>
                <div className='w-[full]'>
                    {
                        detail.picFile && (() => {
                            const files = detail.picFile.split(', ');
                            return (
                                <CarouselIndicator
                                    className='mx-12 my-6 rounded-[10px]'
                                    alts={files}
                                    srcSet={files.map(el => `/fac-img/${buildingName}/${floor}/${el}.jpg`)}
                                />
                            );
                        })()
                    }
                </div>
                <div className='ml-1'>
                    {
                        Object.keys(detail).filter(
                            d => detailCategoryMap.has(d)).map(
                                (el, idx) => <p key={`${placeName}-detail-category-${idx}`} className='text-sm mb-[11px]'><span className='inline-block text-gray-500 w-[55px] mr-1 font-medium'>{detailCategoryMap.get(el)}</span> <span className='text-sm font-regular'>{detail[el]}</span></p>
                            )
                    }
                </div>
            </div>
        </div >
    )
}

const DetailSkeleton = () => {
    return (
        <div className='w-full max-w-[450px] h-full py-[51px] relative flex flex-col justify-start'>
            <div className='mx-5'>
                <div className='flex flex-row justify-between mb-5'>
                    <Link href={'/onAir/result'}><Arrow stroke='#000000' width={12} height={22.5} strokeWidth={0.6} className=' rotate-180 translate-x-[20%]' /></Link>
                    <StarNone />
                </div>
                <Skeleton className='w-[70%] h-[30px] mb-1' />
                <Skeleton className='w-[30%] h-[18px]' />
            </div>
            <div className='relative my-16 mx-5'>
                <div className='mb-[37px] h-[7px] w-full' />
                <div className={`${styles.gradient_bar} w-full h-[15px] border border-[#E4E4E4] rounded-full mt-2 mb-2`} />
                <div className='flex justify-between'>
                    <span className='text-[12px] font-regulars ml-[3px] text-gray-500'>다 차 있어요</span>
                    <span className='text-[12px] font-regulars mr-[3px] text-gray-500'>빈 자리 많아요</span>
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
                </div>
                <div className='w-[full]'>
                    <Skeleton className='mx-12 my-6 rounded-[10px] h-[180px]' />
                </div>
                <div className='ml-1'>
                    {
                        Array(3).fill(0).map(
                            (el, idx) => <Skeleton key={`Skeleton-detail-category-${idx}`} className='h-[21px] mb-[11px]'></Skeleton>
                        )
                    }
                </div>
            </div>
        </div >
    )
}