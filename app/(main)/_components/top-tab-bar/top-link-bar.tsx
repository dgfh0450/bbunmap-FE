"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
// import { useRouter } from 'next/navigation';

const test: any[] = [
    { name: '투표하기', href: '/onAir' },
    { name: '결과보기', href: '/onAir/result' }
];

export default function TopLinkBar() {
    const path = usePathname();
    // const path = useRouter();


    return (
        <div className="flex flex-row justify-start items-center">
            {test.map((data) => (
                <Link
                    key={`link-${data.name}`}
                    href={data.href}
                    className={cn(
                        'mr-2 px-[5px] pt-[6px] pb-[3px] text-[15px] font-medium',
                        path === data.href ? 'text-black' : 'text-gray-400',
                        path === data.href ? 'border-b-[1.5px] border-[black]' : 'border-b-[1.5px] border-[white]',
                    )}
                >
                    {data.name}
                </Link>
            ))}
        </div>
    );
}
