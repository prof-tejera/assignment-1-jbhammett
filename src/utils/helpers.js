// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.


// Convert minutes and seconds to seconds
export const CalculateTotalSeconds = (minutes, seconds) => {
    const total = (parseInt(minutes * 60)) + parseInt(seconds);
    return total;
};


export const HandleStopButton = ((interval, start) => {
    if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
    }
    else {
        start();
    }

});



export const HandleCountdownMinuteChange = ((nextTotalSecondsCounter, setDisplayMinutesCount, setDisplaySecondsCount) => {
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
    
    
    });




