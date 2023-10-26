import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";



const Stopwatch = () =>  {
	

    const [startTime, setStartTime] = useState('00:00'); 
    const [counter, setCounter] = useState(0);
    
    const totalSeconds = useRef(0);


    const handleTimerInput = v => setStartTime(v);

    const handleStartButton = (value) => {
        // Convert time input to seconds
        let time = startTime.split(':');
        let minutes = time[0];
        let seconds = parseInt(minutes) * 60 + parseInt(time[1]);

        totalSeconds.current = seconds;
      
        // Start timer 
        const secondsCountInterval = setInterval(() => {
            console.log(`totalseconds ${totalSeconds.current}`);
            setCounter(prevCount => {
                console.log(`prevCount ${prevCount}`);
                return prevCount + 1
            });
        
            console.log(`counter ${counter}`);

            if (counter === totalSeconds.current) {
                clearInterval(secondsCountInterval);
            } 
        }, 1000);
    };

	return (
        <div>

            <TimerInput value={startTime} onChange={handleTimerInput}/>
            <div>
                {startTime}
                <div>
                    Counter: {counter}
                </div>
                {/* COLOR DOES NOT WORK  */}
                <Button value={"Start"} color={'#00cccc'} onClick={handleStartButton} /> 
                <Button value={"Stop"} color={'#00cccc'} />   
                <Button value={"Reset"} color={'#00cccc'} />                  
            </div>
        </div>

		);
};
export default Stopwatch;
