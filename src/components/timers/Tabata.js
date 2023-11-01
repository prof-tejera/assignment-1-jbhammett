import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";

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

    
    const [counter, setCounter] = useState(0);
    const [restCounter, setRestCounter] = useState(0);
    
    const totalSeconds = useRef(0);
    const totalRestSeconds = useRef(0);
    const secondsCountInterval = useRef(null);
    const work = useRef(true);
    

    const handleMinutesInput = v => {
        setStartMinutes(v);
        setDisplayMinutesCount(v);
    };

    const handleSecondsInput = v => {
        setStartSeconds(v);
        setDisplaySecondsCount(v);
    };
    
    const handleRoundsInput = v => {
        setRounds(v);

    };

    const handleRestMinutesInput = v => {
        setStartRestMinutes(v);
        setDisplayRestMinutes(v);
    };

    const handleRestSecondsInput = v => {
        setStartRestSeconds(v);
        setDisplayRestSeconds(v);
    };
    
    
    const handleStartButton = (value) => {

         
        let workSeconds = (parseInt(startMinutes * 60)) + parseInt(startSeconds);
        
        
        if (parseInt(displayMinutesCount) * 60 + parseInt(displaySecondsCount) === workSeconds){
            setCounter(workSeconds);
        }

        
        totalSeconds.current = workSeconds;

        let restSeconds = (parseInt(startRestMinutes * 60)) + parseInt(startRestSeconds);
        totalRestSeconds.current = restSeconds;

        if (parseInt(displayRestMinutes) * 60 + parseInt(displayRestSeconds) === restSeconds){
            setRestCounter(restSeconds);
        }

    
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
                
                    setCounter((prevTotalSecondsCount) => {
                        // If seconds counter is not at 0, subtract 1
                        if (prevTotalSecondsCount > 0) {
                            nextTotalSecondsCounter = prevTotalSecondsCount - 1;
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
                        if (prevTotalSecondsCount === 0){
                            work.current = false;
        
                        }
                        

                        return nextTotalSecondsCounter;

                    });
                }

                else {
              
                    setRestCounter((prevRestSecondsCount) => {
                        // If seconds counter is not at 0, subtract 1
                        if (prevRestSecondsCount > 0) {
                            nextRestSecondsCounter = prevRestSecondsCount - 1;
                        }

                        else if (displayRounds < rounds){
        
                            setDisplayRounds((prevRound) =>{
                                    setCounter(totalSeconds.current);
                                    setRestCounter(totalRestSeconds.current);
                                    nextTotalSecondsCounter = totalSeconds.current;
                                    nextRestSecondsCounter = totalRestSeconds.current;
                         
                                    setDisplayMinutesCount(startMinutes);
                                    setDisplaySecondsCount(startSeconds);
                                    setDisplayRestMinutes(startRestMinutes);
                                    setDisplayRestSeconds(startRestSeconds);
                                    work.current = true;
                                    const nextRound = prevRound + 1;
        
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
                                        setCounter(totalSeconds.current);
                                        setRestCounter(totalRestSeconds.current);
                                        nextTotalSecondsCounter = totalSeconds.current;
                                        nextRestSecondsCounter = totalRestSeconds.current;
                                        setDisplayMinutesCount(startMinutes);
                                        setDisplaySecondsCount(startSeconds);
                                        setDisplayRestMinutes(startRestMinutes);
                                        setDisplayRestSeconds(startRestSeconds);
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

                });


           
            
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

        setCounter(0);
        setRestCounter(0);

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
        setDisplayRestMinutes(startRestMinutes);
        setDisplayRestSeconds(startRestSeconds);
        setCounter(totalSeconds.current);
        setRestCounter(totalRestSeconds.current);
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
                REST
                <TimerInput value={startRestMinutes} onChange={handleRestMinutesInput}/>:
                <TimerInput value={startRestSeconds} onChange={handleRestSecondsInput}/>
            </div>
            <div>
                Rounds: <TimerInput value={rounds} onChange={handleRoundsInput}/>
            </div>
            Work: <DisplayTime minutes={displayMinutesCount} seconds={displaySecondsCount}/>
            Rest:<DisplayTime minutes={displayRestMinutes} seconds={displayRestSeconds}/>
            <DisplayRounds round={displayRounds} totalRounds={rounds} />
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





export default Tabata;
