import React from "react";
import { useState, useRef } from 'react';

import TimerInput from "../generic/TimerInput";
import Button from "../generic/Button";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import Panel from "../generic/Panel";
import DisplayTitle from "../generic/DisplayTitle";
import { CalculateTotalSeconds, HandleStopButton, HandleCountdownMinuteChange, setTimes } from "../../utils/helpers";


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
        
        let workSeconds = CalculateTotalSeconds(startMinutes, startSeconds);
        
        totalSeconds.current = workSeconds;

        let restSeconds = CalculateTotalSeconds(startRestMinutes, startRestSeconds);
        totalRestSeconds.current = restSeconds;


        const totalDisplaySeconds = CalculateTotalSeconds(displayMinutesCount, displaySecondsCount);
        if (totalDisplaySeconds === workSeconds){
            let format_minutes_input = startMinutes.toString().padStart(2,"0");
            let format_seconds_input = startSeconds.toString().padStart(2,"0");
            handleMinutesInput(format_minutes_input);
            handleSecondsInput(format_seconds_input);
         
            counter.current = workSeconds;
        }

        if (parseInt(displayRestMinutes) * 60 + parseInt(displayRestSeconds) === restSeconds){
            let format_rest_minutes_input = startRestMinutes.toString().padStart(2,"0");
            let format_rest_seconds_input = startRestSeconds.toString().padStart(2,"0");
            handleRestMinutesInput(format_rest_minutes_input);
            handleRestSecondsInput(format_rest_seconds_input);

            restCounter.current = restSeconds;
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
                    counter.current = (() => {
                        // If seconds counter is not at 0, subtract 1
                        if (counter.current > 0) {
                            nextTotalSecondsCounter = counter.current - 1;
                        }
            
                        // Handle change to next minute
                        HandleCountdownMinuteChange(nextTotalSecondsCounter, setDisplayMinutesCount, setDisplaySecondsCount);

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
                                
                                    setTimes('00',setDisplayMinutesCount, setDisplaySecondsCount, setDisplayRestMinutes, setDisplayRestSeconds);


    
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

                    // Handle minute change
                    HandleCountdownMinuteChange(nextRestSecondsCounter, setDisplayRestMinutes, setDisplayRestSeconds);

                    
                    return nextRestSecondsCounter;

                })();
            }
            }, 1000);
            
        }
      };
    
    
      const handleResetButton = (value) => {
        setTimes('00',setDisplayMinutesCount, setDisplaySecondsCount, setDisplayRestMinutes, setDisplayRestSeconds);
        setTimes('00',setStartMinutes, setStartSeconds, setStartRestMinutes, setStartRestSeconds);

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
        setTimes('00',setDisplayMinutesCount, setDisplaySecondsCount, setDisplayRestMinutes, setDisplayRestSeconds);
        setDisplayRounds(rounds);

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
                <Button value={"Pause/Resume"} color='#aaa0ff' onClick={HandleStopButton} interval={secondsCountInterval} start={handleStartButton} />   
                <Button value={"Reset"} color="#aaa0ff"  onClick={handleResetButton} />   
                <Button value={"End"} color="#aaa0ff" onClick={handleEndButton} />                  
           
            </Panel>
        </div>
    
        );
    };





export default Tabata;
