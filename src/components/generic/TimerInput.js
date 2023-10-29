import React from "react";


// const TimerInput = ({value, onChange}) => {
    
const TimerInput = ({value, onChange}) => {

    
	return (
        <div>
            <input 
                value={value}
                onChange={e => onChange(e.target.value)} 
            />
        </div>
		);

    // return (
    //         <div>
    //             <input 
    //                 value={minutes}
    //                 onChange={e => onChange(e.target.value)} 
    //             />
    //             :
    //             <input 
    //                 value={seconds}
    //                 onChange={e => onChange(e.target.value)} 
    //             />
    //         </div>
    //     	);
    
};

export default TimerInput;