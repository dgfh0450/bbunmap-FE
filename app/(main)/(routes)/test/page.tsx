"use client"

import Request from '@/lib/fetch'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const getError = () => {
    const request = new Request();
    return request.get('/api/realTime/places?buildingName=SK미래');
}

export default function ErorPage() {
    const { data, status } = useQuery({
        queryFn: getError,
        queryKey: ['test'],
        throwOnError: () => true
    })

    console.log(data);

    return (
        <div>
            <button onClick={() => {
                throw new Error('test')
            }}>test</button>
        </div>
    )
}
