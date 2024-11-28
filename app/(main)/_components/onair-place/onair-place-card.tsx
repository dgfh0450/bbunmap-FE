import React from 'react';
import Pin from "@/public/onAir/pin.svg";
import Star from "@/public/onAir/placeStar.svg";
import styles from './gradient.module.css';
import { TypesOnAirPlace } from '../../(routes)/onAir/onAir';
import Link from 'next/link';


export default function OnAirPlaceCard(data: TypesOnAirPlace) {
    const { buildingName, floor, placeName, placeType, vote, result, like } = data;

    return (
        <Link href={`/onAir/detail?place=${data.placeName}`} className='w-full bg-[white] rounded-[10px] p-[18px] pl-3.5 pr-3 flex flex-row items-center shadow-[0_0_20px_0_rgba(0,0,0,0.07)]'>
            <div className='h-full flex flex-col justify-between flex-grow'>
                <p className='text-ml font-medium'>{buildingName} {placeName}</p>
                <p className='text-xs text-gray-500'>{buildingName} {floor}층</p>
            </div>
            <div className='w-[80px] h-full ml-3 relative'>
                <Pin height={17} width={12.9} fill={vote > 60 ? '#9BE490' : vote > 40 ? '#A0A4A8' : '#FF6582'} className='relative translate-x-[-50%] mb-[1px]' style={{ left: `${vote}%` }} />
                <div className={`w-full h-[4px] rounded-full ${styles.gradient_bar}`}></div>
            </div>
        </Link>
    )
}
