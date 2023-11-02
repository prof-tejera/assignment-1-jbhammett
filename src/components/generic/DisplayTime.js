import React from "react";

const DisplayTime = ({minutes, seconds}) => {
    return(
        <div style={{
            marginBottom: 10
        }}>
            {minutes}:{seconds}
        </div>
    );
 };
 
 export default DisplayTime;
