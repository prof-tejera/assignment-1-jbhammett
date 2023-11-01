import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";



const Stopwatch = () =>  {
	
    const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
    const [displaySecondsCount, setDisplaySecondsCount] = useState('00');

    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    
    const [counter, setCounter] = useState(0);
    
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);


    // const handleMinutesInput = v => setStartMinutes(v);
    // const handleSecondsInput = v => setStartSeconds(v);

    const handleMinutesInput = (value) => {
        setStartMinutes(value);
        setDisplayMinutesCount('00');
        setDisplaySecondsCount('00');
        setCounter(0);
    };

    const handleSecondsInput = (value) => {
        setStartSeconds(value);
        setDisplayMinutesCount('00');
        setDisplaySecondsCount('00');
        setCounter(0);
    };

    const handleStartButton = (value) => {

        let seconds = (parseInt(startMinutes * 60)) + parseInt(startSeconds);
    
        totalSeconds.current = seconds;
    
        if (totalSeconds.current > 0){
        // Start timer
            secondsCountInterval.current = setInterval(() => {
                setCounter((prevTotalSecondsCount) => {
                    const nextTotalSecondsCounter = prevTotalSecondsCount + 1;
            
                    if (nextTotalSecondsCounter === totalSeconds.current) {
                        clearInterval(secondsCountInterval.current);
                    }

                    if (nextTotalSecondsCounter % 60 === 0){
                       
                        setDisplayMinutesCount((prevDisplayMinutesCount) => {
                            let nextDisplayMinutesCount = parseInt(prevDisplayMinutesCount) + 1;
                            nextDisplayMinutesCount = nextDisplayMinutesCount.toString().padStart(2,"0");
                            
                            return nextDisplayMinutesCount;
                        });
                        setDisplaySecondsCount('00');

                    }
                    else{                    
                        let nextTotalSeconds = nextTotalSecondsCounter % 60;
                        setDisplaySecondsCount(nextTotalSeconds.toString().padStart(2,"0"));
                        
                    }
                    return nextTotalSecondsCounter;
                });
            }, 1000);
            
        }
      };


      const handleStopButton = (value) => {
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
        else {
            handleStartButton();
        }
      };

      const handleResetButton = (value) => {
        setDisplayMinutesCount('00');
        setDisplaySecondsCount('00');
        setStartMinutes('00');
        setStartSeconds('00');
        setCounter(0);
        totalSeconds.current = 0;
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };

      const handleEndButton = (value) => {
        setDisplayMinutesCount(startMinutes);
        setDisplaySecondsCount(startSeconds);
        setCounter(totalSeconds.current);
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };

	return (
        <div>
            <TimerInput value={startMinutes} onChange={handleMinutesInput}/>:
            <TimerInput value={startSeconds} onChange={handleSecondsInput}/>
            <DisplayTime minutes={displayMinutesCount} seconds={displaySecondsCount}/>
            <div>
              
                {/* COLOR DOES NOT WORK  */}
                <Button value={"Start"} color={'#00cccc'} onClick={handleStartButton} /> 
                <Button value={"Stop"} color={'#00cccc'} onClick={handleStopButton} />   
                <Button value={"Reset"} color={'#00cccc'} onClick={handleResetButton} />   
                <Button value={"End"} color={'#00cccc'} onClick={handleEndButton} />                  
            </div>
        </div>

		);
};
export default Stopwatch;
