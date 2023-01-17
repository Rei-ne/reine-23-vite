import React from 'react';
import './index.scss'
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
        <div className='timer-container'>
            <p> {date.toLocaleTimeString('en-US', {

                timeStyle: 'short',
                hour12: false,
            })}</p>


        </div>

    )
}

export default Time