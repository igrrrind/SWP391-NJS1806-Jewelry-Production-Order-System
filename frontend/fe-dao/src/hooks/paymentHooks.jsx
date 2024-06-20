import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const initiatePayment = async (amount, info, orderInfo) => {
    if (!amount || !info || !orderInfo) {
        console.error('Invalid input provided for payment initiation.');
        return;
    }
    
    const returnUrl = `${window.location.origin}/cart/payment-confirm`;


     try {
        const payload = {
            amount: amount.toString(), // Ensure amount is a string
            info: info,
            orderInfo: orderInfo,
            returnUrl: returnUrl
        };

        console.log('Payload:', payload); // Log payload for debugging

        const response = await axios.post('https://localhost:7112/api/VnpayAPI/payment', payload);

        console.log(response.data.paymentUrl)

        return response.data.paymentUrl


    } catch (error) {
        console.error('Error initiating payment:', error.response ? error.response.data : error.message)
    }
};



export const usePaymentConfirm = () => {
    const location = useLocation();
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                //console.log(location.search)
                const response = await axios.get(`https://localhost:7112/api/VnpayAPI/PaymentConfirm${location.search}`);
                console.log(response.data.message)
                setConfirmationResult(response.data);

            } catch (error) {
                setError(error.response ? error.response.data : { Message: 'An error occurred' });
            }
        };

        confirmPayment();
    }, [location]);

    return { confirmationResult, error };
};


