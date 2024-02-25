import SectionComp from "../utils/SectionComp";
import { useRef, useState } from "react";

import { useRef } from 'react';

export default function Section3() {
    return (
        <>
            <SectionComp title={'Ref는 값이 update 되어도 re-render 되지 않는다.'}>
                <RefComp />
            </SectionComp>
        </>
    );
}

const RefComp = () => {

    // declare
    let ref = useRef(0);

    // setter
    ref.current = ref.current + 'hello world';

    // getter
    const refExTag = (
        <>
            <div>{ref.current}</div>
        </>
    );

    let [state, setState] = useState(0);

    function handleClick() {
        ref.current = ref.current + 1;
        alert('You clicked ' + ref.current + ' times!');
    }

    function handlerClick2() {
        setState(state + 1);
    }

    return (
    <>
        <button onClick={handleClick}>
        Increase ref
        </button>
        <button onClick={handlerClick2}>
        Re-render
        </button>
        <div>{ref.current}</div>
    </>
    );
}

const RefTimerComp = () => {
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);
    
    function handleStart() {
        setStartTime(Date.now());
        setNow(Date.now());
    
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
        setNow(Date.now());
        }, 10);
    }
    
    function handleStop() {
        clearInterval(intervalRef.current);
    }
    
    let secondsPassed = 0;
    if (startTime != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }
    
    return (
        <>
        <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
        <button onClick={handleStart}>
            Start
        </button>
        <button onClick={handleStop}>
            Stop
        </button>
        </>
    );
}