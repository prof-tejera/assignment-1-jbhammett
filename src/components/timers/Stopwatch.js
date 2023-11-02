import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import { CalculateTotalSeconds, HandleStopButton } from "../../utils/helpers";



const Stopwatch = () =>  {
	
    const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
    const [displaySecondsCount, setDisplaySecondsCount] = useState('00');

    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);
    const counter = useRef(0);


    const handleMinutesInput = (value) => {
        setStartMinutes(value);
        setDisplayMinutesCount('00');
        setDisplaySecondsCount('00');
        counter.current = 0;
    };

    const handleSecondsInput = (value) => {
        setStartSeconds(value);
        setDisplayMinutesCount('00');
        setDisplaySecondsCount('00');
        counter.current = 0;
    };

    const handleStartButton = (value) => {
        //Format input value to time format
        if (parseInt(displayMinutesCount) === 0 && parseInt(displaySecondsCount) === 0){
            let format_minutes_input = startMinutes.toString().padStart(2,"0");
            let format_seconds_input = startSeconds.toString().padStart(2,"0");
            handleMinutesInput(format_minutes_input);
            handleSecondsInput(format_seconds_input);
        }

        let seconds = CalculateTotalSeconds(startMinutes, startSeconds);
    
        totalSeconds.current = seconds;
    
        if (totalSeconds.current > 0){
        // Start timer
            secondsCountInterval.current = setInterval(() => {
        
                counter.current = (() => {
                    
                    const nextTotalSecondsCounter = counter.current + 1;
                   
                    // Stop timer when end time is reached
                    if (nextTotalSecondsCounter === totalSeconds.current) {
                        clearInterval(secondsCountInterval.current);
                    }

                    // Handle change to next minute
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
                })();
                
            }, 1000);
            
        }
      };


      const handleResetButton = (value) => {
        setDisplayMinutesCount('00');
        setDisplaySecondsCount('00');
        setStartMinutes('00');
        setStartSeconds('00');
        counter.current = 0;
        totalSeconds.current = 0;
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };

      const handleEndButton = (value) => {
        setDisplayMinutesCount(startMinutes.toString().padStart(2,"0"));
        setDisplaySecondsCount(startSeconds.toString().padStart(2,"0"));
        counter.current = totalSeconds.current;
        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };

	return (
        <div>
            <Panel type="Stopwatch">
                <TimerInput value={startMinutes} onChange={handleMinutesInput}/>:
                <TimerInput value={startSeconds} onChange={handleSecondsInput}/>
                <DisplayTime minutes={displayMinutesCount} seconds={displaySecondsCount}/>
            
                <Button value={"Start"} color='#aaa0ff' onClick={handleStartButton} /> 
                <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} />   
                <Button value={"Reset"} color='#aaa0ff' onClick={handleResetButton} />   
                <Button value={"End"} color='#aaa0ff' onClick={handleEndButton} />    
            </Panel>
        </div>

		);
};
export default Stopwatch;
