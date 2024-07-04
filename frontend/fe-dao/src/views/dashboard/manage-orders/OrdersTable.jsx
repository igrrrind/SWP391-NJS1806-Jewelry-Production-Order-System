import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';


  
  
  


const OrdersTable = ({ orders, onOrderClick, hidedate}) => {


    return (
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                        Recent orders from your store.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-32">Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Type</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className={hidedate? "hidden"  : "hidden md:table-cell"}>Order Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Payment</TableHead>
                                <TableHead className="hidden md:table-cell">Total</TableHead>
                                <TableHead className="">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/*
                             <TableRow>
                                    <TableCell>
                                        <div className="font-medium">James Bond</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            agent007@hollywood.com
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">Custom</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant='outline'>
                                            Pending
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">27 May</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant='outline'>
                                            Unpaid
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">$745.34</TableCell>
                                    
                                    <TableCell>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Attached Quote</DropdownMenuItem>
                                        <DropdownMenuItem>View Customer Info</DropdownMenuItem>
                                        <DropdownMenuItem>Waranty Certificate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                */}



                        {/*  mapping orders to table cells*/}



                            {orders.map(order => (
                                <TableRow key={order.orderId}  onClick={() => onOrderClick(order)} className="cursor-pointer">
                                    <TableCell>
                                        <div className="font-medium">Order.firstName Order.lastName</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            Order.phone
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{order.isCustom? <span className='text-blue-600'>Custom</span>: <span className='text-red-600'>Sale</span>}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant='outline'>
                                            {order.statusDetail}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={hidedate? "hidden"  : "hidden md:table-cell"}>{order.orderDate}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={'outline'}>
                                            {order.paymentStatusName}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{order.orderTotal}đ</TableCell>
                                    <TableCell>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Track Order</DropdownMenuItem>
                                        <DropdownMenuItem>View Customer Info</DropdownMenuItem>
                                        <DropdownMenuItem>Waranty Certificate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                

    )
} 

export default OrdersTable
