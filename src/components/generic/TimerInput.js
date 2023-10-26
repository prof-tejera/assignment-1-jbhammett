import React from "react";


const TimerInput = ({value, onChange}) => {
    
	return (
        <div>
            <input 
                value={value}
                onChange={e => onChange(e.target.value)} 
            />
        </div>
		);
};

export default TimerInput;