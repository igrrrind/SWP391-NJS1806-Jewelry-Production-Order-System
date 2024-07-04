export const generateNumericTransactionId = () => {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 99999
    return `${timestamp}${randomNum}`; // Combine the timestamp and random number
};     