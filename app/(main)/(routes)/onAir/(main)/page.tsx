"use client";

import React, { useEffect, MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Request from "@/lib/fetch";
import { TypeResponseOnAirPlace, TypesBuildingFilter, TypesOnAirPlace } from "../onAir";
import { useMutation, useQuery } from "@tanstack/react-query";
import OnAirVoteCard from "../../../_components/onair/vote/onair-vote-card";
import { signIn, useSession, } from "next-auth/react";
import { fetchOnAirPlaceList } from "../fetch";
import CustomDropDown from "@/app/(main)/_components/onair/vote/custom-dropdown";
import Triangle from '@/public/rounded-triangle.svg';
import Arrow from '@/public/Arrow.svg';
import FullModal from "@/app/(main)/_components/FullModal";
import Kakao from '@/public/kakao_logo.svg';
import Close from '@/public/onAir/close.svg';
import { LoadingComponent, RefetchComponent } from "@/app/(main)/_components/fetch-component";
import { getUserInfo } from "../../my/fetch";
import { calculateLevel, levelIntervals, levelTexts, maxUserLevel } from "@/lib/userLevel";
import SpeechBubble from "@/app/(main)/_components/onair/vote/SpeechBubble";
import OnAirNight from "@/app/(main)/_components/onair/onair-night";
import OnAirTimeInfoModal from "@/app/(main)/_components/onair/onair-timeinfo-modal";


const OnAirVote = () => {
    const [selectedCategory, setSelectedCategory] = useState<TypesBuildingFilter | undefined>();
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
    const [modalOpenLogin, setModalOpenLogin] = useState<boolean>(false);
    const [modalOpenInfo, setModalOpenInfo] = useState<boolean>(false);
    const { update, data: session, status: statusSession } = useSession();
    const { data: userInfo, status: statusUserInfo, error: errorUserInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => getUserInfo(session, update),
        enabled: statusSession === 'authenticated'
    })

    const { data: response, error, status: status, refetch } = useQuery<TypeResponseOnAirPlace>({
        queryKey: ['buildingCategory', selectedCategory?.value],
        queryFn: () => fetchOnAirPlaceList(selectedCategory, session, update),
        staleTime: 300000,
        refetchInterval: 300000,
        enabled: statusSession !== 'loading'
    });

    const handleDropDown = () => {
        setDropDownOpen(!dropDownOpen);
    }

    const handleModalOpen = () => {
        setModalOpenLogin(!modalOpenLogin);
    }

    const handleInfoModalOpen = () => {
        setModalOpenInfo(!modalOpenInfo);
    }

    const handleCategory = (filter: TypesBuildingFilter | undefined) => {
        setSelectedCategory(filter)
        setDropDownOpen(false);
    }

    const [level, remain] = calculateLevel(userInfo?.numOfRealTimeVote);
    return (
        <div className="w-full flex-1 overflow-y-scroll scrollbar-hide">
            <div className="w-auto flex flex-col items-center justify-between mt-5 px-6 mb-10">
                {
                    userInfo ?
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex-1 h-auto flex flex-col justify-around py-2">
                                <div className="self-start font-regular rounded-full text-[12px] pl-3 pr-2 py-[5.5px] border border-gray-50 bg-gray-50 text-gray-500 flex items-center">
                                    누적 투표 횟수
                                </div>
                                <p className="font-bold text-[25px]">🗳️ {userInfo.numOfRealTimeVote}회</p>
                                {
                                    level === maxUserLevel ?
                                        <>
                                            <p className="font-regular text-[13px] text-gray-500 my-3">Lv. {level} 달성! 다른 동물을 키울 수 있어요</p>
                                            <div className="w-full h-[12px] rounded-full bg-[#ededed] relative">
                                                <div className={cn("absolute border-[6px] rounded-full border-[#EFED63]")}
                                                    style={{ width: `5%` }}
                                                />
                                                <p className="absolute right-0 bottom-[-4px] text-gray-500 font-regular text-[11px] translate-y-[100%]" >Coming Soon</p>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <p className="font-regular text-[13px] text-gray-500 my-3">{remain}번 더 투표하면 Level {level + 1}</p>
                                            <div className="w-full h-[12px] rounded-full bg-[#ededed] relative">
                                                <div className={cn("absolute border-[6px] rounded-full border-[#EFED63]")}
                                                    style={{
                                                        width: `${100 * userInfo.numOfRealTimeVote / levelIntervals[maxUserLevel - level - 1]}%`
                                                    }}
                                                />
                                                <p className="absolute right-0 bottom-[-4px] text-gray-500 font-regular text-[11px] translate-y-[100%]" >{userInfo.numOfRealTimeVote}/{levelIntervals[maxUserLevel - level - 1]}</p>
                                            </div>
                                        </>
                                }
                            </div>
                            <div className="w-[104px]  flex flex-col items-center">
                                <SpeechBubble text={levelTexts[level]} />
                                <Image src={`/my/vote-character/character-lv${level}.png`} width={104} height={135} alt="vote-character" className="" />
                            </div>
                        </div>
                        :
                        <div className="w-full flex flex-row justify-between">
                            <div className="w-full h-auto flex flex-col justify-around py-2">
                                <button
                                    onClick={handleModalOpen}
                                    className="self-start font-regular rounded-full text-[12px] pl-3 pr-2 py-[5.5px] bg-[#FFF8B7] border border-[#E8DA5D] flex items-center">
                                    로그인이 필요해요 <Arrow stroke="#000000" strokeWidth={0.6} width={6} height={12} className="mx-[5px]" />
                                </button>
                                <p className="font-bold text-[25px]">🗳️ 0회</p>
                                <p className="font-regular text-[13px] text-gray-500">? 번 더 투표하면 Level 5</p>

                                <div className="w-full h-[12px] rounded-full bg-[#ededed] relative">
                                    <div className={cn("absolute border-[6px] rounded-full border-[#EFED63]")}
                                        style={{ width: `${100 * remain / levelIntervals[maxUserLevel - level]}%` }}
                                    />
                                    <p className="absolute right-0 bottom-0 text-gray-500 font-regular text-[11px] translate-y-[100%]" >0/0</p>
                                </div>
                            </div>
                            <div className="w-[104px]  flex flex-col items-center">
                                <SpeechBubble text={levelTexts[level]} />
                                <Image src={`/my/vote-character/character-lv${level}.png`} width={104} height={135} alt="vote-character" className="" />
                            </div>
                        </div>
                }
            </div>
            <div className="w-full min-h-full bg-[#F8F8F8] rounded-t-[30px] p-[15px] pb-[100px]">
                <span className="text-sm font-regular text-gray-500 relative flex">
                    <button className="font-medium text-[15px] text-black mx-[6px] flex items-center"
                        onClick={handleDropDown}>
                        {selectedCategory ? selectedCategory.value : '전체'}
                        <Triangle className="ml-1" />
                    </button>
                    의 상황을 알려주세요
                    {dropDownOpen && <CustomDropDown onSelect={handleCategory} />}
                </span>
                {
                    response?.closestResetTime === 'none' ?
                        <div className="flex flex-col  items-center mt-2">
                            <OnAirNight handleModalOpen={handleInfoModalOpen} />
                        </div> :

                        {
                            'error': <RefetchComponent message="투표 가능한 목록을 불러오지 못했어요" refetch={refetch} />,
                            'success':
                                <ul>
                                    {response && response.specificUserRealTimeDTOArr.map((data, idx) =>
                                        <OnAirVoteCard refetch={refetch} {...data} key={idx} />
                                    )}
                                </ul>,
                            'pending': <LoadingComponent message="투표 목록을 불러오고 있어요" />
                        }[status]
                }
            </div >
            <FullModal isOpen={modalOpenLogin}>
                <div className="w-full max-w-[450px] mx-4 rounded-[10px] bg-white p-4 flex flex-col justify-between">
                    <div className='flex justify-end'>
                        <button className='flex' onClick={handleModalOpen}><Close width={30} height={30} fill='#000000' /></button>
                    </div>
                    <div className='mt-3 mb-8'>
                        <p className='font-bold text-[22px] mb-[14px] text-center'>로그인이 필요해요</p>
                        <p className='font-regular text-gray-500 text-sm text-center'>로그인하고 투표하면 호랑이 Level Up!</p>
                    </div>
                    <button
                        onClick={() => signIn('kakao')}
                        className='bg-[#FEE500] rounded-[10px] py-4 px-3 text-center relative font-bold text-base'>
                        <Kakao className='absolute left-[16px] top-[50%] translate-y-[-50%]' />
                        3초 만에 카카오 로그인</button>
                </div>
            </FullModal>
            <OnAirTimeInfoModal
                modalOpen={modalOpenInfo}
                handleModalOpen={handleInfoModalOpen}
            />
        </div >
    );
};

export default OnAirVote;