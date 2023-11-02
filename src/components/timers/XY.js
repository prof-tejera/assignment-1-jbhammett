import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";

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


const handleMinutesInput = v => {
    setStartMinutes(v);
    setDisplayMinutesCount(v.toString().padStart(2,"0"));
};

const handleSecondsInput = v => {
    setStartSeconds(v);
    setDisplaySecondsCount(v);
};

const handleRoundsInput = v => {
    setRounds(v);

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

                            // Stop timer when end time is reached on last round
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
    setRounds(0);
    setDisplayRounds(1);
    totalSeconds.current = 0;
    if (secondsCountInterval.current) {
        clearInterval(secondsCountInterval.current);
        secondsCountInterval.current = null;
    }
  };

  const handleEndButton = (value) => { 
    setDisplayMinutesCount(startMinutes.toString().padStart(2,"0"));
    setDisplaySecondsCount(startSeconds.toString().padStart(2,"0"));
    setDisplayRounds(rounds);
    setCounter(totalSeconds.current);
    if (secondsCountInterval.current) {
        clearInterval(secondsCountInterval.current);
        secondsCountInterval.current = null;
    }
  };

return (
    <div>
        <Panel type="XY">
            <TimerInput value={startMinutes} onChange={handleMinutesInput}/>:
            <TimerInput value={startSeconds} onChange={handleSecondsInput}/>
            <div>
                <DisplayTitle title="Rounds" />
                <TimerInput value={rounds} onChange={handleRoundsInput}/>
            </div>
            
            <DisplayRounds round={displayRounds} totalRounds={rounds} />
            <DisplayTime minutes={displayMinutesCount} seconds={displaySecondsCount}/>
            
            <Button value={"Start"} color="#aaa0ff"  onClick={handleStartButton} /> 
            <Button value={"Stop"} color="#aaa0ff"  onClick={handleStopButton} />   
            <Button value={"Reset"} color="#aaa0ff"  onClick={handleResetButton} />   
            <Button value={"End"} color="#aaa0ff"  onClick={handleEndButton} />                  
        
        </Panel>
    </div>

    );
};





export default XY;
