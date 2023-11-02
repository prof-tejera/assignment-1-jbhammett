import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import { CalculateTotalSeconds, HandleStopButton } from "../../utils/helpers";


const Countdown = ()=> {

    const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
    const [displaySecondsCount, setDisplaySecondsCount] = useState('00');

    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);
    const counter = useRef(0);



    const handleMinutesInput = v => {
        setStartMinutes(v);
        setDisplayMinutesCount(v.toString().padStart(2,"0"));
    };

    const handleSecondsInput = v => {
        setStartSeconds(v);
        setDisplaySecondsCount(v.toString().padStart(2,"0"));
    };

    const handleStartButton = (value) => {
        
        let seconds = CalculateTotalSeconds(startMinutes, startSeconds);

        //Format input value to time format and set inital total seconds count
        const totalDisplaySeconds = CalculateTotalSeconds(displayMinutesCount, displaySecondsCount);

        if (totalDisplaySeconds === seconds){
            let format_minutes_input = startMinutes.toString().padStart(2,"0");
            let format_seconds_input = startSeconds.toString().padStart(2,"0");
            handleMinutesInput(format_minutes_input);
            handleSecondsInput(format_seconds_input);
            counter.current = seconds;
        }
    
        totalSeconds.current = seconds;
    
        if (totalSeconds.current > 0){
            if (displayMinutesCount > 0 && displaySecondsCount === 0){
                setDisplayMinutesCount((displayMinutesCount - 1).toString().padStart(2,"0"));
            }
            // Start timer
            secondsCountInterval.current = setInterval(() => {
                counter.current = (() => {
                    const nextTotalSecondsCounter = counter.current - 1;
            
                    // Stop timer when end time is reached
                    if (nextTotalSecondsCounter === 0) {
                        clearInterval(secondsCountInterval.current);
                    }
                    
                    // Handle change to next minute
                    if (nextTotalSecondsCounter % 60 === 59){
                            setDisplayMinutesCount((prevDisplayMinutesCount) => {
                                if(prevDisplayMinutesCount > 0){
                                    let nextDisplayMinutesCount = parseInt(prevDisplayMinutesCount) - 1;
        
                                    nextDisplayMinutesCount = nextDisplayMinutesCount.toString().padStart(2,"0");
                                    return nextDisplayMinutesCount;
                                }
                                else {
                                    return '00';        
                                }
                            });
                    
                        setDisplaySecondsCount('59');

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
            <Panel type="Countdown">
                <TimerInput value={startMinutes} onChange={handleMinutesInput}/>:
                <TimerInput value={startSeconds} onChange={handleSecondsInput}/>
                <DisplayTime minutes={displayMinutesCount} seconds={displaySecondsCount}/>

                <Button value={"Start"} color="#aaa0ff" onClick={handleStartButton} /> 
                <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} />   
                <Button value={"Reset"} color="#aaa0ff"  onClick={handleResetButton} />   
                <Button value={"End"} color="#aaa0ff"  onClick={handleEndButton} />                  
            </Panel>
        </div>

		);
};







export default Countdown;
