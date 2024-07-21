import axios from "axios";
import { useEffect, useState } from "react";

export function useAllOrderItems(order) {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!order) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(order);
        console.log(order.isCustom);
        const response = await axios.get(
          order.isCustom
            ? `https://localhost:7112/api/OrderCustomItems/${order.orderId}`
            : `https://localhost:7112/api/OrderFixedItem?OrderId=${order.orderId}`
        );

        // Handle custom and fixed items differently based on response structure
        const items = Array.isArray(response.data) ? response.data : [response.data];
        setOrderItems(items || []);
      } catch (error) {
        console.error('Error fetching order items:', error);
        setOrderItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [order]);

  return { orderItems, loading };
}


export function useAllCustomOrders(){
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7112/api/OrderCustomItems`);      
        setOrderItems(response.data);
      } catch (error) {
        console.error('Error fetching order items:', error);
        setOrderItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomOrders();
  }, []);

  return { orderItems, loading };
}


export function usePutCustomOrder(){
  
}


export function usePostFixedItems() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


    const postFixedItems = async (fixedItems) => {
      if (!fixedItems || fixedItems.length === 0) return;

      setLoading(true);
      const tempResponses = [];
      console.log(fixedItems)
      for (const item of fixedItems) {
        try {
          const res = await axios.post('https://localhost:7112/api/OrderFixedItem/AddNewOrderFixedItem', item); // Change to your API endpoint
          tempResponses.push(res.data);
          console.log(res);
        } catch (err) {
          setError(err);
          break;
        }
      }
      setLoading(false);
      setResponse(tempResponses);
    };



  return { postFixedItems, response, loading, error };
}
