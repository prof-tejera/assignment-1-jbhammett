import React from "react";

const DisplayTime = ({minutes, seconds}) => {
    return(
        <div>
            {minutes}:{seconds}
        </div>
    );
 };
 
 export default DisplayTime;
