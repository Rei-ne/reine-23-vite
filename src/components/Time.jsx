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
        <div className='flex items-center justify-center border-l border-r border-mint w-20'>
            <p className='font-GT_Flexa text-base'> {date.toLocaleTimeString('en-US', {

                timeStyle: 'short',
                hour12: false,
            })}</p>


        </div>

    )
}

export default Time