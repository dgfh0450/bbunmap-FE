import React from 'react';
import Clock from '@/public/onAir/clock.svg';
import DotMenu from '@/public/vertical-dots.svg';
import Night from '@/public/onAir/night.svg';

export default function OnAirNight({
    handleModalOpen
}: { handleModalOpen?: () => void }) {
    return (
        <>
            <button
                onClick={handleModalOpen}
                className="w-full bg-[#F3F4F5] rounded-lg flex justify-between p-[10px] mt-[5px] font-regular text-gray-500 text-xs">
                <span className="flex items-center"><Clock className="m-[3px]" />내일 투표 가능해요(06:00~22:00)</span> <DotMenu />
            </button>
            <Night className='mt-11 mb-4' />
            <p className='font-medium text-gray-400 text-md'>지금은 투표 시간이 아니에요</p>
            <p className='font-medium text-gray-400 text-xs'>(투표 가능 시간: 06:00~22:00)</p>
        </>
    )
}
