import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

interface IIndicator {
    srcSet: string[];
    alts: string[];
    className?: string;
}

export default function CarouselIndicator({ srcSet, alts, className }: IIndicator) {
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(-1);

    const n = srcSet.length;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };


    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {

        const currentX = e.clientX;
        const deltaX = currentX - startX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                if (currentIdx == 0) return;
                setCurrentIdx(currentIdx - 1);
            }
            else {
                if (currentIdx == n - 1) return;
                setCurrentIdx(currentIdx + 1);
            }
        }
    };

    return (
        <div
            className={`${className} flex flex-row overflow-hidden relative`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onDragStart={(e) => e.preventDefault()}
        >
            {
                srcSet.map((src, idx) => (
                    <div
                        className='w-full h-[180px] flex-none relative'
                        style={{ transform: `translateX(-${100 * currentIdx}%)`, transition: 'transform 0.3s ease' }}
                        key={idx}
                    >
                        <Image
                            src={src}
                            alt={alts[idx]}
                            layout="fill"
                            objectFit="cover"
                            priority={idx === 0}
                        />
                    </div>
                ))
            }
            <div
                className='absolute z-10 left-[50%] bottom-[10px] flex flex-row space-x-[5px] translate-x-[-50%]' >
                {
                    Array(n).fill(0).map((el, idx) =>
                        <div key={`image-carousel-indicator-${idx}`} className={cn('block w-[5px] h-[5px] bg-[red] rounded-full', (idx === currentIdx ? 'bg-white' : 'bg-[rgba(0,0,0,0.3)]'))} />
                    )
                }
            </div >
        </div >
    );
};