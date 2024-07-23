import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { PencilLineIcon, BadgeInfoIcon, CloudUploadIcon, Eye, Menu, MoreHorizontal, Plus, View, CheckCircle, Edit } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { getJewelrySizeLabel } from "@/utils/typeToUnit";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/custom/status-badge";
import { formatDate } from "@/utils/formatDate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomCombobox } from "@/components/custom/custom-combobox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePutProduction } from "@/hooks/productionHooks";

export const ProdCustomItemTable = ({productions, statuses, handleStartShipment }) => {

    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [statusToUpdate, setStatusToUpdate] = useState(null)
    const {updateProductionStatus, response:psResponse} = usePutProduction();
    



    const handleStatusChange = (value) => {
        if (value === statusToUpdate) {
            setStatusToUpdate(null)
            return
        }
        console.log("Selected status ID:", value)
        setStatusToUpdate(value);
        setError('');
    }


    const handleUpdate = async (production) => {
        if (!statusToUpdate) {
            setError("Choose a status before updating")
            return;
        }
        await updateProductionStatus(production,statusToUpdate)
        navigate(0)
    }

    useEffect(()=> {
        if (psResponse) {
            console.log(psResponse)
        }
    },[psResponse])



    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden sm:table-cell">Order ID</TableHead>
                    <TableHead className=""><p className=""> Start Date</p></TableHead>
                    <TableHead className=""><p className=""> Production Status</p></TableHead>
                    <TableHead className=""><p className="text-center">Actions</p></TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {productions ? productions.map(production => (
                    <TableRow key={production.productionId}>
                        <TableCell className="hidden sm:table-cell">{production.orderId}</TableCell>
                        <TableCell className="hidden sm:table-cell">{formatDate(production.startDate)}</TableCell>

                        <TableCell>
                            <StatusBadge status={production.productionStatusName}/>
                        </TableCell>

                        <TableCell>
                            <div className="flex justify-center space-x-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link to="/">
                                                <Button variant="outline"> View Items</Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">View Item Details</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>


                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Update Status</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                        <DialogTitle>Update Status</DialogTitle>
                                        <DialogDescription>
                                            Make changes to the production status
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                            Status
                                            </Label>
                                            <CustomCombobox 
                                                items={statuses} 
                                                onSelect={(e) => handleStatusChange(e)} 
                                                placeholder="Update the status..."
                                                buttonClassName="custom-button-class"/>
                                        </div>
                                        <div>{error && <p className="text-red-600 text-sm">{error}</p>}</div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => handleUpdate(production)}>Update</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>   

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                                <Button variant="outline" disabled={production.productionStatusId != 3} onClick={() => handleStartShipment(production.orderId)}><CheckCircle/> &nbsp; Collected For Shipment</Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Mark collected by shipment party</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </div>
                        </TableCell>  
                    </TableRow>
                )) : (<TableCell colSpan={3} className="text-center">Loading...</TableCell>)}
            </TableBody>
        </Table>
    );
};
