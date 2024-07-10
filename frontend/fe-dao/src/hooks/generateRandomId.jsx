export const generateNumericTransactionId = (orderId) => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0'); // Random number between 00 and 99

    return `${month}${day}${hour}${randomNum}${orderId}`;
};
