import React from 'react';
import { useState, useEffect } from 'react'


const Time = () => {

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });

    return (
        <div className='flex items-center justify-center w-20 gap-1'> <span className='font-GT_Flexa text-base'>
            [
        </span>
            <p className='font-PPNeueMontreal tracking-wider text-base'> {date.toLocaleTimeString('en-US', {

                timeStyle: 'short',
                hour12: false,
            })}</p>
            <span className='font-PPNeueMontreal tracking-wider text-base'>
                ]
            </span>

        </div>

    )
}

export default Time