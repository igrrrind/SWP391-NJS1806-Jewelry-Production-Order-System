import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ProdCustomItemTable } from "./ProdCustomItemTable"; // Assuming this is your modified table component
import { useAllProductions } from "@/hooks/productionHooks"; // Adjust the hook import
import { useAllCustomOrders } from "@/hooks/orderItemHooks";
import { usePutOrder } from "@/hooks/orderHooks";

const ManageProductionsPage = () => {
    const { orderItems,loading} = useAllCustomOrders();
    const [selectedProductionItem, setSelectedProductionItem] = useState(null); // Adjusted state name

    const navigate = useNavigate();

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
                        
                        <ProdCustomItemTable items={orderItems} onStatusChange={handleStatusChange} /> {/* Adjusted prop name */}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default ManageProductionsPage;
