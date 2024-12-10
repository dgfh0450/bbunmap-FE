'use client';

import React, { Component, ReactNode } from 'react';
import FullModal from '@/app/(main)/_components/FullModal';
import Close from '@/public/onAir/close.svg';
import Kakao from '@/public/kakao_logo.svg';
import { signIn } from 'next-auth/react';
import LoginError from './onAir/CustomError';

type Props = {
    children: ReactNode;
};
type State = {
    hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(error: Error): State {
        if (error instanceof LoginError)
            return { hasError: true };
        else
            return { hasError: false }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    {this.props.children}
                    <FullModal isOpen={true}>
                        <div className="w-full max-w-[450px] mx-4 rounded-[10px] bg-white p-4 flex flex-col justify-between">
                            <div className='flex justify-end'>
                                <button className='flex' onClick={() => { this.setState({ hasError: false }) }}><Close width={30} height={30} fill='#000000' /></button>
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
                    </FullModal >
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
