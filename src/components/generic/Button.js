import React from "react";

const Button = ({value, color, onClick, interval, start}) => {

    return (
      <div
       onClick={()=>onClick()}
        style={{
            padding: 5,
            // width: 60,
            margin: 5,
            backgroundColor: color,
            fontSize: "1rem",
            textAlign: "center",
            borderRadius: "5px",
            marginRight: "auto",
            marginLeft: "auto",
            fontWeight: "600",
            textTransform: "uppercase"
        }}>
            {value}

      </div>  
    );

    
};

export default Button;