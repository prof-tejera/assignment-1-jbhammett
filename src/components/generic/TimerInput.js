import React from "react";

    
const TimerInput = ({value, onChange}) => {

	return (
        <span>
            <input 
                value={value}
                type="number"
                max="59"
                min="0"
                onChange={e => onChange(e.target.value)} 
                style={{marginBottom: 10}}
            />
        </span>
		);
    
};

export default TimerInput;