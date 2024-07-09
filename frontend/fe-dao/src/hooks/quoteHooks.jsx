import axios from "axios";
import { useEffect, useState } from "react";

export function usePostQuote()  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const postQuote = async (quote) => {
        setLoading(true);
        try {
            const res = await axios.post('https://localhost:7112/api/Quotes', quote); // Change to your API endpoint
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };



    return { postQuote, response, loading, error };
};



export function useQuoteByOrderId(order) {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchQuoteByOrderId = async () => {
        if (!order || !order.isCustom) {
          setLoading(false);        
          return;
        }
  
        try {
          setQuote(null);
          setLoading(true);
          const response = await axios.get(`https://localhost:7112/api/Quotes/${order.orderId}`);  
          setQuote(response.data);
          console.log(quote)
        } catch (error) {
          console.error('Error fetching Quote', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchQuoteByOrderId();
    }, [order]);
  
    return { quote, loading };
  }

export function usePutQuote()  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateQuote = async (quote) => {
        setLoading(true);
        try {
            const res = await axios.put(`https://localhost:7112/api/Quotes/${quote.orderId}`, quote); // Change to your API endpoint
            setResponse(res.data);
            console.log(response)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { updateQuote, response, loading, error };
};

  
