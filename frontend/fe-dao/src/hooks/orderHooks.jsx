import axios from 'axios';
import { useState, useEffect } from 'react';


//GET
export function useOrderProducts() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAllOrders = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://localhost:7112/api/Orders');
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllOrders();
    }, []);
    return { orders, loading };
  }



//POST
//response should return an order id
export function usePostOrder(order)  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        if (!order) return;

        const postOrder = async () => {
            setLoading(true);
            try {
                const res = await axios.post('https://localhost:7112/api/Orders', order); // Change to your API endpoint
                setResponse(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        postOrder();

    }, [order])

    return { response, loading, error };
};


//custom item must also include the order id necessary
export function usePostCustomOrder({customItem})  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        if (!customItem) return;

        const postCustomOrder = async () => {
            setLoading(true);
            try {
                const res = await axios.post('/api/OrderCustomItem', customItem); // Change to your API endpoint
                setResponse(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        postCustomOrder();

    },[customItem])

    return { response, loading, error };
};

