import { useState, useEffect } from 'react';
import OrdersTable from './OrdersTable';
import OrderDetails from './OrderDetails';



const ManageOrdersPage = () => {

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);

    

    useEffect(() => {
      // Function to fetch order data from the API, map to collumns
      const fetchOrders = async () => {
          try {
              const response = await fetch('/data.json'); 
              const data = await response.json();
              const processedOrders = processOrders(data);
              setOrders(processedOrders);
          } catch (error) {
              console.error('Error fetching resources:', error);
          }
      };

      fetchOrders();
      }, []);


    const processOrders = (data) => {
      return data.Orders.map(order => {
        const customer = data.Customer_Detail.find(c => c.customer_id === order.customer_id);
        const paymentStatus = data.Payment_Status.find(ps => ps.payment_status_id === order.payment_status_id);
        const orderStatus = data.Status.find(s => s.status_id === order.order_status);
        const user = data.User.find(u => u.user_id === customer.user_id)

        return {
          order_id: order.order_id,
          customer: `${customer.first_name} ${customer.last_name}`,
          phone: user.phone,
          is_custom: order.is_custom,  
          status: orderStatus.status_detail,
          order_date: order.order_date,
          payment_status: paymentStatus.status_name,
          total: order.order_total
        };
      });
    };

    useEffect(() => {
      // Function to fetch order data from the API, map to collumns
      const fetchOrderDetails = async () => {
          if (!selectedOrder) return;
          try {
              const response = await fetch('/data.json'); 
              const data = await response.json();
              const orderDetails = data.Order_Details.find(o => o.order_id === selectedOrder.order_id)
              setOrderDetail(orderDetails);
          } catch (error) {
              console.error('Error fetching resources:', error);
          }
      };

      fetchOrderDetails();
      }, []);

    




    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                     <OrdersTable  orders={orders} onOrderClick={setSelectedOrder}   />
                </div>
                <div className=" mt-4 xl:mt-0">
                    <OrderDetails order={selectedOrder} orderDetail={orderDetail} />
                </div>
        </main>

    )
}




export default ManageOrdersPage;