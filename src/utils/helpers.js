// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.


// const calculateTotalSeconds = ({minutes, seconds} = {})=> {
//     const total = (parseInt(minutes * 60)) + parseInt(seconds);
//     return total;
// };

function CalculateTotalSeconds(minutes, seconds) {
    const total = (parseInt(minutes * 60)) + parseInt(seconds);
    return total;
};

export default CalculateTotalSeconds;