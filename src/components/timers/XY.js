import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";

const XY = () => {

const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
const [displaySecondsCount, setDisplaySecondsCount] = useState('00');
const [displayRounds, setDisplayRounds] = useState(1);


const [startMinutes, setStartMinutes] = useState('00');
const [startSeconds, setStartSeconds] = useState('00');
const [rounds, setRounds] = useState(0);

const [counter, setCounter] = useState(0);

const totalSeconds = useRef(0);
const secondsCountInterval = useRef(null);


// const handleMinutesInput = v => setStartMinutes(v);
const handleMinutesInput = v => {
    setStartMinutes(v);
    setDisplayMinutesCount(v);
};
// const handleSecondsInput = v => setStartSeconds(v);
const handleSecondsInput = v => {
    setStartSeconds(v);
    setDisplaySecondsCount(v);
};

const handleRoundsInput = v => {
    setRounds(v);
    // setDisplayRounds(v);
};


const handleStartButton = (value) => {
        
    let seconds = (parseInt(startMinutes * 60)) + parseInt(startSeconds);
    if (parseInt(displayMinutesCount) * 60 + parseInt(displaySecondsCount) === seconds){
        setCounter(seconds);
    }

    totalSeconds.current = seconds;



    if (totalSeconds.current > 0 && rounds > 0){
        if (displayMinutesCount > 0 && displaySecondsCount === 0){
            setDisplayMinutesCount((displayMinutesCount - 1).toString().padStart(2,"0"));
        }
    // Start timer
        secondsCountInterval.current = setInterval(() => {
            let nextTotalSecondsCounter = 0;
            setCounter((prevTotalSecondsCount) => {
                if (prevTotalSecondsCount > 0) {
                    nextTotalSecondsCounter = prevTotalSecondsCount - 1;
                }
                else if (displayRounds < rounds){
        
                    setDisplayRounds((prevRound) =>{
                 
                            setDisplayMinutesCount(startMinutes);
                            setDisplaySecondsCount(startSeconds);
                            const nextRound = prevRound + 1;

                            if (nextRound > rounds){
                                nextTotalSecondsCounter = 0;
                                setDisplayMinutesCount('00');
                                setDisplaySecondsCount('00');

                                clearInterval(secondsCountInterval.current);
                                return prevRound;
                            }
                            else {
                                nextTotalSecondsCounter = totalSeconds.current;
                                setDisplayMinutesCount(startMinutes);
                                setDisplaySecondsCount(startSeconds);
                                return nextRound;
                            }
                
                    });
                    
                    
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
    setRounds(0);
    setDisplayRounds(1);
    totalSeconds.current = 0;
    if (secondsCountInterval.current) {
        clearInterval(secondsCountInterval.current);
        secondsCountInterval.current = null;
    }
  };

  const handleEndButton = (value) => {
    setDisplayMinutesCount(startMinutes);
    setDisplaySecondsCount(startSeconds);
    setDisplayRounds(rounds);
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
        Rounds: <TimerInput value={rounds} onChange={handleRoundsInput}/>
        <div>
            <div>
                Display
                {displayMinutesCount}:{displaySecondsCount}
            </div>

            <div>
                Counter: {counter}
            </div>
            <div>
                Rounds: {displayRounds}
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





export default XY;
