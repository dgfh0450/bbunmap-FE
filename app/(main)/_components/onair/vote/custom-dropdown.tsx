import { buildingList } from '@/app/(main)/(routes)/onAir/fetch';
import { TypesBuildingFilter } from '@/app/(main)/(routes)/onAir/onAir';
import React from 'react';

export default function CustomDropDown({ onSelect }: { onSelect: (el: TypesBuildingFilter | undefined) => void }) {
    return (
        <ul className='absolute rounded-[10px] bg-white font-regular text-sm text-black z-50 shadow-[0_0_30px_0_rgba(0,0,0,0.15)] px-[18px] py-[3px]'>
            <li key='onair-vote-category-all' className='text-center py-[12px]'>
                <button onClick={() => onSelect(undefined)} className='w-full'>전체</button>
            </li>
            {
                buildingList.map(el =>
                    <li key={`onair-vote-category-${el}`} className='text-center py-[12px] border-t border-[#E1E1E1]'>
                        <button onClick={() => onSelect({ value: el, type: 'buildingName' })} className='w-full'>{el}</button>
                    </li>
                )
            }
        </ul>
    )
}
