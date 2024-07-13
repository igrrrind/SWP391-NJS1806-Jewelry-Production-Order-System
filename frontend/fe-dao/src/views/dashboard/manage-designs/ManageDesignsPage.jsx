import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAllRoles } from "@/hooks/rolesHooks";
import { useEffect, useState } from "react";
import { CustomCombobox } from "@/components/custom/custom-combobox";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { CustomItemTable } from "./CustomItemTable";
import { useAllCustomOrders } from "@/hooks/orderItemHooks";


const ManageDesignsPage = () => {
    const { orderItems,loading} = useAllCustomOrders();
    const [selectedOrderItem, setSelectedOrderItem] = useState(null)

    const navigate = useNavigate(); 


    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
           
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Manage Custom Order & Designs</CardTitle>
                            <div className='flex justify-between align-middle'>
                            <CardDescription>
                                For design staff to manange their designing process for each customer

                            </CardDescription>
                            </div>
                         </CardHeader>
                         <CardContent>
                            <div className="grid grid-cols-4 mb-4 gap-4">
                                <div className="p-2 border flex items-center space-x-4">
                                    <div className="w-full text-sm font-semibold">Filter by Role:</div> 
                                    
                               </div>    

                               <div className="p-2 border flex items-center space-x-4">
                              <div><Input placeholder="Enter a name..."/></div><Button variant="outline"><SearchIcon/></Button>
                               </div>    
                            </div>
                            <CustomItemTable items={orderItems}/>
                         </CardContent>
                
                    </Card>

                </div>
        </main>
    )
} 

export default ManageDesignsPage;