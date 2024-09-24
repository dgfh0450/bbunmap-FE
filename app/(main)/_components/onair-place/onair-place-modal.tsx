"use client"
import React, { Dispatch, SetStateAction, useState } from 'react';
import { onairPlaceProps } from './onair-place-card';
import { useOnAirModal } from '@/hooks/useOnAirModal';
import { OnAirProgressInput } from './onair-progress';
import Close from "@/public/icons/common/close.svg";
import StarBlank from "@/public/icons/common/star_blank.svg";
import styles from './gradient.module.css';

import SpaceNone from '@/public/onAir/space_none.svg';
import SpaceLow from '@/public/onAir/space_low.svg';
import SpaceNormal from '@/public/onAir/space_normal.svg';
import SpaceEnough from '@/public/onAir/space_enough.svg';
import SpacePlenty from '@/public/onAir/space_plenty.svg';
import { ArrowRight } from "lucide-react";
import Image from 'next/image';

export default function OnAirPlaceModal() {
    const [rate, setRate] = useState<number>(50);
    const [page, setPage] = useState<number>(0);
    const { isPlaceModalOpen, setIsPlaceModalOpen, handlePlaceModalOpen, selectedPlace, setSelectedPlace } = useOnAirModal();
    return (
        <div key={`${selectedPlace.place}-${selectedPlace.building}-modal`} className='fixed w-full max-w-[450px] h-[100vh] z-50 top-0 left-1/2 translate-x-[-50%] bg-black/[.06] flex items-center justify-center'>
            <div className='w-[80%] h-[400px] relative rounded-[10px] bg-white p-4 flex flex-col justify-between'>
                {
                    {
                        0: <ResultPage page={page} setPage={setPage} />,
                        1: <VotingPage page={page} setPage={setPage} />,
                        2: <RewardPage page={page} setPage={setPage} />
                    }[page]
                }
            </div>
        </div>

    )
}

interface PageProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

function ResultPage({ page, setPage }: PageProps) {
    const { isPlaceModalOpen, setIsPlaceModalOpen, handlePlaceModalOpen, selectedPlace, setSelectedPlace } = useOnAirModal();
    return (
        <>
            <div className='w-full'>
                <div className='h-[40px] flex items-center justify-between mb-4'>
                    <button className='w-[30px] h-[30px] flex items-center justify-center' onClick={handlePlaceModalOpen}><StarBlank /></button>
                    <button className='w-[22px] h-[22px] flex items-center justify-center' onClick={handlePlaceModalOpen}><Close /></button>
                </div>
                <div>
                    <p className='text-[21px] font-semibold'>{selectedPlace.building}</p>
                    <p className='text-[13px] text-gray-500'>{selectedPlace.place}</p>
                </div>
            </div>
            <div className='relative'>
                {(() => {
                    switch (true) {
                        case selectedPlace.value <= 20:
                            return <SpaceNone />;
                        case selectedPlace.value <= 40:
                            return <SpaceLow className='relative left-[25%] translate-x-[-50%]' />;
                        case selectedPlace.value <= 60:
                            return <SpaceNormal className='relative left-[50%] translate-x-[-50%]' />;
                        case selectedPlace.value <= 80:
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
            <div className='flex flex-col'>
                <button onClick={() => setPage(1)} className='w-full h-[50px] rounded-[7px] bg-[#FF2B53] text-white font-bold mb-0.5'>투표하고 10P 받기</button>
                <button onClick={handlePlaceModalOpen} className='w-full h-[50px] text-[13px]' style={{ textDecoration: 'underline' }}>다른 공간 추천받기</button>
            </div>
        </>
    )
}

function VotingSlider() {
    const [moved, setMoved] = useState<boolean>(false);

    return (
        <div className='w-full h-[15px] relative mt-2 mb-2 flex items-center'>
            {!moved && <ArrowRight className='absolute left-1/3 h-4 l-4 z-20 stroke-white rotate-180' />}
            <input type='range' min={0} max={100} step={1} onChange={(e) => { setMoved(true) }}
                className={`${styles.gradient_bar} absolute top-0 left-0 w-full h-[15px] border border-[#E4E4E4] rounded-full voting-slider`} />
            {!moved && <ArrowRight className='absolute right-1/3 h-4 l-4 z-20 stroke-white' />}
        </div>
    )
}

function VotingPage({ page, setPage }: PageProps) {
    const { isPlaceModalOpen, setIsPlaceModalOpen, handlePlaceModalOpen, selectedPlace, setSelectedPlace } = useOnAirModal();

    const handleVote = async () => {
        setPage(page + 1);
    }

    return (
        <>
            <div className='w-full'>
                <div className='h-[40px] flex items-center justify-end mb-4'>
                    <button className='w-[22px] h-[22px] flex items-center justify-center' onClick={handlePlaceModalOpen}><Close /></button>
                </div>
                <div>
                    <p className='text-[21px] font-semibold'>빈 자리가 많이 있나요?</p>
                    <p className='text-[13px] text-gray-500'>{selectedPlace.place}</p>
                </div>
            </div>
            <div className='relative'>
                <div className='w-full h-[37px]' />
                <VotingSlider />
                <div className='flex justify-between'>
                    <span className='text-[13px]'>다 차 있어요</span>
                    <span className='text-[13px]'>빈 자리 많아요</span>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='w-full h-[50px] rounded-[7px] mb-0.5' />
                <button onClick={handleVote} className='w-full h-[50px] rounded-[7px] bg-medium text-point font-bold'>확인</button>

            </div>
        </>
    )
}


function RewardPage({ page, setPage }: PageProps) {
    const { isPlaceModalOpen, setIsPlaceModalOpen, handlePlaceModalOpen, selectedPlace, setSelectedPlace } = useOnAirModal();

    return (
        <>
            <div className='absolute top-[16px] right-[16px]'>
                <div className='h-[40px] flex items-center justify-end'>
                    <button className='w-[22px] h-[22px] flex items-center justify-center' onClick={handlePlaceModalOpen}><Close /></button>
                </div>
            </div>
            <Image src={'/onAir/Reward.png'} alt='Reward Image' width={204} height={189} className='self-center' />

            <div className='w-full flex flex-col items-center'>
                <p className='text-[26px] font-semibold mb-3'>10P 획득</p>
                <p className='text-[14px] text-gray-500'>로그인하고 포인트를 받아가세요!</p>
            </div>
            <div className='flex flex-col'>
                <button onClick={() => { }} className='w-full h-[50px] rounded-[7px] bg-[#FCD300] text-black font-bold'>3초만에 카카오 로그인</button>
            </div>
        </>
    )
}