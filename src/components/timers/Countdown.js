import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";

const Countdown = ()=> {

    const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
    const [displaySecondsCount, setDisplaySecondsCount] = useState('00');

    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    
    const [counter, setCounter] = useState(0);
    
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);



    const handleMinutesInput = v => {
        setStartMinutes(v);
        setDisplayMinutesCount(v);
    };

    const handleSecondsInput = v => {
        setStartSeconds(v);
        setDisplaySecondsCount(v);
    };

    const handleStartButton = (value) => {
        
        let seconds = (parseInt(startMinutes * 60)) + parseInt(startSeconds);
        if (parseInt(displayMinutesCount) * 60 + parseInt(displaySecondsCount) === seconds){
            setCounter(seconds);
        }
    
        totalSeconds.current = seconds;
    
        if (totalSeconds.current > 0){
            if (displayMinutesCount > 0 && displaySecondsCount === 0){
                setDisplayMinutesCount((displayMinutesCount - 1).toString().padStart(2,"0"));
            }
        // Start timer
            secondsCountInterval.current = setInterval(() => {
                setCounter((prevTotalSecondsCount) => {
                    const nextTotalSecondsCounter = prevTotalSecondsCount - 1;
            
                    if (nextTotalSecondsCounter === 0) {
                        clearInterval(secondsCountInterval.current);
                    }

                    if (nextTotalSecondsCounter % 60 === 0){
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
        setDisplayMinutesCount(startMinutes.toString().padStart(2,"0"));
        setDisplaySecondsCount(startSeconds.toString().padStart(2,"0"));
        setCounter(totalSeconds.current);
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

                {/* COLOR DOES NOT WORK  */}
                <Button value={"Start"} color="#aaa0ff" onClick={handleStartButton} /> 
                <Button value={"Stop"} color="#aaa0ff" onClick={handleStopButton} />   
                <Button value={"Reset"} color="#aaa0ff"  onClick={handleResetButton} />   
                <Button value={"End"} color="#aaa0ff"  onClick={handleEndButton} />                  
            </Panel>
        </div>

		);
};







export default Countdown;
