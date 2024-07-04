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
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/Order?OrderId=${id}`);
        setOrder(response.data[0]);
      } catch (error) {
        console.error('Error fetching order by id: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  },[id]);
  return { order, loading };
}



//POST
//response should return an order id
export function usePostOrder()  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postOrder = async (order) => {
        setLoading(true);
        try {
            const res = await axios.post('https://localhost:7112/api/Order/AddNewOrder', order); 
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { postOrder, response, loading, error };
};


//custom item must also include the order id necessary
export function usePostCustomOrder()  {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postCustomOrder = async (customItem) => {
        setLoading(true);
        try {
            console.log(customItem)
            const res = await axios.post('https://localhost:7112/api/OrderCustomItems', customItem); 
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { postCustomOrder, response, loading, error };
};

