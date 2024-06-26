import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, MailIcon } from "lucide-react";
//import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTableRowigger, Separator } from "@radix-ui/react-dropdown-menu";
//import { Copy, CreditCard, MoreVertical, TableRowuck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const OrderDetails = ({order, orderItems}) => {
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

    if (order.isCustom){
      return (
        <div>
            <CustomCard order={order} orderItems={orderItems}/>         
        </div>
      )
    } else if (!order.isCustom)
    return(
        <div>
            <FixedCard order={order} orderItems={orderItems}/>         
        </div>
    )

}

export default OrderDetails



const CustomCard = ({order,orderItems}) =>{
    return (
      <Card className="overflow-hidden border-blue-700" x-chunk="dashboard-05-chunk-4">
              <CardHeader>
                <div className="border-b pb-2 mb-4">
                  <h2 className=" font-semibold">Order #{order.orderId}</h2>
                  <p className="text-gray-500">{order.orderDate}</p>
                </div>
                <div className="mb-4 flex flex-col items-center">
                  <h3 className="font-semibold">Order Details</h3>
                  <p className="text-gray-500 text-sm">Hover to view additional information</p>
                </div>
                <div className="flex justify-between pt-4 items-center">
                  <p className="text-gray-700 text-sm font-semibold">Type: <Badge variant="secondary">{order.isCustom ? "Custom": "Sale"}</Badge></p>
                  <p className="text-gray-700 text-sm font-semibold">Status: <Badge>{order.statusDetail}</Badge></p>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-left border-b">
                      <TableHead className="pl-0 w-20">TYPE</TableHead>
                      <TableHead className="py-2 w-8">SPECS.</TableHead>
                      <TableHead className="py-2">EST.UNIT PRICE</TableHead>
                      <TableHead className="py-2">QTY.</TableHead>
                      <TableHead className="px-0"><p className="text-right">EST. SUBTOTAL</p></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderItems.map(item => (
                    <TableRow className="border-b " key={item.orderItemId}>
                        <TableCell className="px-0 flex flex-col items-center">
                          <p className=" text-left">item.typeName</p>
                          <p className="text-xs text-left">Custom</p>
                        </TableCell>
                        <TableCell className="py-2">
                        <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              to="/dashboard/manage-users"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                              <Info className="h-5 w-5" />
                              <span className="sr-only">Customers</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="flex flex-col items-center">{item.metalTypeName} - {item.gemstoneType} <p>Size {item.size}</p></TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                      
                        </TableCell>
                        <TableCell className="py-2">{item.unitPrice}</TableCell>
                        <TableCell className="py-2">x {item.quantity}</TableCell>
                        <TableCell className="text-right px-0">{item.subtotal}</TableCell>
                    </TableRow>
                    ))}   
                  </TableBody>
                </Table>
                <Separator className="mb-4"/>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">SHIPMENT FEE</p>
                  <p className="text-sm">30000</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">EST. TOTAL</p>
                  <p className="text-sm">30000</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">ACTUAL TOTAL</p>
                  <p className="text-gray-700 font-semibold">{order.orderTotal > 0 ? order.orderTotal : "Quote NF"}</p>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  *Currency is VND
                </div>
                <div className="p-2">
                    
                </div>
                <Separator className="mb-2"/>

                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Pricing Quote</div><div><Badge variant={"outline"}>Shipped</Badge></div></div></AccordionTrigger>
                    <AccordionContent className=" flex justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">Quote #1</p>
                        <div>
                          <Table>
                            <TableHeader>
                                <TableHead className="pl-0 w-20">METAL WEIGHT(g)</TableHead>
                                <TableHead className="py-2 w-8">METAL COST</TableHead>
                                <TableHead className="py-2">CARAT PRICE</TableHead>
                                <TableHead className="py-2">CARAT COST</TableHead>
                                <TableHead className="px-0"><p className="text-right">PROD.</p></TableHead>
                            </TableHeader>
                          </Table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                </div>

                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Shipment Info</div><div><Badge variant={"outline"}>Shipped</Badge></div></div></AccordionTrigger>
                    <AccordionContent className=" flex justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">Shipment #1</p>
                        <p className="text-sm font-bold text-green-700 underline">Delivered date: 24-5-2020</p>
                        <p>Address Line: New Way Avenue, 232 Street</p>
                        <p>Province/City: New York</p>
                        <p>District/Town: New Mexico</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                </div>
                <div className="">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Contact Info</AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="font-semibold">Customer #1</p>
                        <p>Mr./ Mrs. <span className="font-medium" >San Jose</span></p>        
                        <p>Email: <a href={`mailto:sanhose@gmail.com`} className="hover:underline">sanhose@gmail.com</a></p>
                        <p>Phone: +84 938 562 745</p>
                        <p>District/Town: New Mexico</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mb-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Transaction Info</div><Badge variant={"outline"}>{order.paymentStatusName}</Badge></div></AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="font-semibold">Transaction #1</p>
                        <p className="text-sm font-bold text-green-700 underline">Transaction date: 24-5-2020</p>
                        <p>Payment Method: <span className="font-medium" >COD</span></p>        
                        <p className="italic">*Deposit not applicable</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>            
            </Card>
    )
}

