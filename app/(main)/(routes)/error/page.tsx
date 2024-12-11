'use client'
import Link from 'next/link';
import ErrorIcon from '@/public/Error.svg';

export default function Error() {

    return (
        <div className="w-full max-w-[450px] h-screen py-[60px] px-4 mx-auto relative flex flex-col justify-between " >
            <div className='flex flex-col items-center h-[60%] justify-end'>
                <ErrorIcon className='mb-12' />
                <p className='font-semibold text-xl mb-4'>일시적인 오류입니다</p>
                <p className='font-semibold text-sm text-gray-500 '>잠시 후 다시 시도해주세요.</p>
            </div>
            <Link className='w-full border border-gray-400 py-4 font-medium text-[15px] text-gray-600 rounded-[10px] text-center' href={'/home'}>홈으로 가기</Link>
        </div >
    )
}