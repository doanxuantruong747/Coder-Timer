import React, { useEffect, useState, useRef } from 'react';
import './Timer.css';


function Timer() {
    const [count, setcount] = useState(0);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hour, setHour] = useState(0);
    const [check, setcheck] = useState(false)

    let timeId = useRef();

    const handleStart = () => {

        timeId.current = setInterval(() => {
            setcount((prev) => {
                const counter = (prev < 10 && prev + 1)
                return counter;
            })
        }, 1000)

    }
    useEffect(() => {

        if (count === 10) {
            setcount(0);
            setSecond((e) => e + 1);
        }
        if (second === 6) {
            setSecond(0);
            setMinute((e) => e + 1);
        }
        if (minute === 10) {
            setMinute(0);
            setMinutes((e) => e + 1);
        }
        if (minutes === 6) {
            setMinutes(0);
            setHour((e) => e + 1);
        }

        return () => {
            clearInterval(timeId);
        };
    }, [count, second, minute, minutes])

    const handleStop = () => {
        clearInterval(timeId.current)
        setcheck(false)
    }
    const handleReset = () => {
        clearInterval(timeId.current);
        setcheck(false);
        setcount(0);
        setSecond(0);
        setMinute(0);
        setMinutes(0);
        setHour(0);
    }
    return (
        <div className='container'>
            <div className='title'>Coder Timer</div>
            <div className='timer-wrapper'>
                <div className='timer-dislay'>{hour ? "0" + hour : "00"}:{minutes}{minute}:{second}{count}</div>
                <div className='btn-wrapper'>
                    <button className='stop'
                        onClick={() => handleStop()}
                    >Stop</button>
                    <button className={check ? "start" : ""}
                        onClick={() => {
                            handleStart();
                            setcheck(true)
                        }}
                    >Start</button>
                    <button className='reset'
                        onClick={() => handleReset()}
                    >Reset</button>
                </div>

            </div>
        </div>
    )
}

export default Timer