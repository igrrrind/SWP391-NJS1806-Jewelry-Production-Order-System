import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ProdCustomItemTable } from "./ProdCustomItemTable"; // Assuming this is your modified table component
import { useAllProductions, useAllProductionStatuses } from "@/hooks/productionHooks"; // Adjust the hook import
import { useOrderById, usePutOrder } from "../../../hooks/orderHooks";
import { toast } from "react-toastify";


const ManageProductionsPage = () => {
    const { productions} = useAllProductions();
    const { statuses } = useAllProductionStatuses();
    const [statusesSelect, setStatusesSelect] = useState([])
    const {updateOrderStatus, response} = usePutOrder()
    const navigate = useNavigate();
    const [orderIdProduction, setOrderIdProduction] = useState(null)
    const {order} = useOrderById(orderIdProduction);


    

    useEffect(() => {
        if (statuses) {
          const formattedStatuses = statuses
            .filter(status => status.productionStatusId >= 1 && status.productionStatusId <= 5)
            .map(status => ({
              value: status.productionStatusId,
              label: status.statusName,
            }));
          setStatusesSelect(formattedStatuses);
        }
    }, [statuses]);


    const handleStartShipment = async (orderId) => {
        setOrderIdProduction(orderId)
    }   

    useEffect(() => {
        const updateOrder = async () => {
            if (order) {
                const statusId = order.isShipment ? 7 : 6;
                try {
                    await updateOrderStatus(order, statusId);
                    navigate(0)
                } catch (error) {
                    toast.error("Something went wrong with your order");
                }
            }
        };
    
        updateOrder();
    }, [order]);





    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
            <div className="flex-1">
                <Card>
                    <CardHeader className="px-7">
                        <CardTitle>Manage Production</CardTitle>
                        <CardDescription>
                            Manage production processes and items
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                        <ProdCustomItemTable productions={productions} statuses={statusesSelect} handleStartShipment={handleStartShipment}/> 
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default ManageProductionsPage;
