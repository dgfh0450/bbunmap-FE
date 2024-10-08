"use client"

import { useOnAirModal } from '@/hooks/useOnAirModal';
import React from 'react';
import OnAirPlaceModal from './onair-place-modal';
import { Progress } from '@/components/ui/progress';
import { OnAirProgress } from './onair-progress';
import Image from 'next/image';

import Pin from "@/public/onAir/pin.svg";
import Star from "@/public/onAir/placeStar.svg";
import styles from './gradient.module.css';

export interface onairPlaceProps {
    placeName: string;
    buildingName: string;
    value: number;
    like?: boolean;
}

export default function OnAirPlaceCard({ placeName, buildingName, value, like }: onairPlaceProps) {
    const { isPlaceModalOpen, setIsPlaceModalOpen, resetPlaceModal, selectedPlace, setSelectedPlace } = useOnAirModal();

    const handleModal = () => {
        console.log(isPlaceModalOpen)
        setSelectedPlace({ place: placeName, building: buildingName, rating: value });
        setIsPlaceModalOpen(!isPlaceModalOpen);
    }

    return (
        <div onClick={handleModal} className='w-full bg-[white] rounded-[10px] p-[18px] pl-3.5 pr-3 flex flex-row items-center mt-1.5 mb-1.5 shadow-[0_0_20px_0_rgba(0,0,0,0.07)]'>
            {like && <Star className='mr-2.5' width={22} height={22} />}
            <div className='h-full flex flex-col justify-between flex-grow'>
                <p className='text-ml font-medium'>{buildingName}{placeName}</p>
                <p className='text-xs text-gray-500'>{buildingName}</p>
            </div>
            <div className='w-[80px] h-full ml-3 relative'>
                <Pin height={17} width={12.9} fill={value > 60 ? '#9BE490' : value > 40 ? '#A0A4A8' : '#FF6582'} className='relative translate-x-[-50%] mb-[1px]' style={{ left: `${value}%` }} />
                <div className={`w-full h-[4px] rounded-full ${styles.gradient_bar}`}></div>
            </div>
        </div>
    )
}
