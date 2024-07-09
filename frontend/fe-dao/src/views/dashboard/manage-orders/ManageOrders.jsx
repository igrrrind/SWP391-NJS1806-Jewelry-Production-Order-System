import { useState, useEffect } from 'react';
import OrdersTable from './OrdersTable';
import OrderDetails from './OrderDetails';
import { useAllOrders, useDeleteOrderById } from '@/hooks/orderHooks';
import { useAllOrderItems } from '@/hooks/orderItemHooks';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuoteByOrderId } from '@/hooks/quoteHooks';
import { useTransactionByOrderId } from '@/hooks/transactionHooks';
import { useShipmentByOrderId } from '@/hooks/shipmentHooks';
import { useNavigate } from 'react-router-dom';
import { useUserCustomerbyId } from '@/hooks/userHooks';

const ManageOrdersPage = () => {
    const navigate = useNavigate()
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [hidedate, setHidedate] = useState(false);
    const { quote } = useQuoteByOrderId(selectedOrder);
    const { transaction } = useTransactionByOrderId(selectedOrder);
    const { shipment } = useShipmentByOrderId(selectedOrder);
    //const { userCustomer } = useUserCustomerbyId(selectedOrder?.customerId);

    const {deleteOrderById} = useDeleteOrderById()

    const { orderItems, loading: itemsLoad } = useAllOrderItems(selectedOrder);

    const [orderId, setOrderId] = useState(null); 
    const [statusId, setStatusId] = useState(null);
    const [pendingQuoteStatusId, setPendingQuoteStatusId] = useState(); 
    const [sortByNewer, setSortByNewer] = useState(true);
    const [pageNumber, setPageNumber] = useState(1); 
    const [pageSize, setPageSize] = useState(50); 

    const { orders, loading } = useAllOrders(orderId, statusId, sortByNewer, pageNumber, pageSize);

    const { orders:ordersPendingQuote } = useAllOrders(orderId, 1, sortByNewer, pageNumber, pageSize);


    useEffect(() => {
        setHidedate(!!selectedOrder);
    }, [selectedOrder]);

    const handleOrderPendingQuote = ()=> {
        setStatusId(1);
    }

    const handleOrderDelete = async (order) => {
        try {
            await deleteOrderById(order.orderId) 
            alert("Order successfully deleted");
            navigate('/dashboard/manage-orders')
        } catch (error) {
            console.log(error) 
            alert("An error occured. Please try again later.");
        } 
    }

    return (
        <main>
            <div className='flex-1 p-4 xl:flex bg-muted'>
                <Card className="glowing-card">
                    <CardHeader className="space-y-0">
                        <CardTitle className="text-lg flex items-center space-x-4 mb-0 pb-0 space-y-0">
                            <div><span className='underline'>{ordersPendingQuote?.length}</span> Custom Orders are pending a quotation</div>
                            <Button onClick={handleOrderPendingQuote}>See orders</Button>
                        </CardTitle>
                        <CardDescription>
                            Review them and give a quote before 24 hours. 
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex-1 p-4 xl:flex xl:space-x-4">
                <div className="flex-1 overflow-auto scrollable-container">
                    <OrdersTable orders={orders} onOrderClick={setSelectedOrder} hidedate={hidedate} onOrderDelete={handleOrderDelete} />
                </div>
                <div className="mt-4 xl:mt-0 xl:flex-shrink-0 scrollable-container">
                    <OrderDetails order={selectedOrder} orderItems={orderItems} quote={quote} transaction={transaction} shipment={shipment}/>
                </div>
            </div>
        </main>
    );
}

export default ManageOrdersPage;
