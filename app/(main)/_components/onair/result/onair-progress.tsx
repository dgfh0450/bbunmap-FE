import Image from 'next/image';
import React, { ChangeEventHandler, useEffect, useState } from 'react'

export function OnAirProgress({ ratio }: { ratio: string }) {
    return (
        <div className='w-[40%] flex justify-center items-center bg-[blue]'>
            <div className='w-[80%] h-[15px] bg-[yellow] relative'>
                <div className={`w-[15px] h-[15px] absolute bg-[green] top-0 `} style={{ left: `${ratio}%`, transform: 'translateY(-100%)' }}></div>
            </div>
        </div>
    )
}

interface OnAirProgressInputProps {
    value: number;
    onChange: ChangeEventHandler<HTMLInputElement>
}


export function OnAirProgressInput({ value, onChange }: OnAirProgressInputProps) {
    const [trans, setTrans] = useState(-50);
    const imageIdx = value == 100 ? '5' : `${Math.floor(value / 20) + 1}`
    useEffect(() => {
        if (value > 50) setTrans(100 - value);
        else setTrans(-value);
    }, [value])
    return (
        <>
            <div className=" absolute w-[30px] h-[30px] top-0"
                style={value <= 50 ? { left: `${value}%`, transform: `translateX(${trans}%)` } : { right: `${100 - value}%`, transform: `translateX(${trans}%)` }}>
                <Image
                    src={`/onAir/pin${imageIdx}.svg`}
                    fill
                    className="object-contain dark:hidden"
                    alt="Documents"
                />
            </div >

            {trans}
            <input className='w-full h-full border border-red' type='range' value={value} min={0} max={100} step={1} onChange={onChange} />
        </>
    )
}
