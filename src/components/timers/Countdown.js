import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";

const Countdown = ()=> {

    const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
    const [displaySecondsCount, setDisplaySecondsCount] = useState('00');

    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    
    const [counter, setCounter] = useState(0);
    
    const totalSeconds = useRef(0);
    const secondsCountInterval = useRef(null);


    // const handleMinutesInput = v => setStartMinutes(v);
    const handleMinutesInput = v => {
        setStartMinutes(v);
        // setDisplayMinutesCount(v);
        // setCounter((parseInt(startMinutes * 60)) + parseInt(startSeconds));
    };
    // const handleSecondsInput = v => setStartSeconds(v);
    const handleSecondsInput = v => {
        setStartSeconds(v);
        // setDisplaySecondsCount(v);
        // setCounter((parseInt(startMinutes * 60)) + parseInt(startSeconds));
    };

    const handleStartButton = (value) => {
        

        let seconds = (parseInt(startMinutes * 60)) + parseInt(startSeconds);
        setCounter(seconds);
    
        totalSeconds.current = seconds;
    
        if (totalSeconds.current > 0){
            // if (displayMinutesCount > 0 && displaySecondsCount === 0){
            if (displayMinutesCount > 0 ){
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
            }, 100);
            
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
            <div>
                <div>
                    Display
                    {displayMinutesCount}:{displaySecondsCount}
                </div>

                <div>
                    Counter: {counter}
                </div>
                {/* COLOR DOES NOT WORK  */}
                <Button value={"Start"} color={'#00cccc'} onClick={handleStartButton} /> 
                <Button value={"Stop"} color={'#00cccc'} onClick={handleStopButton} />   
                <Button value={"Reset"} color={'#00cccc'} onClick={handleResetButton} />   
                <Button value={"End"} color={'#00cccc'} onClick={handleEndButton} />                  
            </div>
        </div>

		);
};







export default Countdown;
