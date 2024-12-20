import { TypesOnAirPlace, TypesOnAirVotePlace } from '@/app/(main)/(routes)/onAir/onAir';
import Request from '@/lib/fetch';
import { cn } from '@/lib/utils'
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useState } from 'react';
import CustomRadio, { buttonColor, radioColor } from './custom-radio';
import { useSession } from 'next-auth/react';
import { fetchVote } from '@/app/(main)/(routes)/onAir/fetch';
import LoginError from '@/app/(main)/(routes)/onAir/CustomError';


export default function OnAirVoteCard(data: TypesOnAirVotePlace) {
    const { buildingName, floor, placeName, voteAvailable } = data;
    const [value, setValue] = useState<number>(-1);
    const [isError, setError] = useState<{ status: boolean, message: string }>({ status: false, message: '' });
    const request = new Request();
    const { update, data: session, status: statusSession } = useSession();
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    const { status: voteStatus, data: postResult, error: error, mutate } = useMutation({
        mutationFn: () => fetchVote(value, buildingName, placeName, session, update),
        onError: (e) => {
            if (e instanceof LoginError) {
                throw e;
            }
            setError({ status: true, message: e.message });
            setTimeout(() => {
                setError({ status: false, message: '' });
            }, 3000);
        },
        onSuccess(data) {
            setIsAvailable(false);
        },
        throwOnError: (e) => {
            if (e instanceof LoginError) return true;
            else return false;
        }
    })


    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }

    useEffect(() => {
        if (voteAvailable) {
            setIsAvailable(voteAvailable);
        }
    }, [voteAvailable])

    return (
        <li className=' bg-white flex flex-col p-4 my-3 border-[0.5px] border-[#E2E2E2] rounded-[20px]'>
            <p className='font-semibold text-xl'>{buildingName} {placeName}</p>
            <p className='font-regular text-[13px] text-gray-500'>{buildingName} {floor}층</p>
            <div className='w-[90%] self-center flex flex-row justify-between items-center relative my-10'>
                <CustomRadio disabled={!isAvailable} placeName={placeName} onChange={onChangeValue} color='#FE7776' value={0} label='다 차 있어요' />
                <CustomRadio disabled={!isAvailable} placeName={placeName} onChange={onChangeValue} color='#FFB1AF' value={25} />
                <CustomRadio disabled={!isAvailable} placeName={placeName} onChange={onChangeValue} color='#DEDEDE' value={50} />
                <CustomRadio disabled={!isAvailable} placeName={placeName} onChange={onChangeValue} color='#CEF3C2' value={75} />
                <CustomRadio disabled={!isAvailable} placeName={placeName} onChange={onChangeValue} color='#C0ECB1' value={100} label='빈 자리 많아요' />
                <div className='absolute w-full h-[2px] bg-[#E4E4E4] top-[50%] translate-y-[-50%]' />
            </div>
            <button
                onClick={() => mutate()}
                className={cn(
                    'border py-3 rounded-[10px]',
                    isAvailable ? (value == -1 || isError.status ? 'border-[#DADADA]' : buttonColor[value]) : "text-[#676767] border-[#FFFFFF] bg-[#FFFFFF]")}
                disabled={isError.status || !isAvailable}
            >
                {voteStatus === 'pending' ? '반영 중...' : isAvailable ? (isError.status ? isError.message : '투표하기') : '투표가 완료되었습니다'}
            </button>
        </li >
    )
}