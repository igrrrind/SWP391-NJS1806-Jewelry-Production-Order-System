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


    

    useEffect(()=>{
        if(statuses) {
            const formattedStatuses = statuses.map(status => ({
                value: status.productionStatusId,
                label: status.statusName,
              }))
              setStatusesSelect(formattedStatuses)
              //console.log(statuses)
        }
    },[statuses])

    const handleStartShipment = async (orderId) => {
        const {order} = useOrderById(orderId)
        const statusId = orderId.isShipment ? 7 : 6
        try {
            await updateOrderStatus(order,statusId)
        }catch(error) {
            toast.error("Something went wrong with your order");
        }
    }   





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