const FixedCard = ({order,orderItems}) => {
  return (
    <Card className="overflow-hidden border-red-600" x-chunk="dashboard-05-chunk-4">
              <CardHeader>
                <div className="border-b pb-2 mb-4">
                  <h2 className=" font-semibold">Order #{order.orderId}</h2>
                  <p className="text-gray-500">{order.orderDate}</p>
                </div>
                <div className="mb-4 flex flex-col items-center">
                  <h3 className="font-semibold">Order Details</h3>
                  <p className="text-gray-500 text-sm">Hover to view additional information</p>
                </div>
                <div className="flex justify-between pt-4 items-center">
                  <p className="text-gray-700 text-sm font-semibold">Type: <Badge variant="secondary">{order.isCustom ? "Custom": "Sale"}</Badge></p>
                  <p className="text-gray-700 text-sm font-semibold">Status: <Badge>{order.statusDetail}</Badge></p>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="text-left border-b">
                      <TableHead className="pl-0 w-20">ITEM</TableHead>
                      <TableHead className="py-2 w-8">VARIANT</TableHead>
                      <TableHead className="py-2">U.PRICE</TableHead>
                      <TableHead className="py-2">QTY.</TableHead>
                      <TableHead className="px-0"><p className="text-right">SUBTOTAL</p></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                  {orderItems && orderItems.map(item => (
                    <TableRow className="border-b " key={item.orderFixedItemId}>
                      <TableCell className="px-0 flex flex-col items-center">
                        <p className=" text-left">Gold Necklace</p>
                        <p className="text-xs text-left">ID: {item.productId}</p>
                      </TableCell>
                      <TableCell className="py-2"><div className="w-full flex justify-center"><Info/></div></TableCell>
                      <TableCell className="py-2">{item.price}</TableCell>
                      <TableCell className="py-2">x {item.quantity}</TableCell>
                      <TableCell className="text-right px-0">{item.subtotal}</TableCell>
                    </TableRow>
                    ))}
                    
                  </TableBody>
                </Table>
                <Separator className="mb-4"/>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">Shipment Fee</p>
                  <p className="text-sm">30000</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-gray-700 font-semibold">TOTAL</p>
                  <p className="text-gray-700 font-semibold">{order.orderTotal}</p>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  *Currency is VND
                </div>
                <Separator className="mb-2"/>

                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Shipment Info</div><div><Badge variant={"outline"}>Shipped</Badge></div></div></AccordionTrigger>
                    <AccordionContent className=" flex justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">Shipment #1</p>
                        <p className="text-sm font-bold text-green-700 underline">Delivered date: 24-5-2020</p>
                        <p>Address Line: New Way Avenue, 232 Street</p>
                        <p>Province/City: New York</p>
                        <p>District/Town: New Mexico</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                </div>
                <div className="">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Contact Info</AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="font-semibold">Customer #1</p>
                        <p>Mr./ Mrs. <span className="font-medium" >San Jose</span></p>        
                        <p>Email: <a href={`mailto:sanhose@gmail.com`} className="hover:underline">sanhose@gmail.com</a></p>
                        <p>Phone: +84 938 562 745</p>
                        <p>District/Town: New Mexico</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="mb-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-between w-full pr-3"><div>Transaction Info</div><div><Badge variant={"outline"}>{order.paymentStatusName}</Badge></div></div></AccordionTrigger>
                      <AccordionContent className="space-y-1">
                        <p className="font-semibold">Transaction #1</p>
                        <p className="text-sm font-bold text-green-700 underline">Transaction date: 24-5-2020</p>
                        <p>Payment Method: <span className="font-medium" >COD</span></p>        
                        <p className="italic">*Deposit not applicable</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>            
            </Card>
  )
}

