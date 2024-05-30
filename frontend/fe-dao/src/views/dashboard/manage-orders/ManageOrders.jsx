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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Copy, CreditCard, MoreHorizontal, MoreVertical, Truck } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';


  
  
  


const OrdersTable = ({ orders, onOrderClick}) => {


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
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Type</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Order Date</TableHead>
                                <TableHead className="hidden sm:table-cell">Payment</TableHead>
                                <TableHead className="hidden md:table-cell">Total</TableHead>
                                <TableHead className="">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
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



                        {/*  mapping orders to table cells*/}



                            {orders.map(order => (
                                <TableRow key={order.order_id}  onClick={() => onOrderClick(order)}>
                                    <TableCell>
                                        <div className="font-medium">{order.customer}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {order.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{order.is_custom? "Custom": "Sale"}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={order.order_status === 1 ? 'secondary' : 'outline'}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{order.order_date}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant={order.payment_status_id === 1 ? 'secondary' : 'outline'}>
                                            {order.payment_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">${order.total.toFixed(2)}</TableCell>
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
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                

    )
} 


const OrderDetails = ({order}) => {


    if (!order) {
      return (
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <CardTitle className=" justify-center items-center gap-2 text-lg">
                  Select an Order
                  <CardDescription>Details will appear here.</CardDescription>

                </CardTitle>
              </CardHeader>
           </Card>
        </div>
      );
    }

    return(
        <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">

              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order Oe31b70H
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">liam@acme.com</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>
    )

}



const ManageOrdersPage = () => {

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    

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





    return (
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                     <OrdersTable  orders={orders} onOrderClick={setSelectedOrder}   />
                </div>
                <div className=" mt-4 xl:mt-0">
                    <OrderDetails order={selectedOrder} />
                </div>
        </main>

    )
}




export default ManageOrdersPage;