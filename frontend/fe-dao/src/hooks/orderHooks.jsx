import axios from 'axios';
import { useState, useEffect } from 'react';


//GET
export function useAllOrders(orderId, statusId, sortByNewer, pageNumber, pageSize) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAllOrders = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://localhost:7112/api/Order', {
            params: {
              OrderId: orderId,
              StatusId: statusId,
              SortByNewer: sortByNewer,
              PageNumber: pageNumber,
              PageSize: pageSize
            }
          });
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAllOrders();
    }, [orderId, statusId, sortByNewer, pageNumber, pageSize]);
  
    return { orders, loading };
}


export function useOrderById(id) {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/Order/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order by id: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, []);
  return { order, loading };
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

