import React from 'react';
import Close from '@/public/onAir/close.svg';
import FullModal from "@/app/(main)/_components/FullModal";
import Moon from '@/public/onAir/Moon.svg';
import Connector from '@/public/onAir/connector.svg';

export default function OnAirTimeInfoModal({ modalOpen, handleModalOpen }: { modalOpen: boolean, handleModalOpen: () => void }) {
    return (
        <FullModal isOpen={modalOpen}>
            <div className="text-[19px] w-full max-w-[450px] h-[400px] mx-4 p-4 bg-white rounded-[10px]">
                <div className="flex justify-end mb-4">
                    <button onClick={handleModalOpen}><Close width={30} height={30} fill="#000000" /></button>
                </div>
                <p className="text-center text-[19px] mb-[22px]">투표 결과는 <b>매 교시 시작</b>마다 초기화돼요</p>
                <div className="flex flex-row">
                    <div className="bg-[#F3F4F5] pt-[15px] rounded-[10px] flex flex-col overflow-hidden ml-1.5">
                        <p className="font-bold text-[13px] mx-[15px] mb-3">투표 집계 시간</p>
                        <ol className="mx-[15px]">
                            {
                                times.slice(0, -1).map((el, idx) =>
                                    <li key={`vote-result-time-${idx}`} className="text-[11px] text-gray-500 font-regular my-0.5">{el}~{times[idx + 1]}</li>)
                            }
                        </ol>
                        <div className="bg-[#E9EBED] flex items-center justify-center py-1.5 mt-2">
                            <Moon />
                        </div>
                    </div>
                    <div className="grow flex flex-row relative">
                        <div className="absolute top-[25%] flex flex-row" >
                            <Connector className="translate-x-[-6%] translate-y-[100%]" />
                            <div className="text-[13px] font-regular ml-2">
                                <p>누적된 투표 결과는</p>
                                <p>1시간 30분마다 초기화돼요</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullModal>
    )
}



const times = ['06:00', '09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00', '22:00'];