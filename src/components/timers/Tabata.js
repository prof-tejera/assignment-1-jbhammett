import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";

const Tabata = () => {

    const [displayMinutesCount, setDisplayMinutesCount] = useState('00' );
    const [displaySecondsCount, setDisplaySecondsCount] = useState('00');
    const [displayRounds, setDisplayRounds] = useState(1);
    const [displayRestMinutes, setDisplayRestMinutes] = useState('00');
    const [displayRestSeconds, setDisplayRestSeconds] = useState('00');
    
    
    const [startMinutes, setStartMinutes] = useState('00');
    const [startSeconds, setStartSeconds] = useState('00');
    const [rounds, setRounds] = useState(0);
    const [startRestMinutes, setStartRestMinutes] = useState('00');
    const [startRestSeconds, setStartRestSeconds] = useState('00');

    
    const totalSeconds = useRef(0);
    const totalRestSeconds = useRef(0);
    const secondsCountInterval = useRef(null);
    const work = useRef(true);
    const counter = useRef(0);
    const restCounter = useRef(0);
    

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

    const handleRestMinutesInput = v => {
        setStartRestMinutes(v);
        setDisplayRestMinutes(v.toString().padStart(2,"0"));
    };

    const handleRestSecondsInput = v => {
        setStartRestSeconds(v);
        setDisplayRestSeconds(v.toString().padStart(2,"0"));
    };
    
    
    const handleStartButton = (value) => {

         
        let workSeconds = (parseInt(startMinutes * 60)) + parseInt(startSeconds);
        
        
        counter.current = workSeconds;

        totalSeconds.current = workSeconds;

        let restSeconds = (parseInt(startRestMinutes * 60)) + parseInt(startRestSeconds);
        totalRestSeconds.current = restSeconds;

        restCounter.current = restSeconds;


        if (totalSeconds.current > 0 && rounds > 0){
            // Subtract 1 from display minutes if timer is set to full minute.
            if (displayMinutesCount > 0 && displaySecondsCount === 0){
                setDisplayMinutesCount((displayMinutesCount - 1).toString().padStart(2,"0"));
            }
        // Start timer
            secondsCountInterval.current = setInterval(() => {
                let nextTotalSecondsCounter = 0;
                let nextRestSecondsCounter = 0;
                // Work timer
                if (work.current){
                    counter.current = (() => {
                        // If seconds counter is not at 0, subtract 1
                        if (counter.current > 0) {
                            nextTotalSecondsCounter = counter.current - 1;
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
                        // Stop work timer so rest timer can start
                        if (counter.current === 0){
                            work.current = false;
        
                        }
                        
                        return nextTotalSecondsCounter;

                    })();
                }

                else {
                    restCounter.current = (() => {
                        // If seconds counter is not at 0, subtract 1
                        if (restCounter.current > 0) {
                            nextRestSecondsCounter = restCounter.current - 1;
                        }

                        else if (displayRounds < rounds){
        
                            setDisplayRounds((prevRound) =>{
                                const nextRound = prevRound + 1;
                                

                                // Stop timer if end time is reached on last round
                                if (nextRound > rounds){
                                    nextTotalSecondsCounter = 0;
                                    nextRestSecondsCounter = 0;
                                    setDisplayMinutesCount('00');
                                    setDisplaySecondsCount('00');
                                    setDisplayRestMinutes('00');
                                    setDisplayRestSeconds('00');
    
                                    clearInterval(secondsCountInterval.current);
                                    return prevRound;
                                }
                                else {
                                    counter.current = totalSeconds.current;
                                    restCounter.current = totalRestSeconds.current;
                                    nextTotalSecondsCounter = totalSeconds.current;
                                    nextRestSecondsCounter = totalRestSeconds.current;
                                    setDisplayMinutesCount(startMinutes.toString().padStart(2,"0"));
                                    setDisplaySecondsCount(startSeconds.toString().padStart(2,"0"));
                                    setDisplayRestMinutes(startRestMinutes.toString().padStart(2,"0"));
                                    setDisplayRestSeconds(startRestSeconds.toString().padStart(2,"0"));
                                    work.current = true;

                                    return nextRound;
                                }
                        
                            });   
                        }


                        if (nextRestSecondsCounter % 60 === 0){
                            
                            setDisplayRestMinutes((prevDisplayRestMinutes) => {
                                if(prevDisplayRestMinutes > 0){
                                    let nextDisplayRestMinutes = parseInt(prevDisplayRestMinutes) - 1;
                                    nextDisplayRestMinutes = nextDisplayRestMinutes.toString().padStart(2,"0");
                                    return nextDisplayRestMinutes;
                                }
                                else {
                                    return '00';       
                                }
                            });
                            setDisplayRestSeconds('00');
        
                    }
                    else{                    
                        let nextTotalRestSeconds = nextRestSecondsCounter % 60;
                        setDisplayRestSeconds(nextTotalRestSeconds.toString().padStart(2,"0"));
                        
                    }
                    
                    return nextRestSecondsCounter;

                })();
            }
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
        setDisplayRestMinutes('00');
        setDisplayRestSeconds('00');

        setStartMinutes('00');
        setStartSeconds('00');
        setStartRestMinutes('00');
        setStartRestSeconds('00');

        counter.current = 0;
        restCounter.current = 0;
        work.current = true;

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
        setDisplayRestMinutes(startRestMinutes);
        setDisplayRestSeconds(startRestSeconds);

        counter.current = totalSeconds.current;
        restCounter.current = totalRestSeconds.current;

        if (secondsCountInterval.current) {
            clearInterval(secondsCountInterval.current);
            secondsCountInterval.current = null;
        }
      };
    
    return (
        <div>
            <Panel type="Tabata">
                <span style={{
                    fontSize: "1rem",
                    marginRight: 5
                }}>
                    Work
                </span>
                
                <TimerInput value={startMinutes} onChange={handleMinutesInput}/>:
                <TimerInput value={startSeconds} onChange={handleSecondsInput}/>
                <div>
                    <span style={{
                        fontSize: "1rem",
                        marginRight: 5
                    }}>
                        Rest
                    </span>
                    <TimerInput value={startRestMinutes} onChange={handleRestMinutesInput}/>:
                    <TimerInput value={startRestSeconds} onChange={handleRestSecondsInput}/>
                </div>
                <div style={{
                    marginBottom: 20
                }}>
                    <DisplayTitle title="Rounds" />
                    <TimerInput value={rounds} onChange={handleRoundsInput}/>
                </div>


                <DisplayTitle title="Work" />
                <DisplayTime minutes={displayMinutesCount} seconds={displaySecondsCount}/>
                <DisplayTitle title="Rest" />
                <DisplayTime minutes={displayRestMinutes} seconds={displayRestSeconds}/>
                <DisplayRounds round={displayRounds} totalRounds={rounds} />

                <Button value={"Start"} color="#aaa0ff"  onClick={handleStartButton} /> 
                <Button value={"Stop"} color="#aaa0ff"  onClick={handleStopButton} />   
                <Button value={"Reset"} color="#aaa0ff"  onClick={handleResetButton} />   
                <Button value={"End"} color="#aaa0ff" onClick={handleEndButton} />                  
           
            </Panel>
        </div>
    
        );
    };





export default Tabata;
