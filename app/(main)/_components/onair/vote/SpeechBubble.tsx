import React from 'react';
import Bubble from '@/public/my/SpeechBubble.svg';

export default function SpeechBubble({ text }: { text: string }) {
    return (
        <div className='flex relative items-center justify-center'>
            <Bubble width={92} height={28} />
            <p className='text-xs font-medium absolute'>{text}</p>
        </div>
    )
}
