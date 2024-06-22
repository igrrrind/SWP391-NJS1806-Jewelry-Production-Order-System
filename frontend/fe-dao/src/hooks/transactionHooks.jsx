
//POST

import { useState } from "react";

//response should return an order id
export function usePostTransaction({transactionId, orderId, transactionTotal})  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); // Output: 'YYYY-MM-DD'


    useEffect(()=> {
        if (!order) return;

        const postTransaction = async () => {
            setLoading(true);
            try {
                const res = await axios.post('/api/transaction', {
                    orderId: orderId,
                    transactionId: transactionId,
                    transactionTotal: transactionTotal,
                    transactionDate: formattedDate,
                    paymentType: 'VNPAY',
                    isDeposit: false
                }); // Change to your API endpoint
                setResponse(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        postTransaction();

    },[transaction])

    return { response, loading, error };
};