import React from 'react';
import Document from '@/public/Document.svg';
import DocumentLoading from '@/public/DocumentLoading.svg';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

type RefetchComponentProps<T> = {
    message: string;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T, Error>>;
    className?: string;
};

type LoadingComponentProps = {
    message: string;
    className?: string;
};

export function RefetchComponent<T>({ message, refetch, className }: RefetchComponentProps<T>) {
    return (
        <div className={cn('w-full h-full flex flex-col justify-start items-center pt-[20%]', className)}>
            <Document />
            <p className='text-sm font-medium text-gray-600 mt-4 mb-9'>{message}</p>
            <button className='bg-[#1B1D1F] border border-point border-opacity-20 text-white py-3 px-[22px] rounded-[10px] self-center' onClick={() => { refetch() }}>다시 불러오기</button>
        </div>
    )
}

export function LoadingComponent({ message, className }: LoadingComponentProps) {
    return (
        <div className={cn('w-full h-full flex flex-col justify-start items-center pt-[20%]', className)}>
            <DocumentLoading />
            <p className='text-sm font-medium text-gray-600 mt-9'>{message}</p>
        </div>
    )
}
