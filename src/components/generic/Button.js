import React from "react";

// const Button = ({value, color, onClick}) => {
const Button = ({value, color, onClick}) => {

    return (
      <div
       onClick={()=>onClick()}
        style={{
            padding:20,
            width: 60,
            backgroundColor: {color},
            fontSize: "2rem",
            color: "#000000",
            textAlign: "center"
        }}>
            {value}

      </div>  
    );

    
};

export default Button;