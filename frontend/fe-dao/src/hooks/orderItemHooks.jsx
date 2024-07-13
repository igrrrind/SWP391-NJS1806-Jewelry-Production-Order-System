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
