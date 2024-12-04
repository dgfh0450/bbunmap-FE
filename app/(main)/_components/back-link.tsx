"use client"

import React from 'react';
import Arrow from '@/public/Arrow.svg';
import { useRouter } from 'next/navigation';

export default function BackLink() {
    const router = useRouter();
    return (
        <button onClick={() => router.back()}><Arrow stroke='#000000' width={12} height={22.5} strokeWidth={0.6} className=' rotate-180 translate-x-[20%]' /></button>
    )
}
