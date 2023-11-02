import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";
import { CalculateTotalSeconds, HandleStopButton, HandleCountdownMinuteChange, setTimes } from "../../utils/helpers";


const XY = () => {

const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
const [displaySecondsCount, setDisplaySecondsCount] = useState('00');
const [displayRounds, setDisplayRounds] = useState(1);


const [startMinutes, setStartMinutes] = useState('00');
const [startSeconds, setStartSeconds] = useState('00');
const [rounds, setRounds] = useState(0);

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

const handleRoundsInput = v => {
    setRounds(v);

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


    if (totalSeconds.current > 0 && rounds > 0){
        if (displayMinutesCount > 0 && displaySecondsCount === 0){
            setDisplayMinutesCount((displayMinutesCount - 1).toString().padStart(2,"0"));
        }
    // Start timer
        secondsCountInterval.current = setInterval(() => {
            let nextTotalSecondsCounter = 0;
            counter.current = (() => {
                if (counter.current > 0) {
                    nextTotalSecondsCounter = counter.current - 1;
                }
                else if (displayRounds < rounds){
        
                    setDisplayRounds((prevRound) =>{
                 
                        const nextRound = prevRound + 1;

                        // Stop timer when end time is reached on last round
                        if (nextRound > rounds){
                            nextTotalSecondsCounter = 0;
                            setDisplayMinutesCount('00');
                            setDisplaySecondsCount('00');

                            clearInterval(secondsCountInterval.current);
                            return prevRound;
                        }
                        // Otherwise, start next round
                        else {
                            nextTotalSecondsCounter = totalSeconds.current;
                            setDisplayMinutesCount(startMinutes.toString().padStart(2,"0"));
                            setDisplaySecondsCount(startSeconds.toString().padStart(2,"0"));
                            counter.current = totalSeconds.current;
                            return nextRound;
                        }
                    });
                }
        
                // Handle change to next minute
                HandleCountdownMinuteChange(nextTotalSecondsCounter, setDisplayMinutesCount, setDisplaySecondsCount);

                return nextTotalSecondsCounter;
            })();
        
        }, 1000);
        
    }
  };



  const handleResetButton = (value) => {
    setTimes('00',setDisplayMinutesCount, setDisplaySecondsCount, setStartMinutes, setStartSeconds);

    counter.current = 0;
    setRounds(0);
    setDisplayRounds(1);
    totalSeconds.current = 0;
    if (secondsCountInterval.current) {
        clearInterval(secondsCountInterval.current);
        secondsCountInterval.current = null;
    }
  };

  const handleEndButton = (value) => { 
    setDisplayMinutesCount('00');
    setDisplaySecondsCount('00');
    setDisplayRounds(rounds);
    counter.current = totalSeconds.current;
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
            <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} />   
            <Button value={"Reset"} color="#aaa0ff"  onClick={handleResetButton} />   
            <Button value={"End"} color="#aaa0ff"  onClick={handleEndButton} />                  
        
        </Panel>
    </div>

    );
};





export default XY;
