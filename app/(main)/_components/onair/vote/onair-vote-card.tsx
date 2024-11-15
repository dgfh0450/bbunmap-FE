import Request from '@/lib/fetch';
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react';

const buttonColor: { [key: string]: string } = {
    0: "border-[#FE7776] peer-checked:bg-[#FE7776]",
    25: "border-[#FFB1AF] peer-checked:bg-[#FFB1AF]",
    50: "border-[#DEDEDE] peer-checked:bg-[#DEDEDE]",
    75: "border-[#CEF3C2] peer-checked:bg-[#CEF3C2]",
    100: "border-[#C0ECB1] peer-checked:bg-[#C0ECB1]",
};

export default function OnAirVoteCard() {
    const [value, setValue] = useState<number>(-1);
    const [error, setError] = useState<{ status: boolean, message: string }>({ status: false, message: '' });
    const request = new Request();

    const fetchVote = (): Promise<any> => {
        if (value == -1) throw new Error('값을 설정해주세요!');
        return request.post('/api/test', { key: '과학도서관 !nfinity 라운지', vote: value });
    }

    const { status, data, error: mError, mutate } = useMutation({
        mutationFn: fetchVote,
        onError(error) {
            setError({ status: true, message: error.message })
            setTimeout(() => { setError({ status: false, message: '' }) }, 3000)
        },
        onSuccess(data) {
            window.location.reload();
        },
    })


    const handleVote = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }

    return (
        <li className=' bg-white flex flex-col p-4 my-3 border-[0.5px] border-[#E2E2E2] rounded-[20px]'>
            <p className='font-semibold text-xl'>과학도서관 !nfinity 라운지</p>
            <p className='font-regular text-[13px] text-gray-500'>과학도서관 1층</p>
            <div className='w-[90%] self-center flex flex-row justify-between items-center relative my-10'>
                <CustomRadio onChange={handleVote} color='#FE7776' value={0} label='다 차 있어요' />
                <CustomRadio onChange={handleVote} color='#FFB1AF' value={25} />
                <CustomRadio onChange={handleVote} color='#DEDEDE' value={50} />
                <CustomRadio onChange={handleVote} color='#CEF3C2' value={75} />
                <CustomRadio onChange={handleVote} color='#C0ECB1' value={100} label='빈 자리 많아요' />
                <div className='absolute w-full h-[2px] bg-[#E4E4E4] top-[50%] translate-y-[-50%]' />
            </div>
            <button
                onClick={() => mutate()}
                className={cn(
                    'border py-3 rounded-[10px]',
                    value == -1 ? 'border-[#E2E2E2]' : radioColor[value])}
                disabled={error.status}
            >
                {error.status ? error.message : '투표하기'}
            </button>
        </li>
    )
}
interface CustomRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    color: string;
    label?: string;
    value: number;
};


const radioColor: { [key: string]: string } = {
    0: "border-[#FE7776] peer-checked:bg-[#FE7776]",
    25: "border-[#FFB1AF] peer-checked:bg-[#FFB1AF]",
    50: "border-[#DEDEDE] peer-checked:bg-[#DEDEDE]",
    75: "border-[#CEF3C2] peer-checked:bg-[#CEF3C2]",
    100: "border-[#C0ECB1] peer-checked:bg-[#C0ECB1]",
};

const CustomRadio = ({ color, value, label, ...props }: CustomRadioProps) => {
    return (
        <label className="flex items-center z-10 mx-2 cursor-pointer relative">
            <input type="radio" name="vote" className="peer hidden" value={value} {...props} />
            <span
                className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white",
                    radioColor[value] || "border-gray-500"
                )}
            ></span>
            {label && <span className='absolute  block w-[75px] font-regular text-xs translate-x-[-37.5%] translate-y-[150%] text-center'>{label}</span>}
        </label>
    );
};
