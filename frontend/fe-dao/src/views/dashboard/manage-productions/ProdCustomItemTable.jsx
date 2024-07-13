import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';
import { PencilLineIcon, BadgeInfoIcon, CloudUploadIcon, Eye, Menu, MoreHorizontal, Plus, View, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { getJewelrySizeLabel } from "@/utils/typeToUnit";
import { Badge } from "@/components/ui/badge";
import { usePutOrder } from "@/hooks/orderHooks";

export const ProdCustomItemTable = ({ items, onStatusChange }) => {

    const {updateOrderStatus} = usePutOrder()
    const handleStatusChange = () => {
        
    }


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Order Id</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Gemstone</TableHead>
                    <TableHead className="hidden sm:table-cell">Gem Color</TableHead>
                    <TableHead className="hidden sm:table-cell">Metal</TableHead>
                    <TableHead className="hidden sm:table-cell">Size</TableHead>
                    <TableHead className="hidden sm:table-cell">Description</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className=""><p className="text-center">View Designs</p></TableHead>
                    <TableHead className=""><p className="text-center">Actions</p></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(item => (
                    <TableRow key={item.orderItemId}>
                        <TableCell>{item.orderItemId}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.orderId}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.typeName}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.gemstoneType}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.gemstoneColor}</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.metalTypeName}</TableCell>
                        <TableCell className="hidden sm:table-cell">{getJewelrySizeLabel(item.typeName, item.size)}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Popover modal="true">
                                <PopoverTrigger asChild>
                                    <Button variant="outline"><BadgeInfoIcon /></Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80" side="left">
                                    <div className="grid gap-4">
                                        <p className="text-sm">{item.requestDescription}</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                            {item.designIsCompleted ? 
                                <Badge className={`bg-green-600`}>Completed</Badge> : 
                                <Badge className={`bg-orange-600`}>In Progress</Badge>
                            }
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-around">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link to="/">
                                                <Button variant="outline"><View /></Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">View Design</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </div>
                        </TableCell>
                        <TableCell>
                            <Button
                                onClick={() => onStatusChange(item.orderItemId)}
                                variant="outline"
                            >
                                { "Mark Completed"}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
