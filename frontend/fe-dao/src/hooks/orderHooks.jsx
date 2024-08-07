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
      if (!id) return
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
            setResponse(res.data.data);
            console.log(res.data.data)
            console.log(response)
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


export function useOrdersByCustomerId(customerId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrdersByCustomer = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

      if (!customerId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`https://localhost:7112/api/Order/${customerId}?SortByNewer=true`);
        setOrders(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersByCustomer();
  }, [customerId]);

  return { orders, loading, error };
}


export function useDeleteOrderById() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteOrderById = async (orderId) => {
        setLoading(true);
        try {
            const res = await axios.delete(`https://localhost:7112/api/Order/${orderId}`);
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteOrderById, response, loading, error };
}


export function usePutOrder()  {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const updateOrder = async (order) => {
      console.log(order)
      setLoading(true);
      try {
          const res = await axios.put(`https://localhost:7112/api/Order/${order.orderId}`, order); // Change to your API endpoint
          setResponse(res.data);
      } catch (err) {
          setError(err);
      } finally {
          setLoading(false);
      }
  };


  const updateOrderStatus = async (order, statusId) => {
    setLoading(true);
    try {
        console.log('Updating order:', order);

        const updatedOrder = { ...order, statusId };

        const res = await axios.put(`https://localhost:7112/api/Order/${order.orderId}`, updatedOrder);
        setResponse(res.data);
    } catch (err) {
        setError(err);
    } finally {
        setLoading(false);
    }
};




  return { updateOrder, updateOrderStatus, response, loading, error };
};
