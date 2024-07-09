import axios from "axios";
import { useEffect, useState } from "react";

//response should return an order id
export function usePostTransaction()  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const postTransaction = async (transaction) => {
        setLoading(true);
        try {
            const res = await axios.post('https://localhost:7112/api/Transaction/AddNewTransaction',transaction); 
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { postTransaction, response, loading, error };
};


export function useTransactionByOrderId(order) {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionByOrderId = async () => {
            if (!order) {
                setLoading(false);
                return;
            }

            try {
                setTransaction([])
                setLoading(true);
                const response = await axios.get(`https://localhost:7112/api/Transaction?OrderId=${order.orderId}`);
                setTransaction(response.data);
            } catch (error) {
                console.error('Error fetching transaction', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionByOrderId();
        console.log(transaction);
    }, [order]);

    return { transaction, loading };
}